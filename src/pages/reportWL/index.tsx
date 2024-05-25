import DashboardLayout from "@/components/Layout";
import React from "react";
import { BiSolidReport } from "react-icons/bi";

const ReportWL: React.FC = (props) => {
    return (
        <DashboardLayout>
            <div className="m-5">
                <div className="md:flex items-center justify-between my-3">
                    <h2 className="text-lg font-bold py-3">ออกรายงาน/Report</h2>
                </div>

                <button className="my-3 p-2 bg-yellow-400 rounded shadow-md">รายงานทั้งหมด</button>
                <div className="flex min-h-full items-center justify-center shadow-md rounded-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="py-2 px-4 text-left">หัวข้อรายงาน</th>
                                <th className="py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            <tr className="border-b border-blue-gray-200" >
                                <td className="py-3 flex items-center justify-left">
                                    <input type="checkbox" name="" id=""
                                        className="w-24 h-2/4" />
                                    Agent
                                </td>
                                <td className="py-3 px-4">
                                    <button className="font-medium text-blue-600 hover:text-blue-800 flex items-center" >
                                        <BiSolidReport />ออกรายงาน
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default ReportWL;
