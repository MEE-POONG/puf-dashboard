import DashboardLayout from "@/components/Layout";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Admin: React.FC = (props) => {
    return (
        <DashboardLayout>
            <div className="flex flex-wrap my-5 -mx-2">
                <div className="w-full lg:w-1/3 p-2">
                    <div className="w-full lg:w-1/4 mb-2 text-xs lg:text-sm">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                placeholder="ค้นหา"
                                aria-label="products"
                                className="pl-8 pr-4 py-2 w-64 bg-blue-100 rounded-full focus:outline-none focus:border-blue-300 border-gray-300 text-xs lg:text-sm"
                            />
                        </div>
                    </div>

                    {/* Admin Table */}
                    <div>
                        <table>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Username</th>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default Admin;
