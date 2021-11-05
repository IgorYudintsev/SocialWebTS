import {
    AddPostActionType,
    iprofilePage, SendMessageType,
    setStatusAC,
    setUserProfileActionType, updateNewMessageBodyType,
    updateNewPostTextActionType
} from "./store";
import {profileAPI, usersAPI} from "../api/api";
type contactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type photosType = {
    small: string
    large: string
}
export type profileType = {
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: photosType
    isAuth: boolean
}
export type statusUpdateType = {
    resultCode: number
    messages: Array<string>,
    data: any
}

export type propsProfileType =
    {
        profile: profileType,
        status: string,
        updateStatus: (status: string) => void
        isOwner?: boolean
        savePhoto: (file: File) => void,
    }

const addPost = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'

export type ActionsTypes = AddPostActionType | updateNewPostTextActionType | updateNewMessageBodyType
    | SendMessageType | setUserProfileActionType | setStatusAC | savePhotoSuccessType

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 10},
        {id: 2, message: 'How are you?', likesCount: 100},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state: iprofilePage = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case addPost: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        }
        case  SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
}

//ACType
export type savePhotoSuccessType = {
    type: 'SET_PHOTO_SUCCESS',
    photos: string
}
//AC
export let savePhotoSuccess = (photos: string) => {
    return {
        type: 'SET_PHOTO_SUCCESS',
        photos
    }
}
//Thunk
export let savePhoto = (file: string) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}


export let addPostActionCreator = (newPostText: string): AddPostActionType => {
    return {
        type: addPost,
        newPostText
    }
}
export let setUserProfile = (profile: profileType): setUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export let setStatus = (status: string): setStatusAC => {
    return {
        type: SET_STATUS,
        status
    }
}
export const getUserProfile = (userId: any) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}
export let getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export let updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}


export default profileReducer;

