import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {profileType} from "../../../redux/profile-reducer";
import {CreateField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import styles from "../../common/FormsControls/FormsControls.module.css";

type propsType = {
    initialValues: profileType,
}
export type ProfileDataFormType = {
    aboutMe: string,
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    initialValues: any
}

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType, propsType> & propsType> =
    ({handleSubmit, initialValues,error}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div style={{marginLeft: '10px', color: 'white'}}>
                    <div>
                        <button>save</button>
                    </div>
                    {error && <div className={styles.formSummaryError}>{error}</div>}
                    <div>
                        <b>Full name</b>:{CreateField('Full name', 'fullName', Input, [], {type: 'text'})}
                    </div>
                    <div>
                        <b>Lookig for a
                            job</b>:{CreateField('LookingForAJobDescription', 'lookingForAJob', Input, [], {type: 'checkbox'})}
                    </div>
                    {initialValues.lookingForAJob &&
                    <div>
                        <b>My professional
                            skills</b>:{CreateField('lookingForAJobDescription', 'lookingForAJobDescription', Textarea, [], {type: 'text'})}
                    </div>}
                    <div>
                        <b>About me</b>:{CreateField('AboutMe', 'aboutMe', Textarea, [], {type: 'text'})}
                    </div>
                    <div>
                        <b>Contacts</b>:{Object.keys(initialValues.contacts).map(key => {
                        return <div>
                            <b>{key}:{CreateField(key, 'contacts.' + key, Input, [], {type: 'text'})}</b>
                        </div>
                    })}
                    </div>
                </div>
            </form>
        )
    }

//создаем форму при помощи редакса и помним что ReduxForm отмер, и //@ts-ignore в данном случае тоже решение
export const ProfileDataFormReduxForm = reduxForm<ProfileDataFormType, propsType>({form: 'edit-profile'})(ProfileDataForm)

