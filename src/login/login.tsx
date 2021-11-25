import React, {ComponentType} from 'react';
import {InjectedFormProps} from "redux-form";
import {Field, reduxForm} from "redux-form";
import styles from "../components/common/FormsControls/FormsControls.module.css";
import {CreateField, Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utilites/validators/validators";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {Redirect} from "react-router";
import {AppStateType} from "../redux/redux-store";

type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captchaUrl: string
}

type LoginFormType = {
    onSubmit: (formData: any) => void,
    captchaUrl: string,
}

const LoginForm: ComponentType<LoginFormType & InjectedFormProps<FormDataType, LoginFormType, string>> =
    ({captchaUrl,
         handleSubmit,
         error
    }) => {

    return (
        <form onSubmit={handleSubmit} className={styles.marginLeft}>

            {CreateField('Email', 'email', Input, [required], {type: 'text'})}
            {CreateField('Password', 'password', Input, [required], {type: 'password'})}
            {CreateField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}
            {/*{captchaUrl && <img src={captchaUrl}/>}*/}
            {/*{captchaUrl && CreateField('Symblos from image', 'captch', Input, [required], {type: 'text'})}*/}
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType, LoginFormType>({form: 'login'})(LoginForm)
export const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1 className={styles.marginLeft}>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

type MapStateToProps = {
    isAuth: boolean,
    captchaUrl: string | null | undefined,
}

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);


