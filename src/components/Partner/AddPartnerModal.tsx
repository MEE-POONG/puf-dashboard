import axios from "axios";
import React, { useState } from "react";

interface AddPartnerModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;  // This may not be needed if API call is handled within the component
}

interface PartnerData {
    firstName: string;
    lastName: string;
    bankAccount: string;
    bank: string;
    accountName: string;
    tel: string;
    line: string;
}

const AddPartnerModal: React.FC<AddPartnerModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    const [formData, setFormData] = useState<PartnerData>({
        firstName: '',
        lastName: '',
        bankAccount: '',
        bank: '',
        accountName: '',
        tel: '',
        line: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/partner', formData);
            console.log('Success:', response.data);
            onClose(); // Close the modal on successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen">
            <div className="bg-white rounded-lg p-5 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Add New Partner</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 md:flex gap-5">
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div className="mb-4 md:flex gap-5">
                        <input type="text" id="bankAccount" name="bankAccount" placeholder="Account Number" onChange={handleChange} value={formData.bankAccount} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        <input type="text" id="bank" name="bank" placeholder="Bank" onChange={handleChange} value={formData.bank} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <input type="text" id="accountName" name="accountName" placeholder="Account Name" onChange={handleChange} value={formData.accountName} required className="mb-4 mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    <div className="mb-4 md:flex gap-5">
                        <input type="text" id="tel" name="tel" placeholder="Tel" onChange={handleChange} value={formData.tel} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        <input type="text" id="line" name="line" placeholder="Line" onChange={handleChange} value={formData.line} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    <button type="button" onClick={onClose} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddPartnerModal;
