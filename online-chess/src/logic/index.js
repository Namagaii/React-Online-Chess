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
const doesSquareExist = (x, y) => {
    return !(((x < 0) && (x >= board.length)) && ((y < 0) && (y >= board[x].length)))
}

const checkDirection = (pieceData, directionCoords, speed) => {
    //Comment regarding dingleberry: Lily made me, Amount of moves in the set direction 
    for(let dingleberry = 0; dingleberry < speed; dingleberry++){
        checkSquare(pieceData.coords.x+(dingleberry * directionCoords.x), pieceData.coords.y+(dingleberry * directionCoords.y), pieceData.color);
    }
}

const checkSquare = (x, y, color) => {
    const coords = {
        x: x,
        y: y
    }
    if (!doesSquareExist(coords.x, coords.y)){return;}
    if (board[coords.x][coords.y] === 'X') {
        //Will moving put king in check?
        moves.push(coords);
    } else { 
        //If your team
        if (getTeam(board[coords.x][coords.y]) === color){
            return;
        } else {
            //Will moving here put king in check?
            moves.push(coords)
            return;
        }
    }
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
    return moves;
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
    checkSquare(pieceData.x + 1, pieceData.y + 2)
    checkSquare(pieceData.x + 2, pieceData.y + 1)
    //Top Left Pair
    checkSquare(pieceData.x - 1, pieceData.y + 2)
    checkSquare(pieceData.x - 2, pieceData.y + 1)
    //Bottom Right Pair
    checkSquare(pieceData.x + 1, pieceData.y - 2)
    checkSquare(pieceData.x + 2, pieceData.y - 1)
    //Bottom Left Pair
    checkSquare(pieceData.x - 1, pieceData.y - 2)
    checkSquare(pieceData.x - 2, pieceData.y - 1)
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
//TODO: Implement pawn movement
const getPawnMoves = (pieceData) => {

}

const getTeam = (name) => {
    if (name === name.toUpperCase()){
        return WHITE;
    } else {
        return BLACK;
    }
}