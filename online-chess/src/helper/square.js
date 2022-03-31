let dots = []
export const displayDotSubscribe = (x, y, cb) => {
    dots.push({
        x: x,
        y: y,
        cb: cb
    });
}
export const displayDotUnSubscribe = (x, y) => {
    for(let i = 0; i < dots.length; i++){
        if (dots[i].x === x && dots[i].y === y){
            console.log(`Removed displayDot listener @(${x}, ${y})`)
            dots = dots.splice(i, 1);
            break;
        }
    }
}
export const displayDots = (coordList) => {
    for (let x = 0; x < coordList.length; x++){
        for (let y = 0; y < dots.length; y++){
            if (coordList[x].x === dots[y].x && coordList[x].y === dots[y].y){
                dots[y].cb(true)
                break;
            }
        }
    }
}
export const hideDots = () => {
    for (let i = 0; i < dots.length; i++){
        dots[i].cb(false);
    }
}

