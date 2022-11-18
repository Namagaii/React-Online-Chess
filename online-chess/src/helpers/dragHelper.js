import Board from "../logic/board.js";
import Square from "./square.js";
import { getMoves } from "../logic/index.js";

let sourcePieceEl;
let allowDropEvent = false;

export const handleDragStart = (event, piece) => {
    allowDropEvent = true;
    sourcePieceEl = event.target;
    event.dataTransfer.effectAllowed = 'all';
    piece.setMoveList(getMoves(piece));
    event.dataTransfer.setData("sourcePieceData", JSON.stringify(piece));
    piece.moveList.forEach(moveCoords => {
        Square.activateIndicator(moveCoords.x, moveCoords.y);
    });
    event.target.style.opacity = 0;
}

// This is called every few milliseconds while the cursor is over the object
export const handleDragOver = (event) => {
    event.preventDefault();
    return false;
}

//This can be used to highlight an element upon being dragged over. This event is called once on drag over
export const handleDragEnter = (event) => {

}

export const handleDrop = (event, targetCoords) => {
    event.stopPropagation();
    if(allowDropEvent){
        let sourcePiece;
        if (!event.dataTransfer.getData("sourcePieceData")){
            // Reset all values here if data in dataTransfer is bad and return early
            console.warn("Value at address sourcePieceData was not valid.")
            sourcePieceEl.style.opacity = 1;
            sourcePieceEl = "";
            allowDropEvent = false;
            return false;
        } else {
            sourcePiece = JSON.parse(event.dataTransfer.getData("sourcePieceData"));
        }
        let wasValid = false; // Was the attempted move valid
        // Check if move is on the list of valid moves
        sourcePiece.moveList.forEach(validMove => {
            if (validMove.x === targetCoords.x && validMove.y === targetCoords.y){
                //Change the stored board
                Board.movePiece({ x: sourcePiece.coords.x, y: sourcePiece.coords.y }, { x: validMove.x, y: validMove.y });
                //Destination
                Square.setContent(validMove.x, validMove.y, sourcePiece);
                //Source
                Square.setContent(sourcePiece.coords.x, sourcePiece.coords.y);
                wasValid = true;
            }
        });
        if (!wasValid) { if (sourcePieceEl) {sourcePieceEl.style.opacity = 1;} }
        Square.disableAllIndicators();
        event.dataTransfer.setData("sourcePieceData", "");
    }
    if (sourcePieceEl) {sourcePieceEl.style.opacity = 1;} else {console.warn("sourcePieceEl not initialized");}
    sourcePieceEl = "";
    allowDropEvent = false;
    return false;
}
