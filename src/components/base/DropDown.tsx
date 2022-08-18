import React, {ReactNode} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from "react-router-dom";
import './DropDown.scss'


interface Props{
    children?: ReactNode;
}

export default function DropDown(){

    return(
         <div>
             <div className="btn-group">
                 <button className="btn btn-sm dropdown-toggle"
                         type="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false">
                     Меню
                 </button>
                 <ul className="dropdown-menu">
                     <li>
                         <Link className={window.location.pathname.length === 1 ? "dropdown-item active" : "dropdown-item"}
                               aria-current={window.location.pathname.length === 1 ? 'true' : 'false'}
                               to="/">Главная</Link>
                     </li>
                     <li>
                         <Link className={window.location.pathname.substring(0, 5) === '/news' ? "dropdown-item active" : "dropdown-item"}
                               aria-current={window.location.pathname.substring(0, 5) === '/news' ? 'true' : 'false'}
                               to="/news">Новости</Link>
                     </li>
                     <li>
                         <Link className={window.location.pathname.substring(0, 6) === '/forum' ? "dropdown-item active" : "dropdown-item"}
                               aria-current={window.location.pathname.substring(0, 6) === '/forum' ? 'true' : 'false'}
                               to="/forum">Форум</Link>
                     </li>
                 </ul>
             </div>
         </div>

    )
}