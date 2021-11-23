import React from 'react'
import DataTable, {TableProps} from 'react-data-table-component'
//@ts-ignore
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
            padding:'8px',
            borderRadius:'8px'
        },
    },
    headCells: {
        style: {
            backgroundColor:'#328396',
            color:'#ffffff',
        },
    },
    cells: {
        style: {
            borderRadius:'8px'
        },
    },
};



const DataTableBase=(props:TableProps<any>)=> {
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
            customStyles={customStyles}
            {...props}
        />
    )
}

export default DataTableBase
