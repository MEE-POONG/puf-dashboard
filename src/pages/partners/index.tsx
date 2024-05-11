import DashboardLayout from "@/components/Layout";
import React from "react";

const Partners: React.FC = (props) => {
    return (
        <DashboardLayout>
            <div className="m-5">
                <div className="flex items-center justify-between my-3">
                    <h2 className="text-lg font-bold py-3">รายชื่อตัวแทน</h2>

                    <div>
                        ค้นหา:<input type="search" name="" id=""  className="focus:outline-none focus:border-b-2 p-1.5" />
                    </div>
                </div>
                <div className="flex min-h-full items-center justify-center shadow-md rounded-xl  overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full bg-white ">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 text-left">No.</th>
                                    <th className="py-2 px-4 text-left">Stock Name</th>
                                    <th className="py-2 px-4 text-left">Price</th>
                                    <th className="py-2 px-4 text-left">Quantity</th>
                                    <th className="py-2 px-4 text-left">Total</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                <tr className="border-b border-blue-gray-200">
                                    <td className="py-3 px-4">1</td>
                                    <td className="py-3 px-4">Company A</td>
                                    <td className="py-3 px-4">$50.25</td>
                                    <td className="py-3 px-4">100</td>
                                    <td className="py-3 px-4">$5025.00</td>
                                    <td className="py-3 px-4">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                                    </td>
                                </tr>
                                {/* <tr className="border-b border-blue-gray-200">
                                <td className="py-3 px-4"></td>
                                <td className="py-3 px-4 font-medium">Total Wallet Value</td>
                                <td className="py-3 px-4"></td>
                                <td className="py-3 px-4"></td>
                                <td className="py-3 px-4 font-medium">$22525.00</td>
                                <td className="py-3 px-4"></td>
                            </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default Partners;
