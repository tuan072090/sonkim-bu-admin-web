import React from "react";

const Text: React.FC<any> = (props) => {

    return (
        <span {...props}>{props.children}</span>
    )
}

export default Text
