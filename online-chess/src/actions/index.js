export const update = (nr) => {
    return { 
        type: 'BOARD-UPDATE',
        payload: nr
    }
}

export const get = () => {
    return { 
        type: 'BOARD-GET',
    }
}

export const boardSubscribe = (name, callback) => {
    return {
        type: 'BOARD-SUBSCRIBE',
        payload: {
            name: name,
            cb: callback
        }
    }
}

export const boardUnsubscribe = (name) =>{
    return {
        type: 'BOARD-UNSCUBSCIRBE',
        payload: name
    }
}