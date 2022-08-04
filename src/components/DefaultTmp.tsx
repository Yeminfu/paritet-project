import MainHeader from "./MainHeader";
import React from "react";

interface Props{
    children: any;
}

export default ( {children}: Props ) => {
    return (
        <>
            <MainHeader>

            </MainHeader>
            <div id="page_content">
                {children}
            </div>
        </>
    )
}