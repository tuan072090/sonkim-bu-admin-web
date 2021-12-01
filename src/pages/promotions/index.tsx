import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useHistory } from "react-router";
import { Box, DataTableBase, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import { Routers } from "../../share";
import { PromotionDataRow } from "../../share/data-types/promotion";
import insiteApi from "../../share/services/insite-api";
import { FormatVND } from "../../share/utils/formater";

const columns: TableColumn<PromotionDataRow>[] = [
    {
        name: "ID",
        cell: (row) => <a href={Routers.PROMOTIONS + `/${row.id}`}>{row.id}</a>,
        sortable: true,
        reorder: true,
    },
    {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
        reorder: true,
        wrap: true,
    },
    {
        name: "Description",
        cell: (row) => <div>{`${row.description.slice(0, 100)}...`}</div>,
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
        name: "Cash",
        selector: (row) => FormatVND(row.cash),
        sortable: true,
        reorder: true,
        center: true,
    },
    {
        name: "Loyalty program",
        cell: (row) => <a href="#">{row.loyalty_program.name}</a>,
        sortable: true,
        reorder: true,
    },
    {
        name: "Stores",
        cell: (row) => (
            <div>
                {row.stores.map((store, i) => (
                    <div key={i}>{store.name}</div>
                ))}
            </div>
        ),
        reorder: true,
        center: true,
    },
];

const PromotionsPage: React.FC = Layout(() => {
    const [promotions, setPromotions] = useState<null | any[]>(null);
    const history = useHistory();

    useEffect(() => {
        _fetchPromotions();
    }, []);

    const _fetchPromotions = async () => {
        try {
            const { promotions, count } =
                await insiteApi.PromotionService.getPromotions();
            console.log("dc ma");
            setPromotions(promotions);
        } catch (error) {
            console.log(error);
        }
    };

    const _onRowClicked = (row: any, event: React.MouseEvent) => {
        console.log("row...", row);
        history.push(`${Routers.PROMOTIONS}/${row.id}`);
    };

    return (
        <div>
            {!promotions ? (
                <div className="flex justify-center items-center">
                    <Loader status="info" />
                </div>
            ) : (
                <Box>
                    <DataTableBase
                        title="Promotions List"
                        columns={columns}
                        data={promotions}
                        onRowClicked={_onRowClicked}
                    />
                </Box>
            )}
        </div>
    );
});

export default PromotionsPage;
