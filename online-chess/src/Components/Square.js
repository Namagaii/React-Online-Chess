import React, { useEffect, useState } from 'react'
import Piece from './Piece'
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../actions';
import './Square.css'
import { displayDotSubscribe, hideDots } from '../helper/square';

const allowDrop = (event) => {
    event.preventDefault();
}

function Square(props) {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    const piece = board[props.squareData.coords.x][props.squareData.coords.y];
    const [displayDot, setDisplayDot] = useState(false)
    const drop = (event) => {
        event.preventDefault();
        hideDots();
        if (event.target.tagName === "IMG"){
            return;
        }
        let pieceData = JSON.parse(event.dataTransfer.getData("PieceData"));
        console.log(pieceData)
        // Check if the move is valid
        let isValid = false;
        for(let i = 0; i < pieceData.moveList.length; i++){
            if ((pieceData.moveList[i].x === props.squareData.coords.x) && (pieceData.moveList[i].y === props.squareData.coords.y)){
                isValid = true;
                break;
            }
        }
        if(isValid){
            //TODO: Create a better way to update the board 
            let newBoard = board;
            newBoard[props.squareData.coords.x][props.squareData.coords.y] = pieceData.name;
            pieceData.setCoords(props.squareData.coords.x, props.squareData.coords.y)
            newBoard[pieceData.coords.x][pieceData.coords.y] = 'X';
            dispatch(update(newBoard))
        }
    }
    useEffect(() => {
        displayDotSubscribe(props.squareData.coords.x, props.squareData.coords.y, setDisplayDot);
    }, [])
    return (
        <div className = {"square "+props.squareData.color} onDragOver={allowDrop} onDrop={drop}>{piece === "X" ? '' : <Piece piece={piece} coords={props.squareData.coords}/>}{piece === 'X' ? <span className={displayDot ? 'dot-active': 'dot-inactive'}></span> : ''}</div>
    )
}

export default Square