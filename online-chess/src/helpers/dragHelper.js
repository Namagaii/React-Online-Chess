const DIXOFFSET = 0;
const DIYOFFSET = 0;
export const handleDragStart = (event, piece) => {
    event.dataTransfer.setDragImage(piece.sprite, DIXOFFSET, DIYOFFSET);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("sourcePieceData", JSON.stringify(piece));
    event.target.style.opacity = 0;
}

export const handleDragOver = (event) => {
    event.preventDefault();
    return false;
}

export const handleDragEnter = (event) => {

}

export const handleDrop = (event) => {
    event.stopPropagation();
    return false;
}

export const handleDragEnd = (event) => {

}
