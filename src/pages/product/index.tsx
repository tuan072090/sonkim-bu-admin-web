import React from 'react';
import { Box, Layout } from '../../components';
import Tables from '../../components/templates/table';
import ProductServices from '../../share/services/insite-api/Products';

const Product = Layout(() => {

    return (
        <Box className="mt-5">
            <Tables
                title={"Danh sách danh mục"}
                structure={[
                    {
                        label: "Id",
                        key: "id",
                    },
                    // {
                    //     label: "Image",
                    //     key: "image",
                    //     format: (value: any) => {
                    //         return (
                    //             <div className="flex items-center">
                    //                 <div className="flex-shrink-0 w-10 h-10">
                    //                     <img
                    //                         className="w-full h-full rounded-full"
                    //                         src={value}
                    //                         alt=""
                    //                     />
                    //                 </div>
                    //             </div>
                    //         );
                    //     },
                    // },
                    {
                        label: "Name",
                        key: "name",
                    },
                    {
                        label: "Alias",
                        key: "alias",
                    },
                    // {
                    //     label: "Description",
                    //     key: "description",
                    //     format: (value: any) => {
                    //         console.log("format", value);
                    //         return (
                    //             <div className="flex items-center">
                    //                 <div className="ml-3">
                    //                     <p
                    //                         className="text-gray-900 whitespace-no-wrap"
                    //                         dangerouslySetInnerHTML={{ __html: value || "" }}
                    //                     ></p>
                    //                 </div>
                    //             </div>
                    //         );
                    //     },
                    // },
                    {
                        key: "published_at",
                        label: "Published at",
                    },
                    {
                        key: "created_at",
                        label: "Created at",
                    },
                    {
                        key: "updated_at",
                        label: "Updated at",
                    },
                ]}
                onChange={(
                    { params = {}, itemsPerPage = 10, pageNumber = 1 },
                    callBack: (res: any) => void
                ) => {
                    ProductServices.GetProduct({
                        ...params,
                        limit: itemsPerPage,
                        offset: (pageNumber - 1) * itemsPerPage,
                    })
                        .then(({ data, count }) => {

                            callBack({
                                data: data,
                                count: count,
                            });
                        })
                        .catch((err) => {
                            callBack({ errorMessage: err });
                        });
                }}
            />
        </Box>
    );
})


export default Product;
