import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckStatusLoad from "@/components/StatusLoad/CheckStatusLoad";

interface EditPartnerModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: () => void; // Refresh the partner list after the modal closes
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
    createdBy: string;
}

const EditPartnerModal: React.FC<EditPartnerModalProps> = ({ show, onClose, onSubmit, partner }) => {
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'error' | 'success' | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [formData, setFormData] = useState<Partner>({
        id: 0,
        firstName: '',
        lastName: '',
        bankAccount: '',
        accountName: '',
        bank: '',
        tel: '',
        line: '',
        allianceId: '',
        createdBy: 'zxcvbfsadertyui',
    });

    useEffect(() => {
        if (partner) {
            setFormData(partner);
        } else {
            setFormData({
                id: 0,
                firstName: '',
                lastName: '',
                bankAccount: '',
                accountName: '',
                bank: '',
                tel: '',
                line: '',
                allianceId: '',
                createdBy: 'zxcvbfsadertyui',
            });
        }
    }, [partner]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMessage('Loading กำลังโหลด');

        try {
            if (partner) {
                // If editing an existing partner, send a PUT request
                await axios.put(`/api/partner/${partner.id}`, formData);
            } else {
                // If adding a new partner, send a POST request
                await axios.post('/api/partner', formData);
            }
            setStatus('success');
            setStatusMessage('Partner information saved successfully');
            onSubmit(); // Refresh the partner list
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while saving the partner data');
            setStatus('error');
            setStatusMessage('An error occurred while saving the partner data');
        }
    };

    const handleCloseStatus = () => {
        setStatus(null);
        setStatusMessage('');
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen" onClick={handleOverlayClick}>
            <div className="bg-white rounded-lg shadow-lg relative">
                <CheckStatusLoad status={status} message={statusMessage} onContinue={handleCloseStatus} onClose={onClose} />
                <div className="card m-5">
                    <h2 className="text-lg font-bold mb-4">{partner ? 'Edit Partner' : 'Add Partner'}</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="bankAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Account</label>
                                <input
                                    type="text"
                                    id="bankAccount"
                                    name="bankAccount"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.bankAccount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="accountName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Name</label>
                                <input
                                    type="text"
                                    id="accountName"
                                    name="accountName"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.accountName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="bank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank</label>
                                <input
                                    type="text"
                                    id="bank"
                                    name="bank"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.bank}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tel</label>
                                <input
                                    type="text"
                                    id="tel"
                                    name="tel"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.tel}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="line" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Line</label>
                                <input
                                    type="text"
                                    id="line"
                                    name="line"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.line}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="allianceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alliance ID</label>
                                <input
                                    type="text"
                                    id="allianceId"
                                    name="allianceId"
                                    className="p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    value={formData.allianceId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                            <button type="button" onClick={onClose} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPartnerModal;
