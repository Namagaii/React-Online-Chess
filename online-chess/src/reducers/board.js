import { Piece } from "../helper/pieces"
const whiteRook1 = new Piece('R', 'WHITE')
const whiteKnight1 = new Piece('N', 'WHITE')
const whiteBishop1 = new Piece('B', 'WHITE')
const whiteKing = new Piece('K', 'WHITE')
const whiteQueen = new Piece('Q', 'WHITE')
const whiteBishop2 = new Piece('B', 'WHITE')
const whiteKnight2 = new Piece('N', 'WHITE')
const whiteRook2 = new Piece('R', 'WHITE')
const whitePawns = [
    new Piece('P', 'WHITE'),
    new Piece('P', 'WHITE'),
    new Piece('P', 'WHITE'),
    new Piece('P', 'WHITE'),
    new Piece('P', 'WHITE'),
    new Piece('P', 'WHITE'),
    new Piece('P', 'WHITE'),
    new Piece('P', 'WHITE'),
]
const blackRook1 = new Piece('r', 'BLACK')
const blackKnight1 = new Piece('n', 'BLACK')
const blackBishop1 = new Piece('b', 'BLACK')
const blackKing = new Piece('k', 'BLACK')
const blackQueen = new Piece('q', 'BLACK')
const blackBishop2 = new Piece('b', 'BLACK')
const blackKnight2 = new Piece('n', 'BLACK')
const blackRook2 = new Piece('r', 'BLACK')
const blackPawns = [
    new Piece('p', 'BLACK'),
    new Piece('p', 'BLACK'),
    new Piece('p', 'BLACK'),
    new Piece('p', 'BLACK'),
    new Piece('p', 'BLACK'),
    new Piece('p', 'BLACK'),
    new Piece('p', 'BLACK'),
    new Piece('p', 'BLACK')
]
const initialBoard = [
    [whiteRook2, whitePawns[7],'X','X','X','X', blackPawns[7], blackRook2],
    [whiteKnight2, whitePawns[6],'X','X','X','X', blackPawns[6], blackKnight2],
    [whiteBishop2, whitePawns[5],'X','X','X','X', blackPawns[5], blackBishop2],
    [whiteQueen, whitePawns[4],'X','X','X','X', blackPawns[4], blackQueen],
    [whiteKing, whitePawns[3],'X','X','X','X', blackPawns[3], blackKing],
    [whiteBishop1, whitePawns[2],'X','X','X','X', blackPawns[2], blackBishop1],
    [whiteKnight1, whitePawns[1],'X','X','X','X', blackPawns[1], blackKnight1],
    [whiteRook1, whitePawns[0],'X','X','X','X', blackPawns[0], blackRook1]
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
            }
            console.log("No subscriber was found by the name: " + action.payload)
            return state;
        default: 
            return state;
    }
}

export default boardReducer;