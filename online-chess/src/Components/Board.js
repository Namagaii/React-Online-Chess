import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { update, boardSubscribe, teamChangedSubscribe } from '../actions';
import { getBoardState } from '../logic';
import './Board.css'
import Square from './Square'

const calculateSquareColor = (squareNum) => {
    return squareNum % 2 === 0 ? "dark-square" : "light-square";
}
function Board() {
    const board = useSelector(state => state.board);
    const team = useSelector(state => state.team);
    const dispatch = useDispatch();

    const generateRow = (board, team, x, colorOffset) => {
        let boardRow = []
        //Render the board in a different order depending on color
        if (team === "White"){
            for (let y = 7; y >= 0; y--){
                boardRow.push(<Square squareData = {{ coords: {x:x, y:y}, color: calculateSquareColor((x * board[x].length + y) + colorOffset) }} key = {y} />)
            } 
            return boardRow   
        } else {
            for (let y = 0; y < 8; y++){
                boardRow.push(<Square squareData = {{ coords: {x:x, y:y}, color: calculateSquareColor((x * board[x].length + y) + colorOffset) }} key = {y} />)
            } 
            return boardRow
        }
    }

    const generateBoard = (board, team) => {
        let boardRender = []
        let colorOffset = 0
        // Render the board in a different order depending on color
        if (team === "White"){
            for(let x = 7; x >= 0; x--){
                boardRender.push(<div key = {x} className = {"board-row"}>
                    {generateRow(board, team, x, colorOffset)}
                </div>)
                if (colorOffset === 0){colorOffset = 1}else{colorOffset = 0}
            }
        }else {
            for(let x = 0; x < 8; x++){
                boardRender.push(<div key = {x} className = {"board-row"}>
                    {generateRow(board, team, x, colorOffset)}
                </div>)
                if (colorOffset === 0){colorOffset = 1}else{colorOffset = 0}
            } 
        }
        return boardRender;
    }

    const updateBoard = (board) => {
        setBoardState(generateBoard(board, team))
    }

    const re_renderBoard = (team) => {
        setBoardState(generateBoard(board, team))
    }
    const [boardState, setBoardState] = useState('InitialValue');
    useEffect(() => {
        dispatch(boardSubscribe('getBoardState', getBoardState));
        dispatch(boardSubscribe('generateBoard', updateBoard));
        dispatch(teamChangedSubscribe('updateBoard', re_renderBoard));
        dispatch(update(board))
    }, [])
    return (
        <div className='chess-board'>
        {boardState} 
        </div>
    )
}
export default Board