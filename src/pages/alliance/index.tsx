import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import ModalAllianceAdd from "@/container/alliance/ModalAllianceAdd";
import DashboardLayout from "@/components/Layout";
import PaginationSelcet from "@/components/PaginationSelcet";

interface AllianceData {
    userAccount: string;
    position: string;
    counselor: string;
    percent: number;
    accruedPlus: boolean;
    getCom: boolean;
    pay: boolean;
    adjustPercentage: boolean;
    createdBy: string;
}
interface Params {
    page: number;
    pageSize: number;
    search: string;
    position: string;
    totalPages: number;
}
const AlliancePage: React.FC = () => {
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 10,
        search: "",
        position: "",
        totalPages: 1,
    });
    const [filteredAlliances, setFilteredAlliances] = useState<AllianceData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState('senior'); // Added state for selected role

    useEffect(() => {
        console.log(params);
        const fetchData = async () => {
            try {
                const queryParameters = new URLSearchParams({
                    search: searchQuery,
                    position: selectedRole,
                    page: params.page.toString(),
                    pageSize: params.pageSize.toString(),
                }).toString();
    
                const response = await axios.get(`/api/alliance/search?${queryParameters}`);
                setFilteredAlliances(response.data.data);  // Ensure the data path is correct based on your API response structure
                setParams(prev => ({ ...prev, totalPages: response.data.pagination.totalPages }));  // Update total pages if pagination is returned
            } catch (error) {
                console.error('Error fetching alliance data:', error);
            }
        };
    
        fetchData();
    }, [searchQuery, selectedRole, params.page, params.pageSize]);


    const handleChangePage = (page: number) => {
        setParams((prevParams) => ({
            ...prevParams,
            page: page,
        }));
    };

    const handleChangePageSize = (size: number) => {
        setParams((prevParams) => ({
            ...prevParams,
            page: 1,
            pageSize: size,
        }));
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };

    return (
        <DashboardLayout>
            <div className="md:flex items-center justify-between my-3">
                <h2 className="text-lg font-bold py-3">พันธมิตร</h2>
                <div className="p-4 text-gray-600 outline-none focus:outline-none ">
                    <div className="relative flex">
                        <select
                            value={selectedRole} // Using value prop
                            onChange={handleRoleChange} // Handling change event
                            className="bg-white h-10 pl-2 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 border-r-1 cursor-pointer max-h-10 overflow-y-hidden">
                            <option value="senior">Senior</option>
                            <option value="master">Master</option>
                            <option value="agent">Agent</option>
                        </select>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search User"
                            className="bg-white h-10 flex px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500"
                            autoComplete="off"
                            spellCheck="false"
                            required
                            step="any"
                            autoCapitalize="none"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute inline-flex items-center h-10 my-auto px-3 py-2  text-white text-sm transition duration-150 ease-in-out rounded-full outline-none right-0 bg-teal-500 sm:px-3 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <div className="mt-5 md:mt-0">
                    <button onClick={() => setShowModal(true)} className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-700 text-sm">Add UserAgent</button>
                </div>
                <ModalAllianceAdd show={showModal} onClose={() => setShowModal(false)} />
            </div>
            <div className="flex min-h-full items-center justify-center shadow-md rounded-xl overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="py-2 px-4 text-left">No.</th>
                                <th className="py-2 px-4 text-left">User Account</th>
                                <th className="py-2 px-4 text-left">%</th>
                                <th className="py-2 px-4 text-left">ยอดค้างบวก</th>
                                <th className="py-2 px-4 text-left">ค่าคอม</th>
                                <th className="py-2 px-4 text-left">ปรับเปอร์เซ็น</th>
                                <th className="py-2 px-4 text-left">จ่าย</th>
                                <th className="py-2 px-4 text-left">Manager</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                            {filteredAlliances.map((list, index) => (
                                <tr className="border-b border-blue-gray-200" key={list.userAccount}>
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{list.userAccount}</td>
                                    <td className="py-3 px-4">{list.percent}</td>
                                    <td className="py-3 px-4">{list.accruedPlus ? `มี` : `ไม่มี`}</td>
                                    <td className="py-3 px-4">{list.getCom ? `มี` : `ไม่มี`}</td>
                                    <td className="py-3 px-4">{list.pay ? `จ่าย` : `ระงับ`}</td>
                                    <td className="py-3 px-4">{list.adjustPercentage ? `จ่าย` : `ระงับ`}</td>
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-800"><FaEdit /></a>
                                        <a href="#" className="font-medium text-red-600 hover:text-blue-800"><FaRegTrashAlt /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <PaginationSelcet page={params.page} pageSize={params.pageSize} totalPages={params.totalPages} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
            </div>
        </DashboardLayout>
    );
}

export default AlliancePage;
