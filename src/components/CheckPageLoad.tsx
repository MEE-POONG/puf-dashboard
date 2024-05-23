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
                {/* {status === 'loading' && (
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
                )} */}
                <>
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
                </>
                <div className='w-full flex justify-around '>
                    <button
                        type="button"
                        className={`${status === 'error' ? `` : `hidden`} font-bold py-2 px-4 rounded mt-4 text-gray-900 bg-gray-100 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-100  text-sm text-center inline-flex items-center dark:focus:ring-gray-700`}
                        onClick={onContinue}
                    >
                        กลับไปทำ
                    </button>
                    <button
                        type="button"
                        className={`${buttonColor} ${status === 'error' || status === 'success' ? `` : `hidden`} font-bold py-2 px-4 rounded mt-4 text-gray-900 bg-gray-500  focus:ring-4 focus:outline-none focus:ring-red-100  text-sm text-center inline-flex items-center `}
                        onClick={onClose}
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckStatusLoad;
