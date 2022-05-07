const team = "White" // TODO: Get from server later or something idk

let subscribers = []
const teamReducer = (state = team, action) => {
    switch(action.type){
        case 'SET-TEAM': {
            state = action.payload
            subscribers.forEach(subscriber => {
                subscriber.cb(state);
            })
            return state;
        }
        case 'TEAM-SUBSCRIBE': {
            subscribers.push({ name: action.payload.name, cb: action.payload.cb })
            console.log("Subscribed function: "+action.payload.name)
            console.log("Subscibers:")
            console.log(subscribers)
            return state;
        }
        case 'TEAM-UNSUBSCRIBE': {
            for(let i = 0; i < subscribers.length; i++){
                if (subscribers[i].name === action.payload){
                    subscribers = subscribers.splice(i,1)
                    console.log("Subscriber: "+action.payload+" was successfully removed.");
                    console.log("Subscibers:")
                    console.log(subscribers)
                    return state;
                }
            }
            console.log("No subscriber was found by the name: " + action.payload)
            return state;
        }
        default: {
            return state;
        }
    }
}

export default teamReducer;