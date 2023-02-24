import { Piece } from "../helpers/pieces"
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
    [blackRook1, blackKnight1, blackBishop1, blackQueen, blackKing, blackBishop2, blackKnight2, blackRook2],
    [blackPawns[0], blackPawns[1], blackPawns[2], blackPawns[3], blackPawns[4], blackPawns[5], blackPawns[6], blackPawns[7]],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    [whitePawns[0], whitePawns[1], whitePawns[2], whitePawns[3], whitePawns[4], whitePawns[5], whitePawns[6], whitePawns[7]],
    [whiteRook1, whiteKnight1, whiteBishop1, whiteQueen, whiteKing, whiteBishop2, whiteKnight2, whiteRook2]
];

class Board {
    constructor(){
        this.board = initialBoard; 
        this.width = 8;
        this.height = 8;
    }

    ///Params: origin: {x, y}, destination: {x,y}
    ///This function erases piece from previous coords and places it at new coords
    movePiece(origin, destination){
        let piece = this.board[origin.x][origin.y];
        this.board[origin.x][origin.y] = 'X';
        this.board[destination.x][destination.y] = piece;
        piece.coords = {x: destination.x, y: destination.y};
        // TODO: check to start a prompt here if a pawn reaches the end of the board maybe 
    }
}

const board = new Board();
export default board;