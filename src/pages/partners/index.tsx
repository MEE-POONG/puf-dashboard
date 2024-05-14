import DashboardLayout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Partner {
    id: number;
    firstName: string;
    lastName: string;
    bankAccount: string;
    bank: string;
    tel: string;
    line: string;
    allianceId: string;
}


const Partners: React.FC = (props) => {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/partner');
            setPartners(response.data);
        };
        fetchData();
    }, []);


    return (
        <DashboardLayout>
            <div className="m-5">
                <div className="flex items-center justify-between my-3">
                    <h2 className="text-lg font-bold py-3">รายชื่อตัวแทน</h2>

                    <div>
                        ค้นหา:<input type="search" name="" id="" className="focus:outline-none focus:border-b-2 p-1 border-b" />
                    </div>
                    <div>
                        <button className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-700">Add Partner</button>
                    </div>
                </div>
                <div className="flex min-h-full items-center justify-center shadow-md rounded-xl  overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full bg-white ">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 text-left">No.</th>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Account No.</th>
                                    <th className="py-2 px-4 text-left">Bank</th>
                                    <th className="py-2 px-4 text-left">Tel</th>
                                    <th className="py-2 px-4 text-left">Line</th>
                                    <th className="py-2 px-4 text-left">Agency</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                {partners.map((partner, index) => (
                                    <tr className="border-b border-blue-gray-200" key={partner.id}>
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{partner.firstName} {partner.lastName}</td>
                                        <td className="py-3 px-4">{partner.bankAccount}</td>
                                        <td className="py-3 px-4">{partner.bank}</td>
                                        <td className="py-3 px-4">{partner.tel}</td>
                                        <td className="py-3 px-4">{partner.line} </td>
                                        <td className="py-3 px-4">{partner.allianceId} </td>
                                        <td className="py-3 px-4">
                                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
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
export default Partners;
