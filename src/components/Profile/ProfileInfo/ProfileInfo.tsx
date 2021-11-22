import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import {contactsType, profileType, propsProfileType} from "../../../redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import {ProfileDataForm, ProfileDataFormReduxForm} from "./ProfileDataForm";
import {propsType} from "../Profile";


const ProfileInfo = (props: propsType) => {
    const [editMode, setEditMode] = useState(false)

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files!.length) {
            props.savePhoto(e.target.files![0])
        }
    }

    const onSubmit = (formData: any) => {
        props.saveProfile({formData})
    }

    useEffect(() => {
        setEditMode(false);
    }, [props.profile])

    // подставляем условие в рендер, чтобы не выбивал ошибку useEffect
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div className={s.content}>
                    <img src='https://wallpapercave.com/wp/wp2570965.jpg'/>
                </div>
                <div className={s.descriptionBlock}>
                    <img src={props.profile.photos.small != null
                        ? props.profile.photos.small
                        : 'https://e7.pngegg.com/pngimages/613/636/png-clipart-computer-icons-user-profile-male-avatar-avatar-heroes-logo.png'}
                         className={styles.picture}
                    />
                    <div style={{marginLeft: '10px'}}>
                        {props.isOwner && <input onChange={mainPhotoSelected} type={'file'}/>}
                    </div>
                    <div style={{marginLeft: '10px'}}>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    </div>
                    {console.log(props.profile)}
                    {editMode
                        //                        инициализационный стейт, который совпал с profile
                        ? <ProfileDataFormReduxForm initialValues={props.profile} onSubmit={onSubmit}/>  //редактирует
                        : <ProfileData goToEditMode={() => setEditMode(true)}
                                       profile={props.profile} //просто отрисовывает
                                       isOwner={props.isOwner}/>}
                </div>
            </div>
        )
    }
}

export type ProfileDataType = {
    profile: profileType,
    isOwner?: boolean
    goToEditMode?: () => void
}
const ProfileData = (props: ProfileDataType) => {
    return (
        <div style={{marginLeft: '10px', color: 'white'}}>
            {props.isOwner && <button onClick={props.goToEditMode}>EDIT</button>}
            <div>
                <b>Full name</b>:{props.profile.fullName}
            </div>
            <div>
                <b>Lookig for a job</b>:{props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {props.profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>:{props.profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me</b>:{props.profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:{Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key}
                                contactValue={props.profile.contacts[key as keyof contactsType]}/>
            })}
            </div>
        </div>
    )
}

type ContactType = {
    contactTitle: string,
    contactValue: string
}
export const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>:{contactValue}
    </div>
}

export default ProfileInfo;


//-----------------------------------------------------------------------------------
// import React, {ChangeEvent, useEffect, useState} from 'react';
// import s from './ProfileInfo.module.css';
// import {Preloader} from "../../common/Preloader/Preloader";
// import styles from "./ProfileInfo.module.css";
// import {contactsType, profileType, propsProfileType} from "../../../redux/profile-reducer";
// import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
// import {ProfileDataForm, ProfileDataFormReduxForm} from "./ProfileDataForm";
// import {propsType} from "../Profile";
//
//
// const ProfileInfo = (props: propsType) => {
//     const [editMode, setEditMode] = useState(false)
//     if (!props.profile) {
//         return <Preloader/>
//     }
//     const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files!.length) {
//             props.savePhoto(e.target.files![0])
//         }
//     }
//
//
//     const onSubmit = (formData: any) => {
//         props.saveProfile({formData})
//         // если не закомментить, то сохраняет/несохраняет в любом случае
//         // без вывода ошибки
//         // setEditMode(false)
//     }
//
//     useEffect(() => {
//         setEditMode(false);
//     }, [props.profile])
//
//     return (
//         <div>
//             <div className={s.content}>
//                 <img src='https://wallpapercave.com/wp/wp2570965.jpg'/>
//             </div>
//             <div className={s.descriptionBlock}>
//                 <img src={props.profile.photos.small != null
//                     ? props.profile.photos.small
//                     : 'https://e7.pngegg.com/pngimages/613/636/png-clipart-computer-icons-user-profile-male-avatar-avatar-heroes-logo.png'}
//                      className={styles.picture}
//                 />
//                 <div style={{marginLeft: '10px'}}>
//                     {props.isOwner && <input onChange={mainPhotoSelected} type={'file'}/>}
//                 </div>
//                 <div style={{marginLeft: '10px'}}>
//                     <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
//                 </div>
//                 {console.log(props.profile)}
//                 {editMode
//                     //                        инициализационный стейт, который совпал с profile
//                     ? <ProfileDataFormReduxForm  initialValues={props.profile}  onSubmit={onSubmit}/>  //редактирует
//                     : <ProfileData goToEditMode={() => setEditMode(true)} profile={props.profile} //просто отрисовывает
//                                    isOwner={props.isOwner}/>}
//             </div>
//         </div>
//     )
// }
//
// export type ProfileDataType = {
//     profile: profileType,
//     isOwner?: boolean
//     goToEditMode?: () => void
// }
// const ProfileData = (props: ProfileDataType) => {
//     return (
//         <div style={{marginLeft: '10px', color: 'white'}}>
//             {props.isOwner && <button onClick={props.goToEditMode}>EDIT</button>}
//             <div>
//                 <b>Full name</b>:{props.profile.fullName}
//             </div>
//             <div>
//                 <b>Lookig for a job</b>:{props.profile.lookingForAJob ? 'yes' : 'no'}
//             </div>
//             {props.profile.lookingForAJob &&
//             <div>
//                 <b>My professional skills</b>:{props.profile.lookingForAJobDescription}
//             </div>
//             }
//             <div>
//                 <b>About me</b>:{props.profile.aboutMe}
//             </div>
//             <div>
//                 <b>Contacts</b>:{Object.keys(props.profile.contacts).map(key => {
//                 return <Contact key={key} contactTitle={key}
//                                 contactValue={props.profile.contacts[key as keyof contactsType]}/>
//             })}
//             </div>
//         </div>
//     )
// }
//
// type ContactType = {
//     contactTitle: string,
//     contactValue: string
// }
// export const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
//     return <div className={s.contact}>
//         <b>{contactTitle}</b>:{contactValue}
//     </div>
// }
//
// export default ProfileInfo;







































