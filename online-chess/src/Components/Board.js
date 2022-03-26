import React from 'react'
import { useSelector } from 'react-redux';
import './Board.css'
import Piece from './Piece'
import getPieceSprite from '../pieces';

const calculateSquareColor = (squareNum) => {
    return squareNum % 2 === 0 ? "dark-square" : "light-square";
}

function Board() {
    const board = useSelector(state => state.board)
    let boardState = []
    let colorOffset = 0
    const generateRow = (x) => {
        let boardRow = []
        for (let y = 0; y < 8; y++){
            boardRow.push(<div className = {calculateSquareColor((x * board[x].length + y) + colorOffset)} key = {y}>{board[x][y] === "X" ? '' : <Piece img={getPieceSprite(board[x][y])} name = {board[x][y]}/>}</div>)
        } 
        return boardRow
    }
    for(let x = 0; x < 8; x++){
        boardState.push(<div key = {x}>
            {generateRow(x)}
        </div>)
        if (colorOffset === 0){colorOffset = 1}else{colorOffset = 0}
    }
    return (
        <div className='chess-board'>
        {boardState} 
        </div>
    )
}
export default Board