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

export const setTeam = (teamName) => {
    return {
        type: 'SET-TEAM',
        payload: teamName
    }
}

export const teamChangedSubscribe = (name, callback) => {
    return {
        type: 'TEAM-SUBSCRIBE',
        payload: {name: name, cb: callback}
    }
}

export const teamChangedUnsubscribe = (name) => {
    return {
        type: 'TEAM-UNSUBSCRIBE',
        payload: name
    }
}