import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { DataTableBase, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import { InsideApiService, Routers } from "../../share";
import { LoyaltyProgramDataRow } from "../../share/data-types/loyalty-program";

const columns: TableColumn<LoyaltyProgramDataRow>[] = [
    {
        name: "ID",
        cell: (row) => <a href={Routers.LOYALTY_PROGRAMS+`/${row.id}`}>{row.id}</a>,
        sortable: true,
        reorder: true,
        width: "100px",
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
                width={row.avatar.formats.thumbnail.width}
                height={row.avatar.formats.thumbnail.height}
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
                width={row.business_unit.logo.formats.thumbnail.width}
                height={row.business_unit.logo.formats.thumbnail.height}
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
                width={row.point_system.icon.formats.thumbnail.width}
                height={row.point_system.icon.formats.thumbnail.height}
            />
        ),
        reorder: true,
        center: true,
    },
];

const LoyaltyProgramsPage: React.FC = Layout(() => {
    const [loyaltyPrograms, setLoyaltyPrograms] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const _fetchLoyaltyPrograms = async () => {
        try {
            const { count, loyaltyPrograms } =
                await InsideApiService.LoyaltyService.getLoyaltyPrograms();
            setLoyaltyPrograms(loyaltyPrograms);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        _fetchLoyaltyPrograms();
    }, []);
    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader status="info"></Loader>
                </div>
            ) : (
                <DataTableBase
                    title="Loyalty Programs List"
                    columns={columns}
                    data={loyaltyPrograms}
                />
            )}
        </div>
    );
});

export default LoyaltyProgramsPage;
