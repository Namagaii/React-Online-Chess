/*
  TODO:
    Implement ability to detect if the king is in check
    Good fucking luck dealing with all the bugs and shit lol
*/
let board;
let moves = []
const WHITE = "WHITE"
export const getBoardState = (p_board) => {
    board = p_board;
}

export const getMoves = (piece) => {
    moves = []
    switch(piece.pieceName.toLowerCase()){
        //King
        case 'k':
            getKingMoves(piece)
            break;
        //Queen
        case 'q':
            getQueenMoves(piece)
            break;
        //Bishop
        case 'b':
            getBishopMoves(piece)
            break;
        //Knight
        case 'n':
            getKnightMoves(piece)
            break;
        //Rook
        case 'r':
            getRookMoves(piece)
            break;
        //Pawn
        case 'p':
            getPawnMoves(piece)
            break;
        default:
            console.warn('Piece Invalid')
    }
    return moves;
}
//Function: checks if target coords are on the board
//Returns true if square is on the board and False if the square is off the board
const checkCoords = (x, y) => {
    return (!((x < 0) || (x >= board.length)) && !((y < 0) || (y >= board[x].length)))
}

const checkDirection = (piece, directionCoords, speed) => {
    //Comment regarding dingleberry: Lily made me, Amount of moves in the set direction
    for(let dingleberry = 1; dingleberry <= speed; dingleberry++){
        if (!checkSquare(piece.coords.x+(dingleberry * directionCoords.x), piece.coords.y+(dingleberry * directionCoords.y), piece.color)){
            break;
        }
    }
}

//Returns false to indicate end of direction or true to indicate continuation of direction
const checkSquare = (x, y, color) => {
    const coords = {
        x: x,
        y: y
    }
    if (!checkCoords(coords.x, coords.y)){return false;}
    if (board[coords.x][coords.y] === 'X') {
        //Will moving put king in check?
        moves.push(coords);
    } else {
        //If Enemy team
        if (board[coords.x][coords.y].color !== color){
            //Will moving here put king in check?
            moves.push(coords)
        }
        return false
    }
    return true;
}

const getKingMoves = (piece) => {
    const SPEED = 1
    //Check locations in the kings range
    //Top
    checkDirection(piece, {x: 0, y: 1}, SPEED);
    //Top right
    checkDirection(piece, {x: 1, y: 1}, SPEED)
    //Top Left
    checkDirection(piece, {x: -1, y: 1}, SPEED)
    //Right
    checkDirection(piece, {x: 1, y: 0}, SPEED)
    //Left
    checkDirection(piece, {x: -1, y: 0}, SPEED)
    //Bottom
    checkDirection(piece, {x: 0, y: -1}, SPEED)
    //Bottom Right
    checkDirection(piece, {x: 1, y: -1}, SPEED)
    //Bottom Left
    checkDirection(piece, {x: -1, y: -1}, SPEED)
}
const getQueenMoves = (piece) => {
    const SPEED = 7;
    //Check the directions the queen can move in
    //Top
    checkDirection(piece, {x: 0, y: 1}, SPEED);
    //Top right
    checkDirection(piece, {x: 1, y: 1}, SPEED)
    //Top Left
    checkDirection(piece, {x: -1, y: 1}, SPEED)
    //Right
    checkDirection(piece, {x: 1, y: 0}, SPEED)
    //Left
    checkDirection(piece, {x: -1, y: 0}, SPEED)
    //Bottom
    checkDirection(piece, {x: 0, y: -1}, SPEED)
    //Bottom Right
    checkDirection(piece, {x: 1, y: -1}, SPEED)
    //Bottom Left
    checkDirection(piece, {x: -1, y: -1}, SPEED)
}
const getBishopMoves = (piece) => {
    const SPEED = 7;
    //Check the directions the Bishop can move in
    //Top right
    checkDirection(piece, {x: 1, y: 1}, SPEED)
    //Top Left
    checkDirection(piece, {x: -1, y: 1}, SPEED)
    //Bottom Right
    checkDirection(piece, {x: 1, y: -1}, SPEED)
    //Bottom Left
    checkDirection(piece, {x: -1, y: -1}, SPEED)
}
const getKnightMoves = (piece) => {
    //Check squares knight can jump to
    //Top Right Pair
    checkSquare(piece.coords.x + 1, piece.coords.y + 2, piece.color)
    checkSquare(piece.coords.x + 2, piece.coords.y + 1, piece.color)
    //Top Left Pair
    checkSquare(piece.coords.x - 1, piece.coords.y + 2, piece.color)
    checkSquare(piece.coords.x - 2, piece.coords.y + 1, piece.color)
    //Bottom Right Pair
    checkSquare(piece.coords.x + 1, piece.coords.y - 2, piece.color)
    checkSquare(piece.coords.x + 2, piece.coords.y - 1, piece.color)
    //Bottom Left Pair
    checkSquare(piece.coords.x - 1, piece.coords.y - 2, piece.color)
    checkSquare(piece.coords.x - 2, piece.coords.y - 1, piece.color)
}
const getRookMoves = (piece) => {
    const SPEED = 7;
    //Check the directions the Rook can move in
    //Top
    checkDirection(piece, {x: 0, y: 1}, SPEED);
    //Right
    checkDirection(piece, {x: 1, y: 0}, SPEED)
    //Left
    checkDirection(piece, {x: -1, y: 0}, SPEED)
    //Bottom
    checkDirection(piece, {x: 0, y: -1}, SPEED)
}
const getPawnMoves = (piece) => {
    //Check if pawn is on starting square
    if (piece.color === WHITE){
         //Check the rush
        if (piece.coords.y === 6){
            if (checkCoords(piece.coords.x, piece.coords.y - 2)) {
                if (board[piece.coords.x][piece.coords.y - 2] === 'X'){
                    //Does move put you in check?
                    moves.push({x:piece.coords.x, y:piece.coords.y - 2})
                }
            }
        }
        //Check the square directly infront
        if (checkCoords(piece.coords.x, piece.coords.y - 1)){
            if (board[piece.coords.x][piece.coords.y - 1] === 'X'){
                //Does move put you in check?
                moves.push({x: piece.coords.x, y: piece.coords.y - 1})
            }
        }
        //Check the take squares
        //Right
        if (checkCoords(piece.coords.x + 1, piece.coords.y - 1)){
            if (board[piece.coords.x + 1][piece.coords.y - 1].color !== piece.color){
                //Does move put you in check?
                moves.push({x: piece.coords.x + 1, y: piece.coords.y - 1})
            }
        }
        //Left
        if (checkCoords(piece.coords.x - 1, piece.coords.y - 1)){
            if (board[piece.coords.x - 1][piece.coords.y - 1].color !== piece.color){
                //Does move put you in check?
                moves.push({x: piece.coords.x - 1, y: piece.coords.y - 1})
            }
        }
        //Figure out en passant
    } else {
        //Check the rush
        if (piece.coords.y === 1){
            if (checkCoords(piece.coords.x, piece.coords.y + 2)) {
                if (board[piece.coords.x][piece.coords.y + 2] === 'X'){
                    //Does move put you in check?
                    moves.push({x:piece.coords.x, y:piece.coords.y + 2})
                }
            }
        }
        //Check the square directly infront
        if (checkCoords(piece.coords.x, piece.coords.y + 1)){
            if (board[piece.coords.x][piece.coords.y + 1] === 'X'){
                //Does move put you in check?
                moves.push({x: piece.coords.x, y: piece.coords.y + 1})
            }
        }
        //Check the take squares
        //Right
        if (checkCoords(piece.coords.x + 1, piece.coords.y + 1)){
            if (board[piece.coords.x + 1][piece.coords.y + 1].color !== piece.color){
                //Does move put you in check?
                moves.push({x: piece.coords.x + 1, y: piece.coords.y + 1})
            }
        }
        //Left
        if (checkCoords(piece.coords.x - 1, piece.coords.y + 1)){
            if (board[piece.coords.x - 1][piece.coords.y + 1].color !== piece.color){
                //Does move put you in check?
                moves.push({x: piece.coords.x - 1, y: piece.coords.y + 1})
            }
        }
        //Figure out en passant
    }

}