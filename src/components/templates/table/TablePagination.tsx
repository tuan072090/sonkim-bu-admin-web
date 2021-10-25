/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

type TablePaginationType = {
    count: number;
    onChange: (params: any) => void;
    itemsPerPage: number;
    pageNumber: number;
};

const TablePagination: React.FC<TablePaginationType> = ({
    pageNumber,
    itemsPerPage,
    count,
    onChange,
}) => {
    const totalPage = Math.ceil(count / itemsPerPage);
    const handlePrev = () => {
        if (pageNumber <= 1) return;
        onChange({ pageNumber: pageNumber - 1 });
    };

    const handleNext = () => {
        if (pageNumber >= totalPage) return;
        onChange({ pageNumber: pageNumber + 1 });
    };

    if (!count || !itemsPerPage || !pageNumber || !onChange) return null;

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            {totalPage > 1 ? (<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a onClick={handlePrev} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {new Array(totalPage).fill(0).map((value, key) => {
                            return (
                                <a onClick={() => onChange({ pageNumber: key + 1 })} key={key} className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    {key + 1}
                                </a>
                            );
                        })}
                        <a onClick={handleNext}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </div>) : ''}
        </div>
    );
};

export default TablePagination;
