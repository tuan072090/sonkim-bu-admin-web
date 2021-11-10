import React, { useEffect, useRef } from "react";
import styles from './modal.module.scss';
import Button from "../../atoms/button";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ERROR } from "../../../share/reducers/modal-msg/modalMsg.reducer";

const ErrorDialog = () => {
    //@ts-ignore
    const {error}=useSelector(state=>state.modalMsg);
    const dispatch=useDispatch();

    const dialogRef = useRef(null)

    useEffect(() => {
        //  only check when document ready
        if (dialogRef.current) {
            if (error) {
                document.body.style.overflow = 'hidden';    //  disable body scroll
            } else {
                document.body.style.overflow = 'auto';  //  enable body scroll
            }
        }
    }, [dialogRef, error])

    const _close = () => {
        dispatch({
            type: UPDATE_ERROR,
            payload: null
        })
    }

    const isShow = !!error

    return (
        <div ref={dialogRef} className={isShow ? `${styles.modal} ${styles.show}` : styles.modal} onClick={_close}>
            <div className={styles.body} onClick={e => e.stopPropagation()}>
                {
                    error ?
                        <div className="p-4">
                            <h5 className="text-center mb-4">{error.message}</h5>

                            <p className="mb-4">{"code: #" + error.status}</p>

                            <Button onClick={_close} className="w-full" color="red">Đóng</Button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default ErrorDialog
