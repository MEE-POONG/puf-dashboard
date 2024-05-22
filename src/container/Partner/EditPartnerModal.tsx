import React, { useState, useEffect } from "react";

interface EditPartnerModalProps {
    showEditModal: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    partner: Partner | null;
}

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

const EditPartnerModal: React.FC<EditPartnerModalProps> = ({ showEditModal, onClose, onSubmit, partner }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bankAccount: '',
        accountName: '',
        bank: '',
        tel: '',
        line: '',
        allianceId: '',
    });

    useEffect(() => {
        if (partner) {
            setFormData(partner);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                bankAccount: '',
                accountName: '',
                bank: '',
                tel: '',
                line: '',
                allianceId: '',
            });
        }
    }, [partner]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!showEditModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen">
            <div className="bg-white p-5 rounded shadow-md lg:w-1/2">
                <h2 className="text-xl mb-4"> {partner ? 'Edit Partner' : 'Add Partner'} </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="mb-2 p-2 border w-full"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="mb-2 p-2 border w-full"
                    />
                    <input
                        type="text"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleChange}
                        placeholder="Bank Account"
                        className="mb-2 p-2 border w-full"    
                    />
                    <input
                        type="text"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        placeholder="Account Name"
                        className="mb-2 p-2 border w-full"
                    />
                    <input
                        type="text"
                        name="bank"
                        value={formData.bank}
                        onChange={handleChange}
                        placeholder="Bank"
                        className="mb-2 p-2 border w-full"
                    />
                    <input
                        type="text"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        placeholder="Tel"
                        className="mb-2 p-2 border w-full"
                    />
                    <input
                        type="text"
                        name="line"
                        value={formData.line}
                        onChange={handleChange}
                        placeholder="Line"
                        className="mb-2 p-2 border w-full"
                    />
                    <input
                        type="text"
                        name="allianceId"
                        value={formData.allianceId}
                        onChange={handleChange}
                        placeholder="Alliance ID"
                        className="mb-2 p-2 border w-full"
                    />
                    <button type="submit" className="bg-teal-500 text-white px-3 py-1 rounded">Submit</button>
                    <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditPartnerModal;
