import React from 'react';
import './Piece.css';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../actions';
import { getMoves } from '../logic';
import { displayDots, hideDots } from '../helper/square';
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
    props.piece.setCoords(props.coords.x, props.coords.y)
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    //TODO: Add the square the piece is on to that alt text
    const drag = (event) => {
        console.log("Piece: ")
        console.log(props.piece)
        props.piece.setMoveList(getMoves(props.piece));
        event.dataTransfer.setData("PieceData", JSON.stringify(props.piece));
        displayDots(props.piece.moveList);
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
            newBoard[props.coords.x][props.coords.y] = pieceData.pieceName;
            pieceData.setCoords(props.coords.x, props.coords.y);
            newBoard[pieceData.coords.x][pieceData.coords.y] = 'X';
            dispatch(update(newBoard))
        }
    }

    return (
    <img src = {props.piece.sprite} alt={generateAltText({name: props.piece.pieceName})} className = "piece" draggable={true} onDragStart={drag} onDragOver={allowDrop} onDrop={drop}></img>
    )
}

export default Piece;