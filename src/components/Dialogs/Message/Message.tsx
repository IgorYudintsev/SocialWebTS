import React from 'react';
import s from "./../Dialogs.module.css";

type iMessage = {
    id:number
    message: string
}

const Message = (props: iMessage) => {
    return <div className={s.message}>{props.message}</div>
}

export default Message;