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


const Partners: React.FC = (props) => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/partner');
            setPartners(response.data);
        };
        fetchData();
    }, []);

    const handleAddPartner = (data: any) => {
        // Handle the submission logic here
        console.log(data);
        // Perhaps send a POST request to your API
    };

    return (
        <DashboardLayout>
            <div className="m-5">
                <div className="md:flex items-center justify-between my-3">
                    <h2 className="text-lg font-bold py-3">รายชื่อตัวแทน</h2>

                    <div>
                        ค้นหา:<input type="search" name="" id="" className="focus:outline-none focus:border-b-2 p-1 border-b" />
                    </div>
                    <div className="mt-5 md:mt-0">
                        <button onClick={() => setShowModal(true)} className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-700 text-sm">Add Partner</button>
                    </div>
                    <AddPartnerModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddPartner} />
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
                                    <th className="py-2 px-4 text-left">Account Name</th>
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
                                        <td className="py-3 px-4">{partner.accountName}</td>
                                        <td className="py-3 px-4">{partner.tel}</td>
                                        <td className="py-3 px-4">{partner.line} </td>
                                        <td className="py-3 px-4">{partner.allianceId} </td>
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
export default Partners;
