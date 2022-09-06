import React, {ReactNode} from "react";
import {Link, useNavigate} from "react-router-dom";
import './MainHeader.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderAuthButton from "../buttons/HeaderAuthButton";
import DropDown from "../base/DropDown";
import iconSearch from '../../assets/icons/IconSearch.svg'
import iconParitet from '../../assets/icons/IconParitet.svg'

interface Props{
    children?: ReactNode;
}

export default function MainHeader({children}: Props){

    const navigate = useNavigate()

    return(
            <div className={'main-header'}>
                    <div className={'upper-header'}>
                        <div className={'logo-wrapper'} onClick={() => {navigate("../", { replace: true });}}>
                            <img className='main-icon' src={iconParitet}/>
                        </div>
                        <div className={'exit-button-wrapper'}>
                            <HeaderAuthButton/>
                        </div>
                    </div>
                    <div className={'lower-header'}>
                        <DropDown/>
                        <form className='search-form'>
                            <div className="search-field-wrapper">
                                <input type="text" placeholder={'Поиск...'} className="form-control"/>
                            </div>
                            <button type="button" className="btn btn-primary">
                                <img src={iconSearch}/>
                            </button>
                        </form>
                        {/*<img src={process.env.PUBLIC_URL+'/assets/IconMenu.svg'}/>*/}
                        {/*<BreadCrumbs/>*/}
                        {/*{
                            useList($breadCrumbs, (e: {crumb: string}, i: number) => (
                                <div>{e.crumb}</div>
                            ))
                        }*/}
                    </div>
            </div>
    )
}