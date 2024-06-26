import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/Layout";
import { CiEdit, CiTrash } from "react-icons/ci";
import EditPartnerModal from "@/container/Partner/EditPartnerModal";
import PaginationSelcet from "@/components/PaginationSelcet";
import ConfirmDeleteModal from "@/container/alliance/ConfirmDeleteModal";
import Tooltip from "@/components/Tooltip";

interface Partner {
    id: number;
    firstName: string;
    lastName: string;
    bankAccount: string;
    accountName: string;
    bank: string;
    tel: string;
    line: string;
    allianceId: string;
}

interface Params {
    page: number;
    pageSize: number;
    keyword: string;
    totalPages: number;
}

const Partners: React.FC = () => {
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 10,
        keyword: "",
        totalPages: 1,
    });

    const [partners, setPartners] = useState<Partner[]>([]);
    const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);

    const fetchPartners = async () => {
        try {
            const response = await axios.get('/api/partner', { params });
            setPartners(response.data);
            setFilteredPartners(response.data);
        } catch (error) {
            console.error('Error fetching partner data:', error);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, [params]);

    useEffect(() => {
        const filterData = () => {
            const filteredData = partners.filter(partner => {
                const firstNameMatch = partner.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
                const accountNameMatch = partner.accountName?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
                const telMatch = partner.tel?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
                return firstNameMatch || accountNameMatch || telMatch;
            });
            setFilteredPartners(filteredData);
        };

        filterData();
    }, [searchQuery, partners]);

    const handleAddPartner = () => {
        setSelectedPartner(null);
        setShowModal(true);
    };

    const handleEditClick = (partner: Partner) => {
        setSelectedPartner(partner);
        setShowModal(true);
    };

    const handleDeleteClick = (partner: Partner) => {
        setPartnerToDelete(partner);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (partnerToDelete) {
            try {
                await axios.delete(`/api/partner/${partnerToDelete.id}`);
                fetchPartners();
                setShowDeleteModal(false);
                setPartnerToDelete(null);
            } catch (error) {
                console.error('Error deleting partner:', error);
            }
        }
    };

    const handleSubmit = async () => {
        await fetchPartners();
    };

    const handleChange = (field: keyof Params, value: string | number) => {
        setParams(prev => ({
            ...prev,
            page: field === 'keyword' ? 1 : prev.page,
            [field]: value
        }));
    };

    return (
        <DashboardLayout>
            <div className="m-5">
                <div className="md:flex items-center justify-between my-3">
                    <h2 className="text-lg font-bold py-3">รายชื่อตัวแทน</h2>
                    <div>
                        ค้นหา:<input
                            type="search"
                            className="focus:outline-none focus:border-b-2 p-1 border-b"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="mt-5 md:mt-0">
                        <button onClick={handleAddPartner} className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-700 text-sm">Add Partner</button>
                    </div>
                </div>
                <div className="flex min-h-full items-center justify-center shadow-md rounded-xl overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 text-left">No.</th>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Account No.</th>
                                    <th className="py-2 px-4 text-left">Bank</th>
                                    <th className="py-2 px-4 text-left">Account Name</th>
                                    <th className="py-2 px-4 text-left">Tel</th>
                                    <th className="py-2 px-4 text-left">Line</th>
                                    <th className="py-2 px-4 text-left">Agency</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                {filteredPartners.map((partner, index) => (
                                    <tr className="border-b border-blue-gray-200" key={partner.id}>
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{partner.firstName} {partner.lastName}</td>
                                        <td className="py-2 px-4">{partner.bankAccount}</td>
                                        <td className="py-2 px-4">{partner.bank}</td>
                                        <td className="py-2 px-4">{partner.accountName}</td>
                                        <td className="py-2 px-4">{partner.tel}</td>
                                        <td className="py-2 px-4">{partner.line}</td>
                                        <td className="py-2 px-4">{partner.allianceId}</td>
                                        <td className="py-2 px-4 flex items-center gap-3">
                                            <Tooltip tooltipContent="แก้ไข">
                                                <button className="font-medium text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(partner)}>
                                                    <CiEdit />
                                                </button>
                                            </Tooltip>
                                            <Tooltip tooltipContent="ลบ">
                                                <button className="font-medium text-red-600 hover:text-blue-800" onClick={() => handleDeleteClick(partner)}>
                                                    <CiTrash />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <PaginationSelcet
                    page={params.page}
                    pageSize={params.pageSize}
                    totalPages={params.totalPages}
                    onChangePage={(page) => handleChange('page', page)}
                    onChangePageSize={(size) => handleChange('pageSize', size)}
                />
            </div>
            <EditPartnerModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                partner={selectedPartner}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
            // partnerName={partnerToDelete ? `${partnerToDelete.firstName} ${partnerToDelete.lastName}` : ''}
            />
        </DashboardLayout>
    );
}

export default Partners;
