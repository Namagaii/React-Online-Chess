import React from 'react';
import './Piece.css';
function Piece(props) {
    //TODO: Add the square the piece is on to that alt text
    const generateAltText = (pieceInfo) => {
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
                return "Unidentifed piece on square."
        }
    }    
    return (
    <img src = {props.img} alt={generateAltText({name: props.name})} className = "piece"></img>
    )
}

export default Piece;