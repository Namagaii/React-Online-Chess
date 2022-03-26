import BLACKKING from './assets/Pieces/1x/b_king_1x.png';
import BLACKQUEEN from './assets/Pieces/1x/b_queen_1x.png';
import BLACKBISHOP from './assets/Pieces/1x/b_bishop_1x.png';
import BLACKKNIGHT from './assets/Pieces/1x/b_knight_1x.png';
import BLACKROOK from './assets/Pieces/1x/b_rook_1x.png';
import BLACKPAWN from './assets/Pieces/1x/b_pawn_1x.png';
import WHITEKING from './assets/Pieces/1x/w_king_1x.png';
import WHITEQUEEN from './assets/Pieces/1x/w_queen_1x.png';
import WHITEBISHOP from './assets/Pieces/1x/w_bishop_1x.png';
import WHITEKNIGHT from './assets/Pieces/1x/w_knight_1x.png';
import WHITEROOK from './assets/Pieces/1x/w_rook_1x.png';
import WHITEPAWN from './assets/Pieces/1x/w_pawn_1x.png';
import ERROR from './assets/Pieces/1x/error-texture.png';

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

export default getPieceSprite;