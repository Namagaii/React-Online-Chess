import React from 'react'
import './Board.css'
import Square from './Square'
const calculateSquareColor = (squareNum) => {
    return squareNum % 2 === 0 ? "dark-square" : "light-square";
}
function Board(props) {
    const generateBoard = () => {
        let board = [];
        let c_X = 0;
        let c_Y = 0;
        if (props.team === "black"){
            c_X = 7;
            let colorOffset = 0;
            for (let x = 7; x >= 0; x--){
                let row = [];
                c_Y = 7;
                for (let y = 7; y >= 0; y--){
                    row.push(<Square coords = {{x: c_X, y: c_Y}} squareColor = {calculateSquareColor((x * 8 + y) + colorOffset)} key = {c_Y} />);
                    c_Y--;
                }
                board.push(
                    <div key = {c_X} className = {"board-row"} >
                        {row}
                    </div>
                )
                colorOffset = colorOffset === 0 ? 1 : 0;
                c_X--;
            }
        } else {
            let colorOffset = 1;
            for (let x = 0; x < 8; x++){
                let row = [];
                c_Y = 0;
                for (let y = 0; y < 8; y++){
                    row.push(<Square coords = {{x: c_X, y: c_Y}} squareColor = {calculateSquareColor((x * 8 + y) + colorOffset)} key = {c_Y} />);
                    c_Y++;
                }
                board.push(
                    <div key = {c_X} className = "board-row" >
                        {row}
                    </div>
                )
                colorOffset = colorOffset === 0 ? 1 : 0;
                c_X++;
            }
        }
        if (board.length === 0){
            return "";
        } else {
            return board;
        }
    }
    return (
        <div className='chess-board'>
            {generateBoard()}
        </div>
    );
}
export default Board