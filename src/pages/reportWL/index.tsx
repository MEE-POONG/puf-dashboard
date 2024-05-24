import DashboardLayout from "@/components/Layout";
import React from "react";
import { BiSolidReport } from "react-icons/bi";

const ReportWL: React.FC = (props) => {
    return (
        <DashboardLayout>
            <div className="md:flex items-center justify-between my-3">
                <div className="bg-gray-50 w-full rounded-md shadow-md p-5">
                    <h2 className="text-lg font-bold py-3">ออกรายงาน/Report</h2>
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 text-left">No.</th>
                                    <th className="py-2 px-4 text-left">หัวข้อรายงาน</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                <tr className="border-b border-blue-gray-200" >
                                    <td className="py-3 px-4">

                                    </td>
                                    <td className="py-3 px-4"></td>
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <button className="font-medium text-blue-600 hover:text-blue-800" > <BiSolidReport /> </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default ReportWL;
