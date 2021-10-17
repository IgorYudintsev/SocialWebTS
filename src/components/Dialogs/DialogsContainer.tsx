import React from 'react';
import {compose, Dispatch} from 'redux';
import {sendMessageCreator } from './../../redux/dialogs-reducer'
import Dialogs, {DialogGeneralState} from "./Dialogs";
import {connect} from "react-redux";
import { istate} from "../../redux/store";
import {initialStateType} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
type DialogsContainerType={
    state:istate
    auth:initialStateType
}
const mapStatetoProps=(state:AppStateType)=>{
      return{
        dialogsPage:state.dialogsPage,
          }
}

const mapDispatchToProps=(dispatch:Dispatch)=>{
    return{
        sendMessage:(newMessageBody:string)=>{
             dispatch(sendMessageCreator(newMessageBody))
        },
        // Больше не нужен updateNewMessageBody
        // updateNewMessageBody:(body:string)=>{
    }
}

export default compose<React.ComponentType>(
    connect(mapStatetoProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs);



