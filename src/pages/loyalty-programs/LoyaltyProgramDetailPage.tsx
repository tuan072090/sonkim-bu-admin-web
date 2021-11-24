import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Box, Button, Layout, TextInput } from "../../components";
import insiteApi from "../../share/services/insite-api";

const LoyaltyProgramDetailPage = Layout(() => {
    const params = useParams<{ id: string }>();
    const [loyaltyProgramDetail, setLoyaltyProgramDetail] = useState<any>(null);
    const history=useHistory();
    const _fetchLoyaltyProgramDetail = async () => {
        try {
            const data = await insiteApi.LoyaltyService.getLoyaltyProgramDetail(
                +params.id
            );
            console.log('loyalty program:'+data);
            setLoyaltyProgramDetail(data);
        } catch (error) {
            console.log("error" + error);
        }
    };
    useEffect(() => {
        _fetchLoyaltyProgramDetail();
    }, [params.id]);
    const _onBackButtonClick=()=>{
        history.goBack();
    }
    return (
        <div className="grid grid-cols-4 gap-3">
            {loyaltyProgramDetail ? (
                <>
                    <Box className="col-span-3">
                        <div className="flex flex-col justify-center">
                            
                            <div className="flex flex-row items-center justify-between">
                                <h4 className="font-bold text-xl mb-4">
                                    Chi tiết Loyalty Program
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

export default LoyaltyProgramDetailPage;
