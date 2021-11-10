/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_ERROR } from "../../../share/reducers/modal-msg/modalMsg.reducer";
import Table from "./Table";
import { Structure } from "./table.types";

const Tables: React.FC<Structure> = ({
    structure = [],
    onChange = () => false,
    defaultPageNumber = 1,
    itemsPerPageOptions = [10, 20, 30, 40],
    title,
}) => {
    const dispatch=useDispatch();
    const [isInited, setIsInited] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(defaultPageNumber);
    const [params, setParams] = useState({});
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    const getState = (newState?: any) => {
        return {
            pageNumber,
            params,
            ...newState,
        };
    };

    const handleChange = (state: any) => {
        const pageNumberNew = state.pageNumber || pageNumber;
        const paramsNew = state.params || params;

        const itemsPerPageNew = state.itemsPerPage || itemsPerPage;

        if (typeof onChange === "function") {
            setIsLoading(true);

            const callBack = (response: any) => {
                if (typeof response !== "object" || Array.isArray(response))
                    console.log("onChange - callBack", "Must be return an object");
                else {
                    // Set data
                    if (Array.isArray(response.data)) {
                        setData(response.data);
                    }
                    // Set count
                    if (typeof response.count === "number") {
                        setCount(response.count);
                    }
                    // Set error message
                    if (response.errorMessage) {
                        dispatch({
                            type: UPDATE_ERROR,
                            payload: response.errorMessage,
                        });
                    }
                }
                setIsLoading(false);
            };

            setPageNumber(pageNumberNew);
            setParams(paramsNew);
            setItemsPerPage(itemsPerPageNew);
            onChange(
                {
                    pageNumber: pageNumberNew,
                    itemsPerPage: itemsPerPageNew,
                    params: paramsNew,
                },
                callBack
            );
        } else {
            console.log("onChange", "Must be a function");
        }
    };

    const handleChangeItemsPerPage = (newItemsPerPage: number) => {
        handleChange({ itemsPerPage: newItemsPerPage, pageNumber: 1 });
    };

    const initData = () => {
        // Get Params filter default
        let defaultFilterParams = {};

        // Init data when first render
        handleChange({ params: defaultFilterParams });
    };

    const handleChangeParams = (fieldName: any, value: any, additionParams: any) => {
        setParams((state) => {
            const newParams = !additionParams
                ? { ...state, [fieldName]: value }
                : { ...state, ...additionParams };
            // const stateLookup = 


            handleChange({ ...getState(), params: newParams, pageNumber: 1 });
            return newParams;
        });
    };



    // ============================ Effects ============================
    useEffect(() => {
        if (isInited) return;
        setIsInited(true);
        initData();
    }, [isInited, handleChange, structure, initData]);

    return (
        <div>
            <Table
                isLoading={isLoading}
                title={title}
                handleChange={handleChange}
                itemsPerPage={itemsPerPage}
                pageNumber={pageNumber}
                count={count}
                itemsPerPageOptions={itemsPerPageOptions}
                handleChangeItemsPerPage={handleChangeItemsPerPage}
                data={data}
                structure={structure}
                params={params}
                getState={getState}
                handleChangeParams={handleChangeParams}
            ></Table>
        </div>
    );
};

export default Tables;
