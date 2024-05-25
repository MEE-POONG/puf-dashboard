// Importing necessary modules and icons
import React, { useState } from 'react';
import { FaUserTag } from 'react-icons/fa';

interface TooltipProps {
    tooltipContent: string;  // Tooltip content as a prop
    children: React.ReactNode;  // Children prop to accept button
    border?: string;  // Optional border prop
    background?: string;  // Optional background prop
    color?: string;  // Optional color prop
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipContent, children, border = 'border-black', background = 'bg-black', color = 'text-white' }) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    return (
        <div className="relative flex justify-center items-center">
            <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="focus:outline-none"
            >
                {children}
            </div>
            {showTooltip && (
                <span className={`absolute w-max p-2 top-full z-[10] ${background} ${color} text-sm rounded-md left-1/2 transform -translate-x-1/2 ${border}`}>
                    {tooltipContent}
                </span>
            )}
        </div>
    );
};

export default Tooltip;
