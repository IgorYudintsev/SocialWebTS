import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilites/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

type FormDataType = {
    newMessageBody: string
    onSubmit: () => void
}
const  maxLength10=maxLengthCreator(10)

let AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required,maxLength10]}
                       placeholder='Enter your message'
                       name="newMessageBody" />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export default reduxForm<FormDataType>({form: 'dialog-add-message-form'})(AddMessageForm);
