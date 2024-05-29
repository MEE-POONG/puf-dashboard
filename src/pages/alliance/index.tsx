import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import ModalAllianceAdd from "@/container/alliance/ModalAllianceAdd";
import DashboardLayout from "@/components/Layout";
import PaginationSelcet from "@/components/PaginationSelcet";
import Tooltip from "@/components/Tooltip";
import TestModal from "@/components/modal";
import ModalAllianceEdit from "@/container/alliance/ModalAllianceEdit";

interface AllianceData {
    userAccount: string;
    position: string;
    counselor: string;
    percent: number;
    accruedPlus: boolean;
    getCom: boolean;
    pay: boolean;
    adjustPercentage: boolean;
}

interface Params {
    page: number;
    pageSize: number;
    keyword: string;
    position: string;
    totalPages: number;
}

const AlliancePage: React.FC = () => {
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 10,
        keyword: "",
        position: "senior",
        totalPages: 1,
    });
    const [filteredAlliances, setFilteredAlliances] = useState<AllianceData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const queryParameters = `search=${params.keyword}&position=${params.position}&page=${params.page}&pageSize=${params.pageSize}`;
            try {
                const response = await axios.get(`/api/alliance/search?${queryParameters}`);
                setFilteredAlliances(response.data.data);
                setParams(prev => ({ ...prev, totalPages: response.data.pagination.totalPages }));
            } catch (error) {
                console.error('Error fetching alliance data:', error);
            }
        };

        fetchData();
    }, [params.page, params.pageSize, params.position, params.keyword]);  // This useEffect will trigger on any change

    const handleChange = (field: keyof Params, value: string | number) => {
        setParams(prev => ({
            ...prev,
            page: field === 'keyword' || field === 'position' ? 1 : prev.page,
            [field]: value
        }));
    };

    return (
        <DashboardLayout>
            <TestModal />
            <div className="md:flex items-center justify-between my-3">
                <h2 className="text-lg font-bold py-3">พันธมิตร</h2>
                <div className="p-4 text-gray-600 outline-none focus:outline-none ">
                    <div className="relative flex">
                        <select
                            value={params.position}
                            onChange={(e) => handleChange('position', e.target.value)}
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
                            value={params.keyword}
                            onChange={(e) => handleChange('keyword', e.target.value)}
                        />
                        <button type="button" className="absolute inline-flex items-center h-10 my-auto px-3 py-2 text-white text-sm transition duration-150 ease-in-out rounded-full outline-none right-0 bg-teal-500 sm:px-3 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <ModalAllianceAdd />
            </div>
            <div className="flex min-h-full items-center justify-center shadow-md rounded-xl overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 text-left w-4">No.</th>
                            <th className="py-2 px-4 text-left">User Account</th>
                            <th className="py-2 px-4 text-left">%</th>
                            <th className="py-2 px-4 text-left">สิทธิ</th>
                            <th className="py-2 px-4 text-center">Manager</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlliances.map((list, index) => (
                            <tr key={list.userAccount}>
                                <td className="text-right py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{list.userAccount}</td>
                                <td className="py-2 px-4">{list.percent}</td>
                                <td className="py-2 px-4">
                                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 border border-green-400">
                                        {list.accruedPlus ? 'มี' : 'ไม่มี'}ค้างบวก
                                    </span>
                                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 border border-green-400">
                                        {list.getCom ? 'มี' : 'ไม่มี'}ค่าคอม
                                    </span>
                                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 border border-green-400">
                                        {list.adjustPercentage ? 'มี' : 'ไม่มี'}ปรับเปอร์เซ็น
                                    </span>
                                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 border border-green-400">
                                        {list.pay ? 'มี' : 'ไม่มี'}จ่าย
                                    </span>
                                </td>
                                <td className="py-2 px-4 flex items-center">
                                   <ModalAllianceEdit />
                                    <Tooltip tooltipContent="แก้ไข">
                                        <button className="text-xl text-blue-600 hover:text-blue-800 p-2"><FaEdit /></button>
                                    </Tooltip>
                                    <Tooltip tooltipContent="ลบ">
                                        <button className="text-xl text-red-600 hover:text-red-800 p-2"><FaRegTrashAlt /></button>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <PaginationSelcet
                    page={params.page}
                    pageSize={params.pageSize}
                    totalPages={params.totalPages}
                    onChangePage={(page) => handleChange('page', page)}
                    onChangePageSize={(size) => handleChange('pageSize', size)}
                />
            </div>
        </DashboardLayout>
    );
}

export default AlliancePage;
