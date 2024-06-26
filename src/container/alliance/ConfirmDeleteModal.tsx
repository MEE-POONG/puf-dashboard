import React from 'react';

interface ConfirmDeleteModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ show, onClose, onConfirm}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 h-screen">
            <div className="bg-white p-5 rounded shadow-md lg:w-1/3">
                <h2 className="text-xl mb-4">ยืนยันการลบ</h2>
                <p>แน่ใจที่จะลบหรือไม่ ?</p>
                {/* <p>Are you sure you want to delete ?</p> */}
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded mr-2"
                    >
                        ลบ
                    </button>
                    <button 
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded"
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
