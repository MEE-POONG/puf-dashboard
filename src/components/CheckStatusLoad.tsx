import React from 'react';
import { FaCheck, FaHurricane, FaXmark } from 'react-icons/fa6';

interface CheckStatusLoadProps {
    status: 'loading' | 'error' | 'success' | null;
    message: string;
}

const CheckStatusLoad: React.FC<CheckStatusLoadProps> = ({ status, message }) => {
    return (
        <div className={`absolute z-[999] rounded-lg bg-white w-full h-full p-5 ${!status ? 'hidden' : 'flex'}`}>
            <div className='w-full h-full flex justify-center items-center flex-col'>
                {status === 'loading' && (
                    <>
                        <div className='font-bold text-2xl text-blue-600'>{message}</div>
                        <FaHurricane className='inline w-72 h-72 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
                    </>
                )}
                {status === 'error' && (
                    <>
                        <div className='font-bold text-2xl text-red-600'>{message}</div>
                        <FaXmark className='inline w-72 h-72 text-red-600 dark:text-gray-600' />
                    </>
                )}
                {status === 'success' && (
                    <>
                        <div className='font-bold text-2xl text-teal-500'>{message}</div>
                        <FaCheck className='inline w-72 h-72 text-teal-500 dark:text-gray-600' />
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckStatusLoad;
