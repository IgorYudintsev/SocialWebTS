import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Preloader} from "../common/Preloader/Preloader";
import {profileType} from "../../redux/profile-reducer";

type propsType = {
    profile:profileType
    status:string
    updateStatus:any
 }

const Profile = ({profile,status,updateStatus}:propsType) => {
    return (
        <div>
            <ProfileInfo profile={profile}  status={status} updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;











