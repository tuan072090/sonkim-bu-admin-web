import React from "react";
import DataTable, { TableProps } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
//@ts-ignore
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const customStyles = {
    rows: {
        style: {
            minHeight: "72px", // override the row height
            padding: "8px",
            borderRadius: "8px",
        },
    },
    headCells: {
        style: {
            backgroundColor: "#328396",
            color: "#ffffff",
        },
    },
    cells: {
        style: {
            borderRadius: "8px",
        },
    },
};

const DataTableBase = (props: TableProps<any>) => {
    const { columns, data } = props;
    const tableData = { columns, data };
    return (
        <DataTableExtensions {...tableData} filterPlaceholder="Search table...">
            <DataTable
                pagination
                selectableRowsComponentProps={selectProps}
                selectableRows
                highlightOnHover
                pointerOnHover
                striped
                selectableRowsHighlight
                fixedHeader
                responsive={true}
                customStyles={customStyles}
                {...props}
            />
        </DataTableExtensions>
    );
};

export default DataTableBase;
