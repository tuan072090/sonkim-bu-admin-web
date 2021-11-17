import React from 'react'
import DataTable from 'react-data-table-component'
import { ArrowDown } from 'react-feather';
//@ts-ignore
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const DataTableBase=(props:any)=> {
    return (
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
            {...props}
        ></DataTable>
    )
}

export default DataTableBase
