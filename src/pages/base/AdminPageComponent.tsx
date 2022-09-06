import React, {ReactNode} from "react";

interface Props{
    children?: ReactNode;

}

export default function AdminPageComponent({children}: Props) {



    return(
        <div className={'page'}>
            <div className={'header'}>
                <div className={'upper-header'}>

                </div>
                <div className={'lower-header'}>

                </div>
            </div>
            <div className={'main-area'}>
                <div className={'admin-area'}>

                </div>
                <div className={'view-area'}>

                </div>
            </div>
        </div>
    )
}