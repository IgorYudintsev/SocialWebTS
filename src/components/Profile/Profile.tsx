import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../redux/profile-reducer";

type propsType = {
    profile:profileType
    status:string
    updateStatus:any
    isOwner:boolean
    savePhoto: (file: File) => void,
 }

const Profile = ({profile,status,updateStatus,isOwner,savePhoto}:propsType) => {
    return (
        <div>
                                       {/*//пробрасываем далее*/}
            <ProfileInfo isOwner={isOwner} savePhoto={savePhoto} profile={profile}
                         status={status} updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;











