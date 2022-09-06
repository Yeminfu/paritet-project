import React, {ReactNode} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './NewItemDropDown.scss'


interface Props{
    children?: ReactNode;
    onIndex: any;
}

export default function NewItemDropDown({children, onIndex}: Props){

    return(
        <div className="wrapper">
            <div className="btn-group">
                <button className="btn"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                    +
                </button>
                <ul className="dropdown-menu">
                    <li onClick={() => onIndex(0)}>
                        <div className="dropdown-item">Текст</div>
                    </li>
                    <li onClick={() => onIndex(1)}>
                        <div className="dropdown-item">Изображение</div>
                    </li>
                    <li onClick={() => onIndex(2)}>
                        <div className="dropdown-item">Видео</div>
                    </li>
                    <li onClick={() => onIndex(3)}>
                        <div className="dropdown-item">Дата</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}