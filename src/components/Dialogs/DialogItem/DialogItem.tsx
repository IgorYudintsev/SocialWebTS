import React from 'react';
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type iDialogItem = {
    id: number,
    name: string
}

const DialogItem = (props: iDialogItem) => {
    return (
        <div className={s.active}><NavLink to={'/dialogs/' + props.id} className={s.LinkD}>{props.name}</NavLink></div>
    )
}

export default DialogItem;