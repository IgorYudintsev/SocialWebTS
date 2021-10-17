import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderType = {
    login: string | null,
    isAuth: boolean,
    logout:()=>void
}
const Header = (props:HeaderType) => {
    return <>
        <header className={s.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/170px-Apple_logo_white.svg.png'/>
            <div className={s.loginBlock}>
                {props.isAuth
                    //в шапке появляется Log out
                    ?<div>{props.login} : <button onClick={props.logout}>Log out</button></div>
                    :<NavLink  to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    </>
}

export default Header;





