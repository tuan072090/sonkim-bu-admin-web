import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Box, Button, Layout } from "../../components";
import insiteApi from "../../share/services/insite-api";

const StoreDetailPage = Layout(() => {
    const params = useParams<{ id: string }>();
    const [storeDetail, setStoreDetail] = useState<any>(null);
    const history=useHistory();
    const _fetchStoreDetail = async () => {
        try {
            const data = await insiteApi.StoreService.getStoreDetail(
                +params.id
            );
            console.log('store:'+data);
            setStoreDetail(data);
        } catch (error) {
            console.log("error" + error);
        }
    };
    useEffect(() => {
        _fetchStoreDetail();
    }, [params.id]);
    const _onBackButtonClick=()=>{
        history.goBack();
    }
    return (
        <div className="grid grid-cols-4 gap-3">
            {storeDetail ? (
                <>
                    <Box className="col-span-3">
                        <div className="flex flex-col justify-center">
                            
                            <div className="flex flex-row items-center justify-between">
                                <h4 className="font-bold text-xl mb-4">
                                    Chi tiết Store
                                </h4>
                                <Button size="small" className="w-24 flex flex-row items-center justify-evenly" onClick={_onBackButtonClick}>
                                    <ChevronLeft></ChevronLeft>
                                    <p>Trở về</p>
                                </Button>
                            </div>
                            
                        </div>
                    </Box>
                    <Box>
                        <h4 className="font-bold text-xl mb-4">
                            Thông tin BU
                        </h4>
                    </Box>
                </>
            ) : null}
        </div>
    );
});

export default StoreDetailPage;
