import DashboardLayout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

interface Admin {
    id: number;
    name: string;
    username: string;
    password: string;
    tel: string;
    email: string;
}

const Admin: React.FC = (props) => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/admin');
            setAdmins(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterData = () => {
            const filteredData = admins.filter(admins =>
                admins.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                admins.tel.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredAdmins(filteredData);
        };

        filterData();
    }, [searchQuery, admins]);


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
                        <button className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-700 text-sm">Add Partner</button>
                    </div>
                </div>
                <div className="flex min-h-full items-center justify-center shadow-md rounded-xl  overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full bg-white ">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 text-left">No.</th>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Username.</th>
                                    <th className="py-2 px-4 text-left">Password</th>
                                    <th className="py-2 px-4 text-left">Tel</th>
                                    <th className="py-2 px-4 text-left">Email</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                {filteredAdmins.map((admins, index) => (
                                    <tr className="border-b border-blue-gray-200" key={admins.id}>
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{admins.name}</td>
                                        <td className="py-3 px-4">{admins.username}</td>
                                        <td className="py-3 px-4">{admins.password}</td>
                                        <td className="py-3 px-4">{admins.email}</td>
                                        <td className="py-3 px-4">{admins.name}</td>
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
export default Admin;
