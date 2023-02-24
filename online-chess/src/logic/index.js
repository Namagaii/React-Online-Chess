import Board from './board.js';
import { Piece } from '../helpers/pieces.js';
import Square from '../helpers/square.js';

// Threat map will contain a reference to all squares under attack
// This will be used to decide legal moves
let whiteThreatMap = []; //All squares under attack from white
let blackThreatMap = []; //All squares under attack from black

// Array storing all possible moves
// Each move is an object storing the piece doing the move and the location of the move
class Move {
    constructor(x, y, piece){
        this.coords = {x: x, y: y};
        this.piece = piece;
    }
}

let possibleMoves = [];
const WHITE = 0;
const BLACK = 1;
let turn = WHITE; //0 represents white turn and 1 represents black turn
const INPROG = 0; //represents game being in progress
const BLACKWIN = 1; //represents game being in progress
const WHITEWIN = 2; //represents game being in progress
let gameState = INPROG; //STATES: INPROG, BLACKWIN, WHITEWIN

export function changeTurn(){
    turn = !turn;
}

export function getMoves(piece){
    if (gameState !== INPROG){
        return [];
    }
    //check if piece should be able to move this turn if not return no moves
    if (piece.color === "WHITE" && turn !== WHITE){
        return [];
    }
    if (piece.color === "BLACK" && turn !== BLACK){
        return [];
    }
    possibleMoves = [];
    whiteThreatMap = [];
    blackThreatMap = [];    
    getPossibleMoves(piece.color);
    getThreatMaps();
    let moveList = getLegalMoves(piece);
    return moveList;
}

export function testMoves(){
    possibleMoves = [];
    whiteThreatMap = [];
    blackThreatMap = [];
    let color = "BLACK";
    getPossibleMoves(color);
    getThreatMaps();
    let moveList = getLegalMoves(Piece.blackPieces[4]);
    console.log(Board.board);
}

export function showWhiteThreatMap(){
    Square.disableAllThreats();
    whiteThreatMap.forEach(move => {
        Square.activateThreat(move.coords.x, move.coords.y);
    });
}

export function showBlackThreatMap(){
    Square.disableAllThreats();
    blackThreatMap.forEach(move => {
        Square.activateThreat(move.coords.x, move.coords.y);
    });
}

export function hideThreatMap(){
    Square.disableAllThreats();
}

function isCoordsInBounds(x, y){
    let result = true;
    result = x >= 0 && x < Board.width;
    result = result && y >= 0 && y < Board.height;
    return result;
}

function getPossibleMoves(teamColor){
    if (teamColor === "WHITE"){
        for(let i = 0; i < Piece.whitePieces.length; i++){
            checkPieceMoves(Piece.whitePieces[i]);
        }
    }else{
        for(let i = 0; i < Piece.blackPieces.length; i++){
            checkPieceMoves(Piece.blackPieces[i]);
        }
    }
}

function checkPieceMoves(piece, threatMap = false, tempBoard){
    switch(piece.name.toLowerCase()){
        case "r":
            //Rook
            checkRookMoves(piece, threatMap, tempBoard);
        break;
        case "n":
            //Knight
            checkKnightMoves(piece, threatMap, tempBoard);
        break;
        case "b":
            //Bishop
            checkBishopMoves(piece, threatMap, tempBoard);
        break;
        case "k":
            //King
            checkKingMoves(piece, threatMap, tempBoard);
        break;
        case "q":
            //Queen
            checkQueenMoves(piece, threatMap, tempBoard);
        break;
        case "p":
            //Pawn
            checkPawnMoves(piece, threatMap, tempBoard);
        break;
        default:
            console.warn(`Piece Name invalid for piece at coords: (${piece.coords.x}, ${piece.coords.y})`);
        break;
    }
}
function getThreatMaps(tempBoard = false){
    function getWhiteThreatMap(){
        whiteThreatMap = [];
        for(let i = 0; i < Piece.whitePieces.length; i++){
            checkPieceMoves(Piece.whitePieces[i], true, tempBoard);
        }
    }
    
    function getBlackThreatMap(){
        blackThreatMap = [];
        for(let i = 0; i < Piece.blackPieces.length; i++){
            checkPieceMoves(Piece.blackPieces[i], true, tempBoard);
        }
    }
    getWhiteThreatMap();
    getBlackThreatMap();
}

function getLegalMoves(piece){
    const checkForCheck = (teamColor, tempBoard) => {
        let result = false;
        if (teamColor === "WHITE"){
            blackThreatMap.forEach(move => {
                //if white king is under check
                if(tempBoard[move.coords.x][move.coords.y].name === "K"){
                    result = true;
                    return;
                }
            });
        } else {
            whiteThreatMap.forEach(move => {
                //if black king is under check
                if(tempBoard[move.coords.x][move.coords.y].name === "k"){
                    result = true;
                    return;
                }
            });
        }
        return result;
    }
    let tempMoveList  = [];
    let moveList = [];
    //Get all moves for selected piece
    possibleMoves.forEach(move => {
       if(move.piece.id === piece.id){
           tempMoveList.push(move); 
       }
    });
    //Make move and check if it puts your king in check
    tempMoveList.forEach(move => {    
        let originalCoords = piece.coords; //original coords of piece being moved
        let tempBoard = Board.board.map((arr) => {
            return arr.slice();
        });
        //temp move
        tempBoard[piece.coords.x][piece.coords.y] = 'X';
        tempBoard[move.coords.x][move.coords.y] = piece; 
        getThreatMaps(tempBoard);
        if(!checkForCheck(piece.color, tempBoard)){
            moveList.push({x: move.coords.x, y: move.coords.y});
        }
        //move piece back
        tempBoard[move.coords.x][move.coords.y] = 'X';
        tempBoard[originalCoords.x][originalCoords.y] = piece;
    });
    return moveList;
}

/*
    For every move check if the move is within the bounds of the board and also check if the move lands on an opponent or nothing
    Then add it to the possibleMoves array
*/
//TODO: For tempboard replacements make a local board variable whose value can be set to Board.board or tempBoard board param and use that variable as the board reference.
function checkKnightMoves(piece, threatMap, tempBoard){
    function knightMove(x, y){
        if (isCoordsInBounds(x, y)){
            if(tempBoard){
                if(threatMap){
                    if (piece.color === "WHITE"){
                        whiteThreatMap.push(new Move(x, y, piece));
                    } else {
                        blackThreatMap.push(new Move(x, y, piece));
                    }
                } else {
                    if (tempBoard[x][y].name === "X" || tempBoard[x][y].color !== piece.color){
                        possibleMoves.push(new Move(x, y, piece));
                    }
                }
            } else {
                if(threatMap){
                    if (piece.color === "WHITE"){
                        whiteThreatMap.push(new Move(x, y, piece));
                    } else {
                        blackThreatMap.push(new Move(x, y, piece));
                    }
                } else {
                    if (Board.board[x][y].name === "X" || Board.board[x][y].color !== piece.color){
                        possibleMoves.push(new Move(x, y, piece));
                    }
                }
            }
        }
    }
    //Up Left
    knightMove(piece.coords.x - 2, piece.coords.y - 1);
    //Up Right
    knightMove(piece.coords.x - 2, piece.coords.y + 1);
    //Right Up
    knightMove(piece.coords.x - 1, piece.coords.y + 2);
    //Right Down
    knightMove(piece.coords.x + 1, piece.coords.y + 2);
    //Down Left
    knightMove(piece.coords.x + 2, piece.coords.y - 1);
    //Down Right
    knightMove(piece.coords.x + 2, piece.coords.y + 1);
    //Left Up
    knightMove(piece.coords.x - 1, piece.coords.y - 2);
    //Left Down
    knightMove(piece.coords.x + 1, piece.coords.y - 2);
}
function checkSlidingMoves(piece, direction, range, threatMap, tempBoard){
    for(let i = 1; i <= range; i++){
        let x = piece.coords.x + (direction.x * i);
        let y = piece.coords.y + (direction.y * i);
        if(isCoordsInBounds(x, y)){
            if (tempBoard){
                if (tempBoard[x][y] === "X"){ //if no piece is in the way
                    if (threatMap){
                        if(piece.color === "WHITE"){
                            whiteThreatMap.push(new Move(x, y, piece));
                        } else {
                            blackThreatMap.push(new Move(x, y, piece));
                        }
                    } else {
                        possibleMoves.push(new Move(x, y, piece));
                    }
                } else if (tempBoard[x][y] !== "X"){ //if a piece is in the way
                    //stop checking if piece is in the way
                    if (threatMap){ 
                        if(piece.color === "WHITE"){
                            whiteThreatMap.push(new Move(x, y, piece));
                        } else { 
                            blackThreatMap.push(new Move(x, y, piece));
                        }
                    } else {
                        if (tempBoard[x][y].color != piece.color){ //if team is different
                            possibleMoves.push(new Move(x, y, piece));
                        }
                    }
                    break;
                }
            } else {
                if (Board.board[x][y] === "X"){ //if no piece is in the way
                    if (threatMap){
                        if(piece.color === "WHITE"){
                            whiteThreatMap.push(new Move(x, y, piece));
                        } else {
                            blackThreatMap.push(new Move(x, y, piece));
                        }
                    } else {
                        possibleMoves.push(new Move(x, y, piece));
                    }
                } else if (Board.board[x][y] !== "X"){ //if a piece is in the way
                    //stop checking if piece is in the way
                    if (threatMap){ 
                        if(piece.color === "WHITE"){
                            whiteThreatMap.push(new Move(x, y, piece));
                        } else { 
                            blackThreatMap.push(new Move(x, y, piece));
                        }
                    } else {
                        if (Board.board[x][y].color != piece.color){ //if team is different
                            possibleMoves.push(new Move(x, y, piece));
                        }
                    }
                    break;
                }
            }
        } else{
            //stop check if out of bounds
            break;
        }
    }
}
function checkKingMoves(piece, threatMap, tempBoard){
    let range = 1;
    //up
    checkSlidingMoves(piece, {x: -1, y: 0}, range, threatMap, tempBoard);
    //up right
    checkSlidingMoves(piece, {x: -1, y: 1}, range, threatMap, tempBoard);
    //right
    checkSlidingMoves(piece, {x: 0, y: 1}, range, threatMap, tempBoard);
    //down right
    checkSlidingMoves(piece, {x: 1, y: 1}, range, threatMap, tempBoard);
    //down
    checkSlidingMoves(piece, {x: 1, y: 0}, range, threatMap, tempBoard);
    //down left
    checkSlidingMoves(piece, {x: 1, y: -1}, range, threatMap, tempBoard);
    //left
    checkSlidingMoves(piece, {x: 0, y: -1}, range, threatMap, tempBoard);
    //up left 
    checkSlidingMoves(piece, {x: -1, y: -1}, range, threatMap, tempBoard);
} 
function checkQueenMoves(piece, threatMap, tempBoard){
    const range = 7;
    //up
    checkSlidingMoves(piece, {x: 0, y: -1}, range, threatMap, tempBoard);
    //up right
    checkSlidingMoves(piece, {x: 1, y: -1}, range, threatMap, tempBoard);
    //right
    checkSlidingMoves(piece, {x: 1, y: 0}, range, threatMap, tempBoard);
    //down right
    checkSlidingMoves(piece, {x: 1, y: 1}, range, threatMap, tempBoard);
    //down
    checkSlidingMoves(piece, {x: 0, y: 1}, range, threatMap, tempBoard);
    //down left
    checkSlidingMoves(piece, {x: -1, y: 1}, range, threatMap, tempBoard);
    //left
    checkSlidingMoves(piece, {x: -1, y: 0}, range, threatMap, tempBoard);
    //up left 
    checkSlidingMoves(piece, {x: -1, y: -1}, range, threatMap, tempBoard);
}
function checkBishopMoves(piece, threatMap, tempBoard){
    const range = 7;
    //up left
    checkSlidingMoves(piece, {x: -1, y: -1}, range, threatMap, tempBoard);
    //up right
    checkSlidingMoves(piece, {x: 1, y: -1}, range, threatMap, tempBoard);
    //down left
    checkSlidingMoves(piece, {x: -1, y: 1}, range, threatMap, tempBoard);
    //down right
    checkSlidingMoves(piece, {x: 1, y: 1}, range, threatMap, tempBoard);
}
function checkRookMoves(piece, threatMap, tempBoard){
    const range = 7;
    //up
    checkSlidingMoves(piece, {x: 0, y: -1}, range, threatMap, tempBoard);
    //right
    checkSlidingMoves(piece, {x: 1, y: 0}, range, threatMap, tempBoard);
    //left
    checkSlidingMoves(piece, {x: -1, y: 0}, range, threatMap, tempBoard);
    //down
    checkSlidingMoves(piece, {x: 0, y: 1}, range, threatMap, tempBoard);
}
function checkPawnMoves(piece, threatMap, tempBoard){
    //Params:
    //startRow: the row in array that corresponds to the pawns starting rank
    //direction: what direction is forward i.e. 1 or -1
    function pawnMove(startRow, direction){
        let x;
        let y;
        //forward
        x = piece.coords.x + direction;
        y = piece.coords.y;
        if (tempBoard){
            if(isCoordsInBounds(x, y)){
                if (tempBoard[x][y] === "X"){
                    //check forward move
                    if (!threatMap){
                        possibleMoves.push(new Move(x, y, piece));
                        //check dash
                        x = piece.coords.x + (2 * direction);
                        if (piece.coords.x === startRow){
                            if (isCoordsInBounds(x, y)){
                                if (tempBoard[x][y] === "X"){
                                    possibleMoves.push(new Move(x, y, piece));
                                }
                            }
                        }
                    }
                    //check captures
                    x = piece.coords.x + direction;
                    y = piece.coords.y - 1;
                    if (isCoordsInBounds(x, y)){
                        if(threatMap){
                            if (piece.color === "WHITE"){
                                whiteThreatMap.push(new Move(x, y, piece));
                            } else {
                                blackThreatMap.push(new Move(x, y, piece));
                            }
                        } else {
                            if (tempBoard[x][y] != "X" && tempBoard[x][y].color != piece.color){
                                possibleMoves.push(new Move(x, y, piece));
                            }
                        }
                    }
                    x = piece.coords.x + direction;
                    y = piece.coords.y + 1;
                    if (isCoordsInBounds(x, y)){
                        if(threatMap){
                            if (piece.color === "WHITE"){
                                whiteThreatMap.push(new Move(x, y, piece));
                            } else {
                                blackThreatMap.push(new Move(x, y, piece));
                            }
                        } else {
                            if (tempBoard[x][y] != "X" && tempBoard[x][y].color != piece.color){
                                possibleMoves.push(new Move(x, y, piece));
                            }
                        }
                    }
                }
            }
        } else {
            if(isCoordsInBounds(x, y)){
                if (Board.board[x][y] === "X"){
                    //check forward move
                    if (!threatMap){
                        possibleMoves.push(new Move(x, y, piece));
                        //check dash
                        x = piece.coords.x + (2 * direction);
                        if (piece.coords.x === startRow){
                            if (isCoordsInBounds(x, y)){
                                if (Board.board[x][y] === "X"){
                                    possibleMoves.push(new Move(x, y, piece));
                                }
                            }
                        }
                    }
                    //check captures
                    x = piece.coords.x + direction;
                    y = piece.coords.y - 1;
                    if (isCoordsInBounds(x, y)){
                        if(threatMap){
                            if (piece.color === "WHITE"){
                                whiteThreatMap.push(new Move(x, y, piece));
                            } else {
                                blackThreatMap.push(new Move(x, y, piece));
                            }
                        } else {
                            if (Board.board[x][y] != "X" && Board.board[x][y].color != piece.color){
                                possibleMoves.push(new Move(x, y, piece));
                            }
                        }
                    }
                    x = piece.coords.x + direction;
                    y = piece.coords.y + 1;
                    if (isCoordsInBounds(x, y)){
                        if(threatMap){
                            if (piece.color === "WHITE"){
                                whiteThreatMap.push(new Move(x, y, piece));
                            } else {
                                blackThreatMap.push(new Move(x, y, piece));
                            }
                        } else {
                            if (Board.board[x][y] != "X" && Board.board[x][y].color != piece.color){
                                possibleMoves.push(new Move(x, y, piece));
                            }
                        }
                    }
                }
            }
        }
        
    }
    //White Pawns
    if (piece.color === "WHITE"){            
        pawnMove(6, -1);
    } else if (piece.color === "BLACK"){
        pawnMove(1, 1);
    }
}
