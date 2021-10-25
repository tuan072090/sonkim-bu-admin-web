/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useLayoutEffect, useRef, useState } from "react";
import Button from "../../atoms/button";
import { X } from 'react-feather'
import { ModalTypes } from "./modal.types";

const Modal: React.FC<ModalTypes> = memo(({ show = false, title, onChange, children, onSave }) => {
    const [isShow, setIsShow] = useState(show)
    const modalRef = useRef<HTMLDivElement | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        setIsShow(show)
    }, [show])

    useLayoutEffect(() => {
        _toggleModal()
        if (onChange) {
            onChange(isShow)
        }
    }, [isShow])

    const _toggleModal = () => {
        if (modalRef.current && overlayRef.current) {
            const modalCl = modalRef.current.classList
            const overlayCl = overlayRef.current

            if (isShow) {
                overlayCl.classList.remove('hidden')
                setTimeout(() => {
                    modalCl.remove('opacity-0')
                    modalCl.remove('-translate-y-full')
                    modalCl.remove('scale-150')
                }, 100);
            } else {
                modalCl.add('-translate-y-full')
                setTimeout(() => {
                    modalCl.add('opacity-0')
                    modalCl.add('scale-150')
                }, 100);
                setTimeout(() => overlayCl.classList.add('hidden'), 300);
            }
        }
    }

    const _toggleShowModal = () => {
        setIsShow(!isShow)
    }

    return (
        <div ref={overlayRef} className="hidden z-50 fixed inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0">

            <div ref={modalRef}
                className="opacity-0 transform -translate-y-full scale-150  relative w-10/12 md:w-1/2 h-1/2 md:h-3/4 bg-white rounded shadow-lg transition-opacity transition-transform duration-300">

                {/*close button*/}
                <div
                    onClick={_toggleShowModal}
                    className="bg-gray-900 absolute p-0 -top-6 -right-6 w-12 h-12 flex items-center justify-center rounded-full focus:outline-none text-white">
                    <X size={26} color="white" />
                </div>

                {
                    title && <div className="px-4 py-3 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-600">{title}</h2>
                    </div>
                }


                <div className="w-full p-3">
                    {children}
                </div>

                <div
                    className="absolute bottom-0 left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
                    <Button onClick={onSave} color="primary">Save</Button>

                    <Button onClick={_toggleShowModal} color="red">Close</Button>
                </div>
            </div>

        </div>
    )
})

export default Modal
