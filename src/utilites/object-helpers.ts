// выпиливаем из users-reducers чтобы сократить код


export const updateObjectInArray = (items: Array<any>, itemID: number, objPropName: any, newObjProps: any) => {
    return items.map(m => {
        if (m[objPropName] === itemID) {
            //заменит старые свойства на новые(...newObjProps)
            return {...m, ...newObjProps}
        }
        return m;
    })
}
