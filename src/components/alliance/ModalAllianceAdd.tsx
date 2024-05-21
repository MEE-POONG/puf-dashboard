import axios from "axios";
import React, { useState } from "react";

interface AddPartnerModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;  // This may not be needed if API call is handled within the component
}

interface PartnerData {
    userAccount: string;
    position: string;
    counselor: string;
    percent: string;
    accruedPlus: Boolean;
    getCom: Boolean;
    pay: Boolean;
    adjustPercentage: Boolean;
}

const ModalAllianceAdd: React.FC<AddPartnerModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    const [formData, setFormData] = useState<PartnerData>({
        userAccount: '',
        position: '',
        counselor: '',
        percent: '',
        accruedPlus: false,
        getCom: false,
        pay: false,
        adjustPercentage: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("formData : ", formData);

        // try {
        //     const response = await axios.post('/api/alliance', formData);
        //     console.log('Success:', response.data);
        //     onClose(); // Close the modal on successful submission
        // } catch (error) {
        //     console.error('Error submitting form:', error);
        // }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen">
            <div className="bg-white rounded-lg p-5 shadow-lg">
                <h2 className="text-lg font-bold mb-4">เพิ่ม userAccount</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลือกระดับยูส</label>
                            <select id="position" name="position" className="p-2 w-full border border-gray-300 rounded-md shadow-sm">
                                <option value="" disabled selected>กรุณาเลือกตำแหน่ง</option>
                                <option value="senior">Senior</option>
                                <option value="master">Master</option>
                                <option value="agent">Agent</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยูสต้นสาย</label>
                            <select id="counselor" name="counselor" className="p-2 w-full border border-gray-300 rounded-md shadow-sm">
                                <option value="" disabled selected>เลือกยูสต้นสาย</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="userAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยูสเซอร์ AG</label>
                            <input type="text" id="userAccount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ระบุยูสพันธมิตร" required />
                        </div>
                        <div>
                            <label htmlFor="percent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยอดสู้</label>
                            <input type="number" min={0} max={40} id="percent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ระบุสู้ฟรี" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                        </div>
                        <label>
                            <input type="checkbox" id="accruedPlus" name="accruedPlus" />
                            {formData?.accruedPlus ? '' : 'ไม่'}มียอดค้างบวก
                        </label>
                        <label>
                            <input type="checkbox" id="getCom" name="getCom" />
                            {formData?.getCom ? '' : 'ไม่'}มีค่าคอม
                        </label>
                        <label>
                            <input type="checkbox" id="getCom" name="getCom" />
                            {formData?.adjustPercentage ? '' : 'ไม่'}ปรับเปอร์เซ็น
                        </label>
                        <label>
                            <input type="checkbox" id="pay" name="pay" />
                            {formData?.pay ? '' : 'ไม่'}จ่ายเงิน
                        </label>
                    </div>
                    <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ">Submit</button>
                    <button type="button" onClick={onClose} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ModalAllianceAdd;
