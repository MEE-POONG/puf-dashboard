import axios from "axios";
import useAxios from "axios-hooks";
import React, { useState } from "react";

interface AddPartnerModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;  // Adjust based on what data you need
}

const AddPartnerModal: React.FC<AddPartnerModalProps> = ({ show, onClose, onSubmit }) => {
    if (!show) return null;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
        onClose();  // Close AddPartnerModal after submitting
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen">
            <div className="bg-white rounded-lg p-5 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Add New Partner</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 md:flex gap-5">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" id="firstName" name="firstName" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        </div>
                    </div>
                    <div className="mb-4 md:flex gap-5">
                        <div>
                            <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700">Account Number</label>
                            <input type="text" id="bankAccount" name="bankAccount" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Bank</label>
                            <input type="text" id="bank" name="bank" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">Account Name</label>
                        <input type="text" id="accountName" name="accountName" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div className="mb-4 md:flex gap-5">
                        <div>
                            <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Tel</label>
                            <input type="number" id="tel" name="tel" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="line" className="block text-sm font-medium text-gray-700">Line</label>
                            <input type="text" id="line" name="line" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
                        </div>
                    </div>
                    {/* Add more fields as needed */}


                    <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                    <button type="button" onClick={onClose} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPartnerModal;
