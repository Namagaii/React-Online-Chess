const checkIndicatorStatus = (indicator) => {
    //Get Status
    let status = indicator.split(' ');
    status = status[0] === "active" ? true : false;
    return status;
};
export class Square {
    // Contains references to the content on each square of the board
    static contentRefs = [];
    // Content data format:
    // data: the value of the content
    // {
    //     piece
    //     indicator  
    // }
    // setContent: A callback to useState setter for content value
    // setShowIndicator
    constructor(contentData, x, y){
        this.contentData = contentData;
        Square.contentRefs[x][y] = this.contentData;
    }

    static initContentRefs(width, height){
        for(let x = 0; x < width; x++){
            this.contentRefs.push([]);
            for (let y = 0; y < height; y++){
                this.contentRefs[x].push("");
            }
        }
        console.log("worked")
    }

    static setContent(newContent, x, y){
        if (!this.contentRefs[x][y].setContent) { console.warn(`setContent was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return; }
        this.contentRefs[x][y].setContent(newContent);
        //this.contentRefs[x][y].value = newContent; this might be neccesarry but as its a reference type it not be needed TODO: remove this
    }

    static getContent(x, y){
        return !this.contentRefs[x][y].value ? () => { console.warn(`Content value was not found at position (${x}, ${y}) in contentRefs array.`); return ""; } : this.contentRefs[x][y].value;
    }

    //Activate indicator at position x, y
    static activateIndicator(x, y){
        if (!this.contentRefs[x][y].setShowIndicator) { console.warn(`setShowIndicator was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return; }
        this.contentRefs[x][y].setShowIndicator(true);
    }

    static disableAllIndicators(){
        this.contentRefs.forEach(contentData => {
            if (checkIndicatorStatus(contentData.indicator)){
                contentData.setShowIndicator(false);
            }
        });
    }

    setContentSetter(cb){
        this.contentData.setContent = cb;
    }

    setShowIndicatorSetter(cb){
        this.contentData.setShowIndicator = cb;
    }
}