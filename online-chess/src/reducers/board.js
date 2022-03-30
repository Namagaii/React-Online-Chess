const initialBoard = [
    ['r','p','X','X','X','X','P','R'],
    ['n','p','X','X','X','X','P','N'],
    ['b','p','X','X','X','X','P','B'],
    ['k','p','X','X','X','X','P','K'],
    ['q','p','X','X','X','X','P','Q'],
    ['b','p','X','X','X','X','P','B'],
    ['n','p','X','X','X','X','P','N'],
    ['r','p','X','X','X','X','P','R']
]
/*
subscribers format: 
[
    {
        name: name to identify function,
        cb: the function callback
    }
]
*/
let subscribers = []
const boardReducer = (state = initialBoard, action) => {
    switch(action.type){
        case 'BOARD-UPDATE':
            state = action.payload
            subscribers.forEach(subscriber => {
                subscriber.cb(state);
            });
            return state;
        case 'BOARD-GET':
            return action.payload;
        case 'BOARD-SUBSCRIBE':
            subscribers.push({name: action.payload.name, cb: action.payload.cb})
            console.log("Subscribed function: "+action.payload.name)
            console.log("Subscibers:")
            console.log(subscribers)
            return state;
        case 'BOARD-UNSUBSCRIBE':
            for(let i = 0; i < subscribers.length; i++){
                if (subscribers[i].name === action.payload){
                    subscribers = subscribers.splice(i,1)
                    console.log("Subscriber: "+action.payload+" was successfully removed.");
                    console.log("Subscibers:")
                    console.log(subscribers)
                    return state;
                }
                console.log("No subscriber was found by the name: " + action.payload)
            }
            return state;
        default: 
            return state;
    }
}

export default boardReducer;