import React, { useEffect } from 'react';
import { FaCheck, FaHurricane, FaXmark } from 'react-icons/fa6';

interface CheckStatusLoadProps {
    status: 'loading' | 'error' | 'success' | null;
    message: string;
    onContinue: () => void;
    onClose: () => void;
}

const CheckStatusLoad: React.FC<CheckStatusLoadProps> = ({ status, message, onContinue, onClose }) => {

    // useEffect(() => {
    //     if (status) {
    //         const timer = setTimeout(() => {
    //             onClose();
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [status, onClose]);

    const buttonColor = status === 'loading' ? 'bg-blue-500 hover:bg-blue-700'
        : status === 'error' ? 'bg-red-500 hover:bg-red-700'
            : 'bg-teal-500 hover:bg-teal-700';
    const textColor = status === 'loading' ? 'text-blue-500 hover:text-blue-700'
        : status === 'error' ? 'text-red-500 hover:text-red-700'
            : 'text-teal-500 hover:text-teal-700';

    return (
        <div className={`absolute z-[999] rounded-lg bg-white w-full h-full p-5 ${!status ? 'hidden' : 'flex'}`}>
            <div className='w-full h-full flex justify-center items-center flex-col'>
                <div className={`${textColor} font-bold text-2xl `}>{message}</div>

                {status === 'loading' && (
                    <FaHurricane className='inline w-72 h-72 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
                )}
                {status === 'error' && (
                    <FaXmark className='inline w-72 h-72 text-red-600 dark:text-gray-600' />
                )}
                {status === 'success' && (
                    <FaCheck className={`${textColor} inline w-72 h-72  dark:text-gray-600`} />
                )}
            </div>
        </div>
    );
};

export default CheckStatusLoad;
