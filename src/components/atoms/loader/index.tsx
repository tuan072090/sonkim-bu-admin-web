import React from "react";
import styles from "./loader.module.scss";
import Colors from "../../../share/utils/colors";

type LoaderProps = {
    status?: "primary" | "info" | "success" | "danger" | "warning" | "default";
    className?: string;
};

const ColorOptions = {
    primary: Colors.primary,
    info: Colors.info,
    success: Colors.success,
    danger: Colors.danger,
    warning: Colors.warning,
    default: "#ffffff",
};

const Loader: React.FC<LoaderProps> = ({
    status = "default",
    className = "",
}) => {
    //  Pure css loader
    let loaderColor = Colors["bodyText"];
    if (status) {
        loaderColor = ColorOptions[status] || loaderColor;
    }
    return (
        <div className={`${styles.ldsSpinner} ${className}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
                return <div key={item} style={{ backgroundColor: loaderColor }} />;
            })}
        </div>
    );
};

export default Loader;
