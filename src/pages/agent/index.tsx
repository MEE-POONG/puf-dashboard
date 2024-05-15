import DashboardLayout from "@/components/Layout";
import AddPartnerModal from "@/components/Partner/AddPartnerModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";

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

                    <form className="max-w-md mx-auto">
                        <div className="flex">
                            <select id="countries" className="flex-shrink-0 z-10 inline-flex items-center text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                <option selected value="">Senior</option>
                                <option value="master">Master</option>
                                <option value="agent">Agent</option>
                            </select>
                            <div className="relative w-full">
                                <input type="search" id="location-search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="UserAg" required />
                                <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* <form className="max-w-sm mx-auto">
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="">Senior</option>
                            <option value="master">Master</option>
                            <option value="agent">Agent</option>
                        </select>
                    </form>

                    <div>
                        ค้นหา:<input
                            type="search"
                            className="focus:outline-none focus:border-b-2 p-1 border-b"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div> */}
                    <div className="mt-5 md:mt-0">
                        <button onClick={() => setShowModal(true)} className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-700 text-sm">Add Partner</button>
                    </div>
                    <AddPartnerModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddPartner} />
                </div>
                <div className="flex min-h-full items-center justify-center shadow-md rounded-xl  overflow-hidden">
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default AgentPage;
