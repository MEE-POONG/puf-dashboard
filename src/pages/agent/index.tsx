import DashboardLayout from "@/components/Layout";
import AddPartnerModal from "@/components/Partner/AddPartnerModal";
import { AllianceDataList } from "@/data";
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
            <div className="md:flex items-center justify-between my-3">
                <h2 className="text-lg font-bold py-3">พันธมิตร</h2>
                <div className="p-4 text-gray-600 outline-none focus:outline-none ">
                    <div className="relative flex">
                        <select
                            className="bg-white h-10 pl-2 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 border-r-1 cursor-pointer max-h-10 overflow-y-hidden">
                            <option selected value="senior">Senior</option>
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
                                <th className="py-2 px-4 text-left">ยอดค้างบวก</th>
                                <th className="py-2 px-4 text-left">ค่าคอม</th>
                                <th className="py-2 px-4 text-left">จ่าย</th>
                                <th className="py-2 px-4 text-left">Manager</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                            {AllianceDataList.map((list, index) => (
                                <tr className="border-b border-blue-gray-200" key={list.userAccount}>
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{list.userAccount}</td>
                                    <td className="py-3 px-4">{list.percent}</td>
                                    <td className="py-3 px-4">{list.accruedPlus ? `มี` : `ไม่มี`}</td>
                                    <td className="py-3 px-4">{list.getCom ? `มี` : `ไม่มี`}</td>
                                    <td className="py-3 px-4">{list.pay ? `จ่าย` : `ระงับ`}</td>
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-800"><CiEdit /></a>
                                        <a href="#" className="font-medium text-red-600 hover:text-blue-800"><CiTrash /></a>
                                    </td>
                                </tr>
                            ))}
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
            <div className="card-footer">
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between py-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing
                        <span className="font-semibold text-gray-900 dark:text-white mx-2">1-10</span>
                        of
                        <select
                            className=" mx-2 items-center justify-center px-3 h-8  text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <option selected value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </DashboardLayout>
    );
}

export default AgentPage;
