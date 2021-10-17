import React, {ChangeEvent} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {idialogsPage} from '../../redux/store'
import {Redirect} from 'react-router-dom';
import AddMessageForm from "./AddMessageForm/AddMessageForm";

export type DialogGeneralState = {
    dialogsPage: idialogsPage
    sendMessage: (newMessageBody: string) => void
    updateNewMessageBody: (body: string) => void
    isAuth: boolean
}

let Dialogs = (props: DialogGeneralState) => {
    let state = props.dialogsPage
    let addNewMassage = (values: any) => {
        props.sendMessage(values.newMessageBody);
    }
    if (props.isAuth == false) return <Redirect to={'/Login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {state.dialogs.map(m => <DialogItem name={m.name} id={m.id}/>)}
            </div>
            <div className={s.messages}>
                <div>{state.messages.map(m => <Message message={m.message} id={m.id}/>)}</div>
                <div>
                    <AddMessageForm onSubmit={addNewMassage}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
