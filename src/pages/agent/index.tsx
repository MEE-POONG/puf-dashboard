import DashboardLayout from "@/components/Layout";
import AddPartnerModal from "@/components/Partner/AddPartnerModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

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

const AgentPage: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/partner');
            setPartners(response.data);
            setFilteredPartners(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterData = () => {
            const filteredData = partners.filter(partner =>
                partner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.tel.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPartners(filteredData);
        };

        filterData();
    }, [searchQuery, partners]);

    const handleAddPartner = (data: any) => {
        console.log(data);
    };

    return (
        <DashboardLayout>
            <div className="m-5">
                <div className="md:flex items-center justify-between my-3">
                    <h2 className="text-lg font-bold py-3">พันธมิตร</h2>
                    <div className="p-4 text-gray-600 outline-none focus:outline-none ">
                        <div className="relative flex">
                            <select
                                className="bg-white h-10 pl-2 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 border-r-1 cursor-pointer max-h-10 overflow-y-hidden">
                                <option selected value="">Senior</option>
                                <option value="master">Master</option>
                                <option value="agent">Agent</option>
                            </select>
                            <input
                                // type="search"
                                name="search"
                                placeholder="User Ag"
                                className="bg-white h-10 flex px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500"
                                autoComplete="off"
                                spellCheck="false"
                                required
                                step="any"
                                autoCapitalize="none"
                                autoFocus
                            />
                            <button type="submit" className="absolute inline-flex items-center h-10 my-auto px-3 py-2  text-white text-sm transition duration-150 ease-in-out rounded-full outline-none right-0 bg-teal-500 sm:px-3 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0">
                        <button onClick={() => setShowModal(true)} className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-700 text-sm">Add UserAgent</button>
                    </div>
                    <AddPartnerModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddPartner} />
                </div>
                <div className="flex min-h-full items-center justify-center shadow-md rounded-xl  overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 text-left">No.</th>
                                    <th className="py-2 px-4 text-left">userAccount</th>
                                    <th className="py-2 px-4 text-left">%</th>
                                    <th className="py-2 px-4 text-left">Tel</th>
                                    <th className="py-2 px-4 text-left">Line</th>
                                    <th className="py-2 px-4 text-left">Agency</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                {/* {filteredPartners.map((partner, index) => (
                                    <tr className="border-b border-blue-gray-200" key={partner.id}>
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{partner.firstName} {partner.lastName}</td>
                                        <td className="py-3 px-4">{partner.bankAccount}</td>
                                        <td className="py-3 px-4">{partner.bank}</td>
                                        <td className="py-3 px-4">{partner.accountName}</td>
                                        <td className="py-3 px-4">{partner.tel}</td>
                                        <td className="py-3 px-4">{partner.line}</td>
                                        <td className="py-3 px-4">{partner.allianceId}</td>
                                        <td className="py-3 px-4 flex items-center gap-3">
                                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800"><CiEdit /></a>
                                            <a href="#" className="font-medium text-red-600 hover:text-blue-800"><CiTrash /></a>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default AgentPage;
