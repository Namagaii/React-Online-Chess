import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { update, boardSubscribe } from '../actions';
import { getBoardState } from '../logic';
import './Board.css'
import Square from './Square'

const calculateSquareColor = (squareNum) => {
    return squareNum % 2 === 0 ? "dark-square" : "light-square";
}
function Board() {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();

    const generateRow = (board, x, colorOffset) => {
        let boardRow = []
        for (let y = 0; y < 8; y++){
            boardRow.push(<Square squareData = {{ coords: {x:x, y:y}, color: calculateSquareColor((x * board[x].length + y) + colorOffset) }} key = {y} />)
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
    const [boardState, setBoardState] = useState('InitialValue');
    useEffect(() => {
        dispatch(boardSubscribe('getBoardState', getBoardState));
        dispatch(boardSubscribe('generateBoard', updateBoard));
        dispatch(update(board))
    }, [])
    return (
        <div className='chess-board'>
        {boardState} 
        </div>
    )
}
export default Board