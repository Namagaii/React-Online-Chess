/*
  TODO:
    Implement ability to detect if the king is in check
    Good fucking luck dealing with all the bugs and shit lol
*/
let board;
let moves = []
const WHITE = "white";
const BLACK = "black";
export const getBoardState = (p_board) => {
    board = p_board;
}

export const getMoves = (pieceData) => {
    moves = []
    switch(pieceData.name.toLowerCase()){
        //King
        case 'k':
            getKingMoves(pieceData)
            break;
        //Queen
        case 'q':
            getQueenMoves(pieceData)
            break;
        //Bishop
        case 'b':
            getBishopMoves(pieceData)
            break;
        //Knight
        case 'n':
            getKnightMoves(pieceData)
            break;
        //Rook
        case 'r':
            getRookMoves(pieceData)
            break;
        //Pawn
        case 'p':
            getPawnMoves(pieceData)
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

const checkDirection = (pieceData, directionCoords, speed) => {
    //Comment regarding dingleberry: Lily made me, Amount of moves in the set direction
    for(let dingleberry = 1; dingleberry <= speed; dingleberry++){
        if (!checkSquare(pieceData.coords.x+(dingleberry * directionCoords.x), pieceData.coords.y+(dingleberry * directionCoords.y), pieceData.color)){
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
        if (getTeam(board[coords.x][coords.y]) !== color){
            //Will moving here put king in check?
            moves.push(coords)
        }
        return false
    }
    return true;
}

const getKingMoves = (pieceData) => {
    const SPEED = 1
    //Check locations in the kings range
    //Top
    checkDirection(pieceData, {x: 0, y: 1}, SPEED);
    //Top right
    checkDirection(pieceData, {x: 1, y: 1}, SPEED)
    //Top Left
    checkDirection(pieceData, {x: -1, y: 1}, SPEED)
    //Right
    checkDirection(pieceData, {x: 1, y: 0}, SPEED)
    //Left
    checkDirection(pieceData, {x: -1, y: 0}, SPEED)
    //Bottom
    checkDirection(pieceData, {x: 0, y: -1}, SPEED)
    //Bottom Right
    checkDirection(pieceData, {x: 1, y: -1}, SPEED)
    //Bottom Left
    checkDirection(pieceData, {x: -1, y: -1}, SPEED)
}
const getQueenMoves = (pieceData) => {
    const SPEED = 7;
    //Check the directions the queen can move in
    //Top
    checkDirection(pieceData, {x: 0, y: 1}, SPEED);
    //Top right
    checkDirection(pieceData, {x: 1, y: 1}, SPEED)
    //Top Left
    checkDirection(pieceData, {x: -1, y: 1}, SPEED)
    //Right
    checkDirection(pieceData, {x: 1, y: 0}, SPEED)
    //Left
    checkDirection(pieceData, {x: -1, y: 0}, SPEED)
    //Bottom
    checkDirection(pieceData, {x: 0, y: -1}, SPEED)
    //Bottom Right
    checkDirection(pieceData, {x: 1, y: -1}, SPEED)
    //Bottom Left
    checkDirection(pieceData, {x: -1, y: -1}, SPEED)
}
const getBishopMoves = (pieceData) => {
    const SPEED = 7;
    //Check the directions the Bishop can move in
    //Top right
    checkDirection(pieceData, {x: 1, y: 1}, SPEED)
    //Top Left
    checkDirection(pieceData, {x: -1, y: 1}, SPEED)
    //Bottom Right
    checkDirection(pieceData, {x: 1, y: -1}, SPEED)
    //Bottom Left
    checkDirection(pieceData, {x: -1, y: -1}, SPEED)
}
const getKnightMoves = (pieceData) => {
    //Check squares knight can jump to
    //Top Right Pair
    checkSquare(pieceData.coords.x + 1, pieceData.coords.y + 2, pieceData.color)
    checkSquare(pieceData.coords.x + 2, pieceData.coords.y + 1, pieceData.color)
    //Top Left Pair
    checkSquare(pieceData.coords.x - 1, pieceData.coords.y + 2, pieceData.color)
    checkSquare(pieceData.coords.x - 2, pieceData.coords.y + 1, pieceData.color)
    //Bottom Right Pair
    checkSquare(pieceData.coords.x + 1, pieceData.coords.y - 2, pieceData.color)
    checkSquare(pieceData.coords.x + 2, pieceData.coords.y - 1, pieceData.color)
    //Bottom Left Pair
    checkSquare(pieceData.coords.x - 1, pieceData.coords.y - 2, pieceData.color)
    checkSquare(pieceData.coords.x - 2, pieceData.coords.y - 1, pieceData.color)
}
const getRookMoves = (pieceData) => {
    const SPEED = 7;
    //Check the directions the Rook can move in
    //Top
    checkDirection(pieceData, {x: 0, y: 1}, SPEED);
    //Right
    checkDirection(pieceData, {x: 1, y: 0}, SPEED)
    //Left
    checkDirection(pieceData, {x: -1, y: 0}, SPEED)
    //Bottom
    checkDirection(pieceData, {x: 0, y: -1}, SPEED)
}
const getPawnMoves = (pieceData) => {
    //Check if pawn is on starting square
    if (pieceData.color === WHITE){
         //Check the rush
        if (pieceData.coords.y === 6){
            if (checkCoords(pieceData.coords.x, pieceData.coords.y - 2)) {
                if (board[pieceData.coords.x][pieceData.coords.y - 2] === 'X'){
                    //Does move put you in check?
                    moves.push({x:pieceData.coords.x, y:pieceData.coords.y - 2})
                }
            }
        }
        //Check the square directly infront
        if (checkCoords(pieceData.coords.x, pieceData.coords.y - 1)){
            if (board[pieceData.coords.x][pieceData.coords.y - 1] === 'X'){
                //Does move put you in check?
                moves.push({x: pieceData.coords.x, y: pieceData.coords.y - 1})
            }
        }
        //Check the take squares
        //Right
        if (checkCoords(pieceData.coords.x + 1, pieceData.coords.y - 1)){
            if (getTeam(board[pieceData.coords.x + 1][pieceData.coords.y - 1]) !== pieceData.color){
                //Does move put you in check?
                moves.push({x: pieceData.coords.x + 1, y: pieceData.coords.y - 1})
            }
        }
        //Left
        if (checkCoords(pieceData.coords.x - 1, pieceData.coords.y - 1)){
            if (getTeam(board[pieceData.coords.x - 1][pieceData.coords.y - 1]) !== pieceData.color){
                //Does move put you in check?
                moves.push({x: pieceData.coords.x - 1, y: pieceData.coords.y - 1})
            }
        }
        //Figure out en passant
    } else {
        //Check the rush
        if (pieceData.coords.y === 1){
            if (checkCoords(pieceData.coords.x, pieceData.coords.y + 2)) {
                if (board[pieceData.coords.x][pieceData.coords.y + 2] === 'X'){
                    //Does move put you in check?
                    moves.push({x:pieceData.coords.x, y:pieceData.coords.y + 2})
                }
            }
        }
        //Check the square directly infront
        if (checkCoords(pieceData.coords.x, pieceData.coords.y + 1)){
            if (board[pieceData.coords.x][pieceData.coords.y + 1] === 'X'){
                //Does move put you in check?
                moves.push({x: pieceData.coords.x, y: pieceData.coords.y + 1})
            }
        }
        //Check the take squares
        //Right
        if (checkCoords(pieceData.coords.x + 1, pieceData.coords.y + 1)){
            if (getTeam(board[pieceData.coords.x + 1][pieceData.coords.y + 1]) !== pieceData.color){
                //Does move put you in check?
                moves.push({x: pieceData.coords.x + 1, y: pieceData.coords.y + 1})
            }
        }
        //Left
        if (checkCoords(pieceData.coords.x - 1, pieceData.coords.y + 1)){
            if (getTeam(board[pieceData.coords.x - 1][pieceData.coords.y + 1]) !== pieceData.color){
                //Does move put you in check?
                moves.push({x: pieceData.coords.x - 1, y: pieceData.coords.y + 1})
            }
        }
        //Figure out en passant
    }

}

const getTeam = (name) => {
    if (name === name.toUpperCase()){
        return WHITE;
    } else {
        return BLACK;
    }
}