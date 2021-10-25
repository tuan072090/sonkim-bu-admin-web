import React from "react";
import { Select, TextInput } from "../..";
import { TableFilterType, FilterTypes } from "./table.types";

const TableFilter: React.FC<TableFilterType> = ({
    structure,
    params,
    handleChangeParams,
}) => {

    return (
        <tr

        >
            {structure.map((col: any, key: number) => {
                const colFilterConfigs = col.filter;

                if (!colFilterConfigs) return <td key={key} className="px-5 py-5 border-b border-gray-200 bg-white text-sm" />;
                return (
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {colFilterConfigs.type === FilterTypes.optionsSelect && (
                            <Select
                                data={colFilterConfigs.options}
                                onChange={(value) => {
                                    handleChangeParams(
                                        col.key,
                                        value.currentTarget.value
                                    );
                                }}
                            ></Select>
                        )}
                        {colFilterConfigs.type === FilterTypes.textInput && (
                            <TextInput
                                onChange={(value) => {
                                    handleChangeParams(
                                        col.key,
                                        value.currentTarget.value
                                    );
                                }}
                                placeholder={colFilterConfigs.placeholder}
                            ></TextInput>
                        )}
                        {colFilterConfigs.type === FilterTypes.textInput && (
                            <TextInput
                                onChange={(value) => {
                                    handleChangeParams(
                                        col.key,
                                        value.currentTarget.value
                                    );
                                }}
                                placeholder={colFilterConfigs.placeholder}
                            ></TextInput>
                        )}

                    </td>
                );
            })}
        </tr>
    );
};

export default TableFilter;
