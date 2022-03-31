import React from 'react';
import './Piece.css';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../actions';
import { getMoves } from '../logic';
import { displayDots, hideDots } from '../helper/square';

const WHITE = "white";
const BLACK = "black";
const getPieceColor = (name) => {
    //If uppercase then white if lowercase black
    if (name === name.toUpperCase()){
        return WHITE;
    } else {
        return BLACK;
    }
}
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
function Piece(props) {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    const pieceColor = getPieceColor(props.name)
    //TODO: Add the square the piece is on to that alt text
    const drag = (event) => {
        const moveList = getMoves({coords: props.coords, name: props.name, color: pieceColor})
        event.dataTransfer.setData("PieceData", JSON.stringify({coords: props.coords, name: props.name, color: pieceColor, moveList: moveList}));
        displayDots(moveList)
    }
    const allowDrop = (event) => {
        event.preventDefault();
    }
    const drop = (event) => {
        event.preventDefault();
        hideDots()
        if (event.target.tagName === "DIV"){
            return;
        }
        const pieceData = JSON.parse(event.dataTransfer.getData("PieceData"));
        if (!pieceData) {return;}
        // Check if the move is valid
        let isValid = false;
        for(let i = 0; i < pieceData.moveList.length; i++){
            if ((pieceData.moveList[i].x === props.coords.x) && (pieceData.moveList[i].y === props.coords.y)){
                isValid = true;
                break;
            }
        }
        if(isValid){
            let newBoard = board;
            newBoard[props.coords.x][props.coords.y] = pieceData.name;
            newBoard[pieceData.coords.x][pieceData.coords.y] = 'X';
            dispatch(update(newBoard))
        }
    }

    return (
    <img src = {props.img} alt={generateAltText({name: props.name})} className = "piece" draggable={true} onDragStart={drag} onDragOver={allowDrop} onDrop={drop}></img>
    )
}

export default Piece;