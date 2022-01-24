import React, { useEffect, useState } from "react";
import {
    DataGrid,
    GridCallbackDetails,
    GridColumns,
    GridRowParams,
    MuiEvent,
    viVN,
} from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

type DataType = {
    count: number;
    data: any[];
};

interface FilterTableType {
    data: null | DataType;
    columns: GridColumns;
    detailRoute: string;
    onFilterChange: (filter: any) => void;
}

const FilterTable: React.FC<FilterTableType> = ({
    data,
    columns,
    detailRoute,
    onFilterChange,
    ...props
}) => {
    const [filter, setFilter] = useState<any>({ _limit: 20, _sort: "id:DESC" });
    const history = useHistory();

    useEffect(() => {
        onFilterChange(filter);
    }, [filter]);

    const _rowClickHandler = (
        params: GridRowParams,
        event: MuiEvent<React.MouseEvent>,
        details: GridCallbackDetails
    ) => {
        const { id } = params;
        //@ts-ignore
        const path = detailRoute.replace(":id", id);
        history.push(path);
    };

    const _onPageChange = (page: number) => {
        //page number is started from 0
        setFilter({ ...filter, _offset: filter._limit * page });
    };

    const _onPageSizeChange = (pageSize: number) => {
        setFilter({ ...filter, _limit: pageSize });
    };

    const _onSortChange = (sortData: any[]) => {
        const fieldSort = sortData[0];
        setFilter({ ...filter, _sort: `${fieldSort.field}:${fieldSort.sort}` });
    };

    const _onFilterChange = (filterData: any) => {
        const { items } = filterData;
        const { columnField, operatorValue, value } = items[0];
        //  Example: title_contains=title
        setFilter({ ...filter, [`${columnField}_${operatorValue}`]: value });
    };

    if (!data) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <DataGrid
            localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
            filterMode="server"
            sortingMode="server"
            paginationMode="server"
            rowCount={data.count}
            pageSize={filter._limit}
            rowsPerPageOptions={[20, 40, 100]}
            autoHeight
            autoPageSize={false}
            onFilterModelChange={_onFilterChange}
            onSortModelChange={_onSortChange}
            onPageChange={_onPageChange}
            onPageSizeChange={_onPageSizeChange}
            // onRowClick={_rowClickHandler}
            rows={data.data || []}
            rowHeight={60}
            columns={columns}
        />
    );
};

export default FilterTable;
