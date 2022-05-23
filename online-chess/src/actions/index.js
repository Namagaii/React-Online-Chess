export const update = (nr) => {
    return { 
        type: 'BOARD-UPDATE',
        payload: nr
    }
}

export const get = () => {
    return {
        type: "BOARD-GET"
    }
}