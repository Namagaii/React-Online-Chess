export const update = (nr) => {
    return { 
        type: 'UPDATE',
        payload: nr
    }
}

export const get = () => {
    return { 
        type: 'GET',
    }
}