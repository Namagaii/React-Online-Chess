import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { update, boardSubscribe } from '../actions';
import { getBoardState } from '../logic';
import './Board.css'
import Piece from './Piece'
import getPieceSprite from '../pieces';

const calculateSquareColor = (squareNum) => {
    return squareNum % 2 === 0 ? "dark-square" : "light-square";
}
const allowDrop = (event) => {
    event.preventDefault();
}
function Board() {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    const drop = (event) => {
        event.preventDefault();
        if (event.target.tagName === "IMG"){
            return;
        }
        let pieceData = JSON.parse(event.dataTransfer.getData("PieceData"));
        let squareCoords = JSON.parse(event.target.getAttribute("coords"));
        let newBoard = board;
        //Placing the piece at the destination
        newBoard[squareCoords.x][squareCoords.y] = pieceData.name;
        //Clearing square where piece used to be
        newBoard[pieceData.coords.x][pieceData.coords.y] = 'X';
        dispatch(update(newBoard))
    }

    const generateRow = (board, x, colorOffset) => {
        let boardRow = []
        for (let y = 0; y < 8; y++){
            let coords = {x:x, y:y};
            boardRow.push(<div className = {calculateSquareColor((x * board[x].length + y) + colorOffset)} key = {y} onDragOver={allowDrop} onDrop={drop} coords={JSON.stringify(coords)}>{board[x][y] === "X" ? '' : <Piece img={getPieceSprite(board[x][y])} name = {board[x][y]} coords={coords}/>}</div>)
        } 
        return boardRow
    }

    const generateBoard = (board) => {
        let boardRender = []
        let colorOffset = 0
        for(let x = 0; x < 8; x++){
            boardRender.push(<div key = {x}>
                {generateRow(board, x, colorOffset)}
            </div>)
            if (colorOffset === 0){colorOffset = 1}else{colorOffset = 0}
        }
        return boardRender;
    }

    const updateBoard = (board) => {
        setBoardState(generateBoard(board))
    }
    useEffect(() => {
        dispatch(boardSubscribe('getBoardState', getBoardState));
        dispatch(boardSubscribe('generateBoard', updateBoard));
    }, [])
    const [boardState, setBoardState] = useState(generateBoard(board));
    return (
        <div className='chess-board'>
        {boardState} 
        </div>
    )
}
export default Board