import React from 'react';
import { handleDragStart, handleDrop } from '../helpers/dragHelper';
import Board from '../logic/board';
import './Piece.css';

const generateAltText = (pieceInfo) => {
    //TODO: Add the square the piece is on to that alt text
    switch(pieceInfo.name){
        case "K":
            return "White King";
        case "Q":
            return "White Queen";
        case "B":
            return "White Bishop";
        case "N":
            return "White Knight";
        case "R":
            return "White Rook";
        case "P":
            return "White Pawn";
        case "k":
            return "Black King";
        case "q":
            return "Black Queen";
        case "b":
            return "Black Bishop";
        case "n":
            return "Black Knight";
        case "r":
            return "Black Rook";
        case "p":
            return "Black Pawn";
        default:
            return "Unidentifed object on square."
    }
}

function Piece(props) {
    let piece = props.piece;
    if (piece){
        piece.setCoords(props.coords.x, props.coords.y);
    } else {
        console.warn("Piece component initialized without accompaning piece object. Attempting to find piece object.")
        piece = Board.board[props.coords.x][props.coords.y];
        if (!piece){
            console.warn(`No piece found at coords: (${props.coords.x}, ${props.coords.y}) returning nothing.`)
            return "";
        }
    }
    const processDragStart = (event) => {
        handleDragStart(event, piece);
    }
    const processDrop = (event) => {
        handleDrop(event, props.coords)
    }
    return (
        <img src = {piece.sprite} alt={generateAltText({name: piece.pieceName})} className = "piece" onDragStart={processDragStart} onDrop={processDrop}></img>
    );
}

export default Piece;