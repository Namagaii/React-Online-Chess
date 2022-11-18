import React, { useState } from 'react'
import Board from '../logic/board.js';
import Piece from './Piece';
import { handleDrop, handleDragOver } from '../helpers/dragHelper.js';
import c_Square from '../helpers/square.js'
import './Square.css'
function Square(props) {
    const piece = Board.board[props.coords.x][props.coords.y];
    const [showIndicator, setShowIndicator] = useState(false);
    const processSetIndicator = (value) => {
        setShowIndicator(value);
    }
    const processSetSquare = (value) => {
        setSquare(value)
    }
    const generateContent = (piece) => {
        let output;
        if (piece && piece !== 'X'){
            output = {
                piece: true,
                indicator: {
                    isCircle: true,
                },
                setContent: processSetSquare,
                setShowIndicator: processSetIndicator,
                contentGenerator: generateContent
            };
        } else {
            output = {
                piece: false,
                indicator: {
                    isCircle: false,
                },
                setContent: processSetSquare,
                setShowIndicator: processSetIndicator,
                contentGenerator: generateContent
            };
        }
        return new c_Square(output, props.coords.x, props.coords.y);
    }
    const [square, setSquare] = useState(generateContent(piece));
    const processOnDrop = (event) => {
        handleDrop(event, props.coords);
    }
    return (
        <div className = {"square " + props.squareColor} onDrop={processOnDrop} onDragOver={handleDragOver} >
            {square.contentData.piece ? <Piece piece = {piece} coords = {props.coords} /> : ""}
            {square.contentData.indicator.isCircle ? <span className= {`${(showIndicator ? 'active' : 'inactive')} indicator-circle`}></span> : <span className={`${(showIndicator ? 'active' : 'inactive')} indicator-dot`}></span>}
        </div>
    );
}

export default Square