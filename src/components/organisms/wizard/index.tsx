import React from "react";
import { Clock, Check, Truck, Archive, Award,  } from "react-feather";
// XOctagon
const LineActive = ({ status = false }) => {
    if (status) {
        return <div className="w-full bg-green-300 py-1 rounded" />;
    } else {
        return <div className="w-0 bg-green-300 py-1 rounded" />;
    }
};

const Wizard = ({ status = "" }) => {
    const classActive =
        "w-10 h-10 mx-auto bg-green-500 rounded-full flex justify-center items-center";
    const classIsNotActice =
        "w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full flex justify-center items-center";
    const pending = [
        "pending",
        "verified",
        "shipping",
        "to_receive",
        "completed",
    ].includes(status);
    const verified = ["verified", "shipping", "to_receive", "completed"].includes(
        status
    );
    const shipping = ["shipping", "to_receive", "completed"].includes(status);
    const to_receive = ["to_receive", "completed"].includes(status);
    const completed = ["completed"].includes(status);
    return (
        <div className="w-full">
            <div className="flex">
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div className={pending ? classActive : classIsNotActice}>
                            <Clock size={24} color={pending ? "white" : "#9e9e9e"} />
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">Pending</div>
                </div>
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div
                            className="absolute flex align-center items-center align-middle content-center"
                            style={{
                                width: "calc(100% - 2.5rem - 1rem)",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                <LineActive status={verified} />
                            </div>
                        </div>
                        <div className={verified ? classActive : classIsNotActice}>
                            <Check size={24} color={verified ? "white" : "#9e9e9e"} />
                        </div>
                    </div>

                    <div className="text-xs text-center md:text-base">Verified</div>
                </div>
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div
                            className="absolute flex align-center items-center align-middle content-center"
                            style={{
                                width: "calc(100% - 2.5rem - 1rem)",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                <LineActive status={shipping} />
                            </div>
                        </div>

                        <div className={shipping ? classActive : classIsNotActice}>
                            <Truck size={24} color={shipping ? "white" : "#9e9e9e"} />
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">Shipping</div>
                </div>
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div
                            className="absolute flex align-center items-center align-middle content-center"
                            style={{
                                width: "calc(100% - 2.5rem - 1rem)",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                <LineActive status={to_receive} />
                            </div>
                        </div>
                        <div className={to_receive ? classActive : classIsNotActice}>
                            <Archive size={24} color={to_receive ? "white" : "#9e9e9e"} />
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">To receive</div>
                </div>

                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div
                            className="absolute flex align-center items-center align-middle content-center"
                            style={{
                                width: "calc(100% - 2.5rem - 1rem)",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                <LineActive status={completed} />
                            </div>
                        </div>

                        <div className={completed ? classActive : classIsNotActice}>
                            <Award size={24} color={completed ? "white" : "#9e9e9e"} />
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">Finished</div>
                </div>
            </div>
        </div>
    );
};

export default Wizard;
