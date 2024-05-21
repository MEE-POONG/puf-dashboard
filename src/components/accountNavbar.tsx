import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import Link from 'next/link';

const AccoutNavbar: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="relative">
            <div className="flex-none h-full text-center flex items-center justify-center">
                <button onClick={toggleDropdown} className='hover:text-red-700'>
                    <BiUser size={20} />
                </button>
            </div>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                    <ul className="py-1">
                        <li className="px-4 py-2 hover:bg-gray-950 hover:text-white cursor-pointer">
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-950 hover:text-white cursor-pointer">
                            <Link href="/login">Logout</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AccoutNavbar;
