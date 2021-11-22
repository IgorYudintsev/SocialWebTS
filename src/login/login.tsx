import React from 'react';
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
}

//Здесь мы ничего не добавляли, используем старый функционал
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.marginLeft}>

            {CreateField('Email', 'email', Input, [required], {type: 'text'})}
            {CreateField('Password', 'password', Input, [required], {type: 'password'})}
            {CreateField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}

            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1 className={styles.marginLeft}>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login);
