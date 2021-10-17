import React from 'react';
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {istate} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

let mapStatetoProps = (state: istate) => {
    return {
        posts: state.profilePage.posts,
        // newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // updateNewPostText: (text: string) => {
        //     let action = newPostElementCreator(text)
        //     dispatch(action);
        // },
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStatetoProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;


