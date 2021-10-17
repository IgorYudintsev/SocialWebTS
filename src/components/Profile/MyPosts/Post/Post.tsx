import React from 'react';
import s from './Post.module.css';

type iPosts = {
    message: string,
    likesCount: number
}

const Post = (props: iPosts) => {
    return (
        <div className={s.item}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2ZXTZqx5wxj5vd6KCWvzNNQltYyC_QE25CUIme43vO2UaRpzH&usqp=CAU'/>
            {props.message}
            <span className={s.like}> like:</span>{props.likesCount}
        </div>
    )
}

export default Post;

