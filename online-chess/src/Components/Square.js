import React, { useState } from 'react'
import Piece from './Piece'
import {Square as c_Square} from '../helpers/square.js'
import { useSelector, useDispatch } from 'react-redux';
import './Square.css'
function Square(props) {
    console.log(`Coords: (${props.coords.x}, ${props.coords.y})`)
    const board = useSelector(state => state.board);
    const piece = board[props.coords.x][props.coords.y];
    const [showIndicator, setShowIndicator] = useState(false);
    const generateContent = (containsPiece) => {
        let output;
        if (containsPiece && containsPiece !== 'X'){
            output = {
                piece: (<Piece piece = {piece} coords = {props.coords} />),
                indicator: (<span className= {(showIndicator ? 'active' : 'inactive') + ' indicator-circle' }></span>)
            };
        } else {
            output = {
                piece: "",
                indicator: (<span className= {(showIndicator ? 'active' : 'inactive') + ' indicator-dot'}></span>)
            };
        }
        return output;
    }
    let square = new c_Square(generateContent(piece), props.coords.x, props.coords.y);
    const [content, setContent] = useState(square.contentData);
    square.setContentSetter(setContent);
    square.setShowIndicatorSetter(setShowIndicator);

    return (
        <div className = {"square " + props.squareColor} >
            {content.piece === "" ? "" : content.piece}
            {content.indicator === "" ? () => {console.warn(`No indicator was set at square (${props.coords.x}, ${props.coords.y}).`)} : content.indicator}
        </div>
    );
}

export default Square