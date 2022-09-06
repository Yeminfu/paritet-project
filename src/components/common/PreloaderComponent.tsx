import React from "react";
import './PreloaderComponent.scss'
import progressIndicator from '../../assets/icons/IconProgressIndicator.svg'

export default function PreloaderComponent(){

    return(
        <div className='preloader-container'>

            <img src={progressIndicator} className='progress-indicator'/>
        </div>
    )
}