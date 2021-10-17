import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {iposts} from "../../../redux/store";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilites/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

type generalType = {
    addPost: (newPostText:string) => void
    posts: Array<iposts>
 }

const MyPosts = React.memo((props: generalType) => {
    let addPost = (values: any) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <AddNewPostFormRedux onSubmit={addPost}/>
            <div className={s.posts}>
                {props.posts.map(m => <Post message={m.message} likesCount={m.likesCount}/>)}
            </div>
        </div>
    )
});


let maxLength10=maxLengthCreator(10)

let AddNewPostForm=React.memo((props: any)=> {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='newPostText' component={Textarea}
               placeholder={'Post message'}    validate={[required,maxLength10]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
})
let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;





















