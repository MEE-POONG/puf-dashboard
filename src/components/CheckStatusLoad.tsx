import React, { useState } from 'react';
import { FaCheck, FaHurricane, FaXmark } from 'react-icons/fa6';

const CheckStatusLoad: React.FC = () => {

    return (
        <div className='absolute z-[999] rounded-lg bg-white w-full h-full p-5'>
            <div className=' w-full h-full flex justify-center items-center flex-col '>
                <div role="load" className='font-bold text-2xl text-blue-600'>
                    Loading กำลังโหลด
                </div>
                <FaHurricane className='inline w-72 h-72 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
                <div role="error" className='font-bold text-2xl text-red-600'>
                    Error เกิดข้อผิดพลาด
                </div>
                <FaXmark className='inline w-72 h-72 text-red-600  dark:text-gray-600 ' />
                <div role="success" className='font-bold text-2xl text-teal-500'>
                    Success สำเร็จ
                </div>
                <FaCheck className='inline w-72 h-72 text-teal-500  dark:text-gray-600 ' />
                <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded " >
                    OK
                </button>
            </div>

        </div>
    );
};

export default CheckStatusLoad;
