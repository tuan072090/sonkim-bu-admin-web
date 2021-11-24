import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useHistory } from "react-router";
import { DataTableBase, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import { InsideApiService, Routers } from "../../share";
import { LoyaltyProgramDataRow } from "../../share/data-types/loyalty-program";

const columns: TableColumn<LoyaltyProgramDataRow>[] = [
    {
        name: "ID",
        cell: (row) => (
            <a href={Routers.LOYALTY_PROGRAMS + `/${row.id}`}>{row.id}</a>
        ),
        sortable: true,
        reorder: true,
        // width: "100px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        wrap: true,
    },
    {
        name: "Image",
        cell: (row) => (
            <img
                src={row.avatar.formats.thumbnail.url}
                width={50}
                height={50}
            />
        ),
        reorder: true,
        center: true,
    },
    {
        name: "BU",
        cell: (row) => (
            <img
                src={row.business_unit.logo.formats.thumbnail.url}
                width={50}
                height={50}
            />
        ),
        reorder: true,
        center: true,
    },
    {
        name: "Level",
        cell: (row) => (
            <div>
                {row.levels.map((level, i) => (
                    <div key={i}>{level.name}</div>
                ))}
            </div>
        ),
    },
    {
        name: "Point System",
        cell: (row) => (
            <img
                src={row.point_system.icon.formats.thumbnail.url}
                width={50}
                height={50}
            />
        ),
        reorder: true,
        center: true,
    },
];

const LoyaltyProgramsPage: React.FC = Layout(() => {
    const [loyaltyPrograms, setLoyaltyPrograms] = useState<null|any[]>(null);
    const history=useHistory();

    const _fetchLoyaltyPrograms = async () => {
        try {
            const { count, loyaltyPrograms } =
                await InsideApiService.LoyaltyService.getLoyaltyPrograms();
            setLoyaltyPrograms(loyaltyPrograms);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        _fetchLoyaltyPrograms();
    }, []);

    const _onRowClicked = (row: any, event: React.MouseEvent) => {
        console.log("row...", row);
        history.push(`${Routers.LOYALTY_PROGRAMS}/${row.id}`);
    };
    return (
        <div>
            {!loyaltyPrograms ? (
                <div className="flex justify-center items-center">
                    <Loader status="info"/>
                </div>
            ) : (
                <DataTableBase
                    title="Loyalty Programs List"
                    columns={columns}
                    data={loyaltyPrograms}
                    onRowClicked={_onRowClicked}
                />
            )}
        </div>
    );
});

export default LoyaltyProgramsPage;
