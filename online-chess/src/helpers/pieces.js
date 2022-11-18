import BLACKKING from '.././assets/Pieces/1x/b_king_1x.png';
import BLACKQUEEN from '.././assets/Pieces/1x/b_queen_1x.png';
import BLACKBISHOP from '.././assets/Pieces/1x/b_bishop_1x.png';
import BLACKKNIGHT from '.././assets/Pieces/1x/b_knight_1x.png';
import BLACKROOK from '.././assets/Pieces/1x/b_rook_1x.png';
import BLACKPAWN from '.././assets/Pieces/1x/b_pawn_1x.png';
import WHITEKING from '.././assets/Pieces/1x/w_king_1x.png';
import WHITEQUEEN from '.././assets/Pieces/1x/w_queen_1x.png';
import WHITEBISHOP from '.././assets/Pieces/1x/w_bishop_1x.png';
import WHITEKNIGHT from '.././assets/Pieces/1x/w_knight_1x.png';
import WHITEROOK from '.././assets/Pieces/1x/w_rook_1x.png';
import WHITEPAWN from '.././assets/Pieces/1x/w_pawn_1x.png';
import ERROR from '.././assets/Pieces/1x/error-texture.png';
let id = 0;
export class Piece {
    static whitePieces = [];
    static blackPieces = [];
    constructor(name, color, moveList = []){
        this.id = id;
        this.coords = {};
        this.name = name;
        this.color = color;
        this.moveList = moveList;
        this.sprite = getPieceSprite(name);
        this.isPinned = false;
        if (color === "WHITE"){
            Piece.whitePieces.push(this);
        } else {
            Piece.blackPieces.push(this);
        }
        id++;
    }

    setCoords (x, y){
        this.coords = { 
            x: x,
            y: y
        }
    }
    
    setMoveList(moves){
        this.moveList = moves
    }

    setPinned(value){
        this.isPinned = value;
    }

    deletePiece(targetPiece){
        if (targetPiece.color === "WHITE"){
            for(let i = 0; i < this.whitePieces; i++){
                if (this.whitePieces[i].id === targetPiece.id){
                    this.whitePieces = this.whitePieces.splice(i, 1);
                    return;
                }
                console.log(targetPiece)
                console.warn(`Above piece object was not found in whitePieces array.`);
            }
        } else {
            for(let i = 0; i < this.blackPieces; i++){
                if (this.blackPieces[i].id === targetPiece.id){
                    this.blackPieces = this.blackPieces.splice(i, 1);
                    return;
                }
                console.log(targetPiece)
                console.warn(`Above piece object was not found in blackPieces array.`);
            }
        }
    }
}

const getPieceSprite = (pieceName) =>{
    switch(pieceName){
        case "K":
            //WhiteKing
            return WHITEKING;
        case "Q":
            //WhiteQueen
            return WHITEQUEEN;
        case "B":
            //WhiteBishop
            return WHITEBISHOP;
        case "N":
            //WhiteKnight
            return WHITEKNIGHT;
        case "R":
            //WhiteRook
            return WHITEROOK;
        case "P":
            //WhitePawn
            return WHITEPAWN;
        case "k":
            //BlackKing
            return BLACKKING;
        case "q":
            //BlackQueen
            return BLACKQUEEN;
        case "b":
            //BlackBishop
            return BLACKBISHOP;
        case "n":
            //BlackKnight
            return BLACKKNIGHT;
        case "r":
            //BlackRook
            return BLACKROOK;
        case "p":
            //BlackPawn
            return BLACKPAWN;
        default:
            return ERROR;
    }
}

