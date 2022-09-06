import React, {ReactNode, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {$breadCrumbs} from "../../store/store";
import { useList } from "effector-react";
import './BreadCrumbs.scss'

interface Props {
    children?: ReactNode;
}

export default function BreadCrumbs({children}: Props){

    const [crumbs, setCrumbs] = useState($breadCrumbs.getState())
    useEffect(() => {
        console.log("BC", $breadCrumbs.getState())
        setCrumbs($breadCrumbs.getState())
    }, [$breadCrumbs])

    return(
        <div className="bread-crumbs">
            {
                crumbs?.map((e: string, i: number) => {
                    return (i < crumbs.length - 1 && crumbs.length > 1)
                        ? <div className='crumb' key={i}>{e}</div>
                        : <div className='active' key={i}>{e}</div>
                })
            }

        </div>
    )
}
            //{
            //    useList($breadCrumbs, (e: {crumb: string}, i: number) => (
            //        $breadCrumbs.length > 0 && index < $breadCrumbs.length-1
            //            ? <li className="breadcrumb-item">
            //                <Link to="#"><>{e.crumb}</></Link>
            //            </li>
            //            : <li className="breadcrumb-item active" aria-current="page">
            //                <>{e.crumb}</>
            //    ))
            //}