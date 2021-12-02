import React, {useEffect, useState} from "react";

const ErrorFallback:React.FC<{ error: any, resetErrorBoundary: any }> = ({error, resetErrorBoundary}) => {

    useEffect(() => {
        //  tracking error
    },[error])

    return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Có lỗi</p>
            <p>{error.message}</p>
        </div>
    )
}

export default ErrorFallback
