import React, {ChangeEvent} from 'react';
import styles from './FormsControls.module.css'
import {Field} from "redux-form";
import {required} from "../../../utilites/validators/validators";

//дестриктурируем пропсы
const FormControl=({input, meta:{touched,error}, children}: any)=>{
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

//создаем Textarea для Dialogs
export const Textarea = (props: any) => {
   const {input, meta, ...restProps}=props  //restProps-остаточныйПропс (выдуманное название)
           return <FormControl {...props}><textarea {...input} {...meta} {...props}/></FormControl>
    // <FormControl><передаем child ></FormControl>
}

//создаем Input для login
export const Input = (props: any) => {
    const {input, meta, ...restProps}=props  //restProps-остаточныйПропс (выдуманное название)
    return <FormControl {...props}><input {...input} {...meta} {...props}/></FormControl>
    // <FormControl><передаем child ></FormControl>
}



export const CreateField=(placeholder:any,name:any,component:any,validate:any,props={},text='')=>{
    return(
        <div>
        <Field placeholder={placeholder} name={name} component={component}
               validate={validate} {...props}/> {text}
        </div>
    )
}
































