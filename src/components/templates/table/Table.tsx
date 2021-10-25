/* eslint-disable array-callback-return */
import React from "react";
import { InputIcon, Select } from "../..";
import Loader from "../../atoms/loader";
import { TableType } from "./table.types";
import TableCell from "./TableCell";
import TableFilter from "./TableFilter";
import TablePagination from "./TablePagination";

const Tables: React.FC<TableType> = ({
    data = [],
    structure,
    isLoading,
    pageNumber,
    handleChange,
    params,
    getState,
    title,
    count,
    itemsPerPage,
    handleChangeParams,
    handleChangeItemsPerPage,
    itemsPerPageOptions,
}) => {
    const selectOptions: any = [];
    itemsPerPageOptions?.map((item: number) => {
        selectOptions.push({
            value: item,
            label: item,
        });
    });

    return (
        <div>
            {title && (
                <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
            )}
            <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                    <Select
                        className="rounded-r-none"
                        onChange={(e) => handleChangeItemsPerPage(+e.target.value)}
                        data={selectOptions}
                    />
                    <Select
                        className="rounded-l-none rounded-r-none border-l-0 border-r-0"
                        data={[
                            { value: "All", label: "All" },
                            { value: "Active", label: "Active" },
                            { value: "Inactive", label: "Inactive" },
                        ]}
                    />
                </div>
                <InputIcon
                    className="text-sm pl-8 pr-6 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                    placeholder="Search"
                />
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                {structure
                                    ? structure.map((item: any, index: number) => {
                                        const key = `cell-${index}`;
                                        return <TableCell key={key} label={item.label} />;
                                    })
                                    : ""}
                            </tr>
                        </thead>
                        <tbody>
                            <TableFilter
                                structure={structure}
                                params={params}
                                handleChangeParams={handleChangeParams}
                            ></TableFilter>
                        </tbody>
                        <tbody>
                            {isLoading ? (
                                <div className="cpnTablerLoadingData">
                                    <Loader />
                                </div>
                            ) : data ? (
                                data.map((rowItem: any, index: number) => {
                                    const key = `row-${index}`;
                                    return (
                                        <tr
                                            key={key}
                                            className="cursor-pointer	 group hover:shadow-lg hover:border-transparent hover:bg-gray-100"
                                        >
                                            {structure.map((column: any, colIndex: number) => {
                                                const colKey = colIndex;
                                                const value = rowItem[column.key];
                                                return (
                                                    <td
                                                        key={colKey}
                                                        className="group-hover:bg-gray-100 px-3 py-3 border-b border-gray-200 bg-white text-sm"
                                                    >
                                                        {column.format ? (
                                                            column.format(value)
                                                        ) : (
                                                            <p
                                                                key={colKey}
                                                                className="text-gray-900 whitespace-no-wrap"
                                                            >
                                                                {value}
                                                            </p>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })
                            ) : (
                                ""
                            )}
                        </tbody>
                    </table>
                    {data.length === 0 ? (
                        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Không có dữ liệu
                            </span>
                        </div>
                    ) : (
                        <TablePagination
                            pageNumber={pageNumber}
                            itemsPerPage={itemsPerPage}
                            onChange={handleChange}
                            count={count}
                        ></TablePagination>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tables;
