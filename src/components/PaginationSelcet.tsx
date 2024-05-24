import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
interface PaginationSelcetProps {
    page: number;
    pageSize: number;
    totalPages: number;
    onChangePage: (size: number) => void;
    onChangePageSize: (size: number) => void;
}
const PaginationSelcet: React.FC<PaginationSelcetProps> = ({ page, pageSize, totalPages, onChangePage, onChangePageSize }) => {
    let paginationItems = [];

    let start = page - 2;
    let end = page + 2;

    // Adjust the start and end values when they're out of bounds
    if (start < 1) {
        end += (1 - start);
        start = 1;
    }
    if (end > totalPages) {
        start -= (end - totalPages);
        end = totalPages;
    }

    // Generate the range of numbers
    for (let i = start; i <= end; i++) {
        if (i > 0) {
            paginationItems.push(
                <li key={'page-' + i} onClick={() => onChangePage(i)}>
                    <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight border ${page === i ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                        {i}
                    </a>
                </li>
            );
        }
    }
    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between py-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white mx-2">1 - 10</span>
                of
                <select
                    value={pageSize} // Use `value` instead of `defaultValue` for controlled component
                    onChange={e => onChangePageSize(Number(e.target.value))} // Add onChange handler to update page size
                    className="mx-2 items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
                    <option value={1000}>1000</option>
                </select>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <FaArrowLeft />
                    </a>
                </li>
                {paginationItems}
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <FaArrowRight />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default PaginationSelcet;
