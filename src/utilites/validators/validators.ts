
export const required=(value:string)=>{
    if(value)return undefined;
    return 'Field is required'
}

//чтобы можно было выбирать любую maxLength-то заворачиваем в maxLengthCreator
export const  maxLengthCreator= (maxLength:number)=>(value:string)=>{
    if(value && value.length>maxLength )return `Max length is ${maxLength} symbols`;
    return  undefined
}





















