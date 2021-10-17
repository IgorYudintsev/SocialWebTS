import React from 'react';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sideBarReducer from "./sideBar-reducer";
import {initialStateType} from "./auth-reducer";

export type idialogs = {
    id: number,
    name: string
}
export type imessages = {
    id: number,
    message: string
}
export type idialogsPage = {
    messages: Array<imessages>
    dialogs: Array<idialogs>,
    // newMessageBody: string
}
export type iposts = {
    id: number,
    message: string,
    likesCount: number
}
export type iprofilePage = {
    posts: Array<iposts>
    // newPostText: string
    profile:any
    status:string
}
export type isidebar = {}
export type istate = {
    profilePage: iprofilePage,
    dialogsPage: idialogsPage,
    sidebar: isidebar,
  }
export type StoreType = {
    _state: istate
    _callSubscriber: (state: istate) => void
    subscribe: (observer: (state: istate) => void) => void
    getState: () => istate
    dispatch: (action: ActionsTypes) => void
}
export type AddPostActionType = {
    type: 'ADD-POST',
    newPostText:string
}
export type updateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string
}
export type setUserProfileActionType = {
    type: 'SET_USER_PROFILE',
    profile: any
}
export type setStatusAC={
    type: 'SET_STATUS',
    status: string
}
export type updateNewMessageBodyType = {
    type: 'update-New-Message-Body'
    body: string
}
export type SendMessageType = {
    type: 'Send-Message',
    newMessageBody:string
}
export type ActionsTypes = AddPostActionType | updateNewPostTextActionType | updateNewMessageBodyType
    | SendMessageType |setUserProfileActionType|setStatusAC

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi', likesCount: 10},
                {id: 2, message: 'How are you?', likesCount: 100},
            ],
            // newPostText: 'it-kamasutra.com',
            profile:null,
            status:''
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Yoo'},
                {id: 4, message: 'How are you?'},
                {id: 5, message: 'Yoo'},
            ],
            dialogs: [
                {id: 1, name: 'Dimach'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Igor'},
                {id: 4, name: 'Olga'},
                {id: 5, name: 'Nadzeika'},
            ],
            // newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubscriber(state: istate) {
        console.log('rerenderEntireTree');
    },
    getState() {
        return this._state;
    },
    subscribe(observer: (state: istate) => void) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sideBarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    }
}

export default store;










