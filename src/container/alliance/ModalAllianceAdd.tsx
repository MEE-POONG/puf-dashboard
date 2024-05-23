import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckStatusLoad from "@/components/CheckStatusLoad";

interface AddAllianceModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;  // This may not be needed if API call is handled within the component
}

interface AllianceData {
    userAccount: string;
    position: string;
    counselor: string;
    percent: number;
    accruedPlus: boolean;
    getCom: boolean;
    pay: boolean;
    adjustPercentage: boolean;
    createdBy: string;
}
interface CheckUserAccountResponse {
    isUnique: boolean;
}
const ModalAllianceAdd: React.FC<AddAllianceModalProps> = ({ show, onClose, onSubmit }) => {
    if (!show) return null;
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'error' | 'success' | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [formData, setFormData] = useState<AllianceData>({
        userAccount: '',
        position: '',
        counselor: '',
        percent: 0,
        accruedPlus: false,
        getCom: false,
        pay: false,
        adjustPercentage: false,
        createdBy: 'zxcvbfsadertyui',
    });
    const [counselors, setCounselors] = useState<AllianceData[]>([]);

    useEffect(() => {
        const fetchCounselors = async () => {
            if (formData.position === 'agent' || formData.position === 'master') {
                const positionToFetch = formData.position === 'agent' ? 'master' : 'senior';
                try {
                    const response = await axios.get<AllianceData[]>(`/api/alliance/selectPosition`, { params: { position: positionToFetch } });
                    setCounselors(response.data);
                } catch (error) {
                    console.error('Error fetching counselors:', error);
                }
            } else if (formData.position === 'senior') {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    counselor: '',
                }));
            }
        };
        fetchCounselors();
    }, [formData?.position]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: target.checked,
            });
        } else if (type === 'number') {
            setFormData({
                ...formData,
                [name]: parseFloat(value), // Parse the value as a float for number inputs
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMessage('Loading กำลังโหลด');

        if (!formData.position) {
            setError("กรุณาเลือกตำแหน่ง");
            setStatus('error');
            setStatusMessage("กรุณาเลือกตำแหน่ง");
            return;
        }
        if (formData.position !== 'senior' && !formData.counselor) {
            setError("กรุณาเลือกยูสต้นสาย");
            setStatus('error');
            setStatusMessage("กรุณาเลือกยูสต้นสาย");
            return;
        }
        if (!formData.userAccount) {
            setError("กรุณาระบุยูสพันธมิตร");
            setStatus('error');
            setStatusMessage("กรุณาระบุยูสพันธมิตร");
            return;
        }

        try {
            const checkResponse = await axios.get<CheckUserAccountResponse>(`/api/alliance/checkUserAccount`, { params: { userAccount: formData.userAccount } });
            if (!checkResponse.data.isUnique) {
                setError("ยูสเซอร์นี้มีอยู่แล้วในฐานข้อมูล");
                setStatus('error');
                setStatusMessage("ยูสเซอร์นี้มีอยู่แล้วในฐานข้อมูล");
                return;
            }
        } catch (error) {
            console.error('Error checking userAccount:', error);
            setError('An error occurred while checking the user account');
            setStatus('error');
            setStatusMessage('An error occurred while checking the user account');
            return;
        }

        // Submit form
        try {
            const response = await axios.post('/api/alliance', formData);
            if (response?.status === 201) {
                setStatus('success');
                setStatusMessage('Alliance added successfully');
            } else {
                setError('An error occurred while creating the alliance data');
                setStatus('error');
                setStatusMessage('An error occurred while creating the alliance data');
            }
        } catch (error) {
            setError('An error occurred while creating the alliance data');
            setStatus('error');
            setStatusMessage('An error occurred while creating the alliance data');
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

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen" onClick={handleOverlayClick}>
            <div className="bg-white rounded-lg shadow-lg relative" >
                <CheckStatusLoad status={status} message={statusMessage} onContinue={handleCloseStatus} onClose={onClose} />
                <div className="card m-5">
                    <h2 className="text-lg font-bold mb-4">เพิ่ม userAccount</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลือกระดับยูส</label>
                                <select id="position" name="position" className="p-2 w-full border border-gray-300 rounded-md shadow-sm" value={formData.position} onChange={handleChange}>
                                    <option value="" disabled>กรุณาเลือกตำแหน่ง</option>
                                    <option value="senior">Senior</option>
                                    <option value="master">Master</option>
                                    <option value="agent">Agent</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="counselor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยูสต้นสาย</label>
                                <select id="counselor" name="counselor" className="p-2 w-full border border-gray-300 rounded-md shadow-sm" value={formData.counselor} onChange={handleChange} disabled={formData?.position === "" || formData.position === 'senior'}>
                                    <option value="" disabled>เลือกยูสต้นสาย</option>
                                    {counselors.map((counselor) => (
                                        <option key={counselor.userAccount} value={counselor.userAccount}>{counselor.userAccount}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="userAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยูสเซอร์ AG</label>
                                <input type="text" id="userAccount" name="userAccount" className={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${formData?.position === "" ? `bg-gray-50 dark:bg-gray-700` : `bg-white dark:bg-white`} dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="ระบุยูสพันธมิตร" required value={formData.userAccount} onChange={handleChange} disabled={formData?.position === ""} />
                            </div>
                            <div>
                                <label htmlFor="percent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยอดสู้</label>
                                <input type="number" min={0} max={40} id="percent" name="percent" className={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${formData?.position === "" ? `bg-gray-50 dark:bg-gray-700` : `bg-white dark:bg-white`} dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="ระบุสู้ฟรี" required value={formData.percent} onChange={handleChange} disabled={formData?.position === ""} />
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" id="accruedPlus" name="accruedPlus" checked={formData.accruedPlus} onChange={handleChange} disabled={formData?.position === ""} />
                                    {formData.accruedPlus ? '' : 'ไม่'}มียอดค้างบวก
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" id="getCom" name="getCom" checked={formData.getCom} onChange={handleChange} disabled={formData?.position === ""} />
                                    {formData.getCom ? '' : 'ไม่'}มีค่าคอม
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" id="adjustPercentage" name="adjustPercentage" checked={formData.adjustPercentage} onChange={handleChange} disabled={formData?.position === ""} />
                                    {formData.adjustPercentage ? '' : 'ไม่'}ปรับเปอร์เซ็น
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" id="pay" name="pay" checked={formData.pay} onChange={handleChange} disabled={formData?.position === ""} />
                                    {formData.pay ? '' : 'ไม่'}จ่ายเงิน
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded " disabled={formData?.position === ""}>Submit</button>
                        <button type="button" onClick={onClose} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalAllianceAdd;
