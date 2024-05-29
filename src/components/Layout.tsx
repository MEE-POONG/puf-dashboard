import React, { useState, useEffect } from 'react';
import { FaCheck, FaHurricane, FaXmark } from 'react-icons/fa6';
import Sidebar from "./Sidebar";
import { Prompt } from 'next/font/google';

interface StatusLoadProps {
    status: 'loading' | null;
    message: string;
    onContinue: () => void;
    onClose: () => void;
}

const StatusLoad: React.FC<StatusLoadProps> = ({ status }) => {
    const textColor = status === 'loading' ? 'text-blue-500 hover:text-blue-700'
        : status === 'error' ? 'text-red-500 hover:text-red-700'
            : 'text-teal-500 hover:text-teal-700';

    return (
        <div className='w-full h-full flex justify-center items-center flex-col'>
            <div className={`${textColor} font-bold text-2xl `}>กำลังโหลด</div>
            {status === 'loading' && (
                <FaHurricane className='inline w-72 h-72 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
            )}
        </div>
    );
};

const promt = Prompt({
    weight: '400',
    subsets: ['latin'],
});

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState<'loading' | null>('loading');

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(null);
        }, 3000); // Simulate 3 seconds loading time

        return () => clearTimeout(timer);
    }, []);

    const openSidebar = () => {
        // Implement openNav functionality
    };

    return (
        <section className={promt.className}>
            <Sidebar openSidebar={openSidebar} />
            <main className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-4">
                {loading === 'loading' ? (
                    <StatusLoad status="loading" message="Loading..." onContinue={() => setLoading(null)} onClose={() => setLoading(null)} />
                ) : (
                    children
                )}
            </main>
        </section>
    );
}