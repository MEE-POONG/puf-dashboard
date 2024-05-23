import React, { useState, useEffect } from "react";
import axios from "axios";

interface EditPartnerModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: () => void; // We use onSubmit to refresh the partner list after the modal closes
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

const EditPartnerModal: React.FC<EditPartnerModalProps> = ({ show, onClose, onSubmit, partner }) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (partner) {
                // If editing an existing partner, send a PUT request
                await axios.put(`/api/partner/${partner.id}`, formData);
            } else {
                // If adding a new partner, send a POST request
                await axios.post('/api/partner', formData);
            }
            onSubmit(); // Refresh the partner list
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen">
            <div className="bg-white p-5 rounded shadow-md lg:w-1/3">
                <h2 className="text-xl mb-4">{partner ? 'Edit Partner' : 'Add Partner'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 md:flex gap-5">
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
                    </div>
                    <div className="mb-4 md:flex gap-5">
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
                    </div>
                    <div className="mb-4 md:flex gap-5">
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
                    </div>
                    <div className="mb-4 md:flex gap-5">
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
                    </div>
                    <button type="submit" className="bg-teal-500 text-white px-3 py-1 rounded">Submit</button>
                    <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditPartnerModal;
