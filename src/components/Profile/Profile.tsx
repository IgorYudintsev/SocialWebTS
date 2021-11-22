import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../redux/profile-reducer";

//создаем новую переменную куда кладем все данные после нажатия кнопки
export type propsType =
    {
        profile: profileType,
        status: string,
        isOwner:boolean
        savePhoto:(file: File)=>void
        updateStatus: (status:string)=>void
        saveProfile:(formData:any)=>void
    }

const Profile = ({profile,status,updateStatus,isOwner,savePhoto,saveProfile}:propsType) => {
    return (
        <div>
                                       {/*//пробрасываем далее*/}
            <ProfileInfo isOwner={isOwner} savePhoto={savePhoto} profile={profile}
                         status={status} updateStatus={updateStatus} saveProfile={saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;











