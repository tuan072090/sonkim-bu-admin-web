import React from 'react';
import TableCell from './TableCell';
import Loader from '../../atoms/loader';
import { TableBodyType } from './table.types';


const TableBody: React.FC<TableBodyType> = ({ isLoading, structure, data }) => {
    return (
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
                {isLoading ? <div className="cpnTablerLoadingData">
                    <Loader />
                </div> : data
                    ? data.map((rowItem: any, index: number) => {
                        const key = `row-${index}`;
                        return (
                            <tr key={key}>
                                {structure.map((column: any, colIndex: number) => {
                                    const colKey = colIndex;
                                    const value = rowItem[column.key];
                                    return (
                                        <td
                                            key={colKey}
                                            className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
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
                    : ""}
            </tbody>
        </table>
    );
};



export default TableBody;