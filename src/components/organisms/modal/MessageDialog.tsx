import React, {useEffect, useRef} from "react";
import styles from './modal.module.scss';
import Button from "../../atoms/button";
import {UpdateMessage} from "../../../share/reducers/modal-msg";
import {useAppSelector, useAppDispatch} from '../../../share/store'

const MessageDialog = () => {
    const {message} = useAppSelector(state => state.modalMsg);
    const dispatch = useAppDispatch();

    const dialogRef = useRef(null)

    useEffect(() => {
        //  only check when document ready
        if (dialogRef.current) {
            if (message) {
                document.body.style.overflow = 'hidden';    //  disable body scroll
            } else {
                document.body.style.overflow = 'auto';  //  enable body scroll
            }
        }
    }, [dialogRef, message])

    const _close = () => {
        dispatch(UpdateMessage(null))
    }

    const isShow = !!message;

    return (
        <div ref={dialogRef} className={isShow ? `${styles.modal} ${styles.show}` : styles.modal} onClick={_close}>
            <div className={styles.body} onClick={e => e.stopPropagation()}>
                {
                    message ?
                        <div className="p-4">
                            <h5 className="text-center mb-4">{message.title}</h5>

                            {message.body ? <p className="mb-4">{message.body}</p> : null}

                            <Button onClick={_close} className="w-full" color="primary">Đóng</Button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default MessageDialog
