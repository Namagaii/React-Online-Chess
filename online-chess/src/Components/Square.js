import React, { useEffect, useState } from 'react'
import Piece from './Piece'
import { useSelector, useDispatch } from 'react-redux';
import getPieceSprite from '../helper/pieces';
import { update } from '../actions';
import './Square.css'
import { displayDotSubscribe, hideDots } from '../helper/square';

const allowDrop = (event) => {
    event.preventDefault();
}

function Square(props) {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    const pieceName = board[props.squareData.coords.x][props.squareData.coords.y];
    const [displayDot, setDisplayDot] = useState(false)
    const drop = (event) => {
        event.preventDefault();
        hideDots();
        if (event.target.tagName === "IMG"){
            return;
        }
        let pieceData = JSON.parse(event.dataTransfer.getData("PieceData"));
        // Check if the move is valid
        let isValid = false;
        for(let i = 0; i < pieceData.moveList.length; i++){
            if ((pieceData.moveList[i].x === props.squareData.coords.x) && (pieceData.moveList[i].y === props.squareData.coords.y)){
                isValid = true;
                break;
            }
        }
        if(isValid){
            let newBoard = board;
            newBoard[props.squareData.coords.x][props.squareData.coords.y] = pieceData.name;
            newBoard[pieceData.coords.x][pieceData.coords.y] = 'X';
            dispatch(update(newBoard))
        }
    }
    useEffect(() => {
        displayDotSubscribe(props.squareData.coords.x, props.squareData.coords.y, setDisplayDot);
    }, [])
    return (
        <div className = {props.squareData.color} onDragOver={allowDrop} onDrop={drop}>{pieceName === "X" ? '' : <Piece img={getPieceSprite(pieceName)} name = {pieceName} coords={props.squareData.coords}/>}{pieceName === 'X' ? <span className={displayDot ? 'dot-active': 'dot-inactive'}></span> : ''}</div>
    )
}

export default Square