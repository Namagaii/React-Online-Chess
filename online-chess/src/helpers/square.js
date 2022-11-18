export default class Square {
    // Contains references to the content on each square of the board
    static contentRefs = [];
    static indicatorStatuses = [];
    // Content data format:
    // data: the value of the content
    // {
    //     piece
    //     indicator: {
    //      isCircle
    //     }
    // }
    // setContent: A callback to useState setter for content value
    // setShowIndicator: A callback to useState setter for content generator
    // contentGenerator: A callback 
    constructor(contentData, x, y){
        this.contentData = contentData;
        Square.contentRefs[x][y] = this.contentData;
    }

    static initContentRefs(width, height){
        for(let x = 0; x < width; x++){
            this.contentRefs.push([]);
            this.indicatorStatuses.push([]);
            for (let y = 0; y < height; y++){
                this.contentRefs[x].push("");
                this.indicatorStatuses[x].push(false);
            }
        }
    }

    static setContent(x, y, piece = "X"){
        if (!this.contentRefs[x][y].setContent) { console.warn(`setContent was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return; }
        if (!this.contentRefs[x][y].contentGenerator) { console.warn(`contentGenerator was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return;}
        this.contentRefs[x][y].setContent(this.contentRefs[x][y].contentGenerator(piece));
        //this.contentRefs[x][y].value = newContent; this might be neccesarry but as its a reference type it not be needed TODO: remove this
    }

    static getContent(x, y){
        return !this.contentRefs[x][y].value ? () => { console.warn(`Content value was not found at position (${x}, ${y}) in contentRefs array.`); return ""; } : this.contentRefs[x][y].value;
    }

    //Activate indicator at position x, y
    static activateIndicator(x, y){
        if (!this.contentRefs[x][y].setShowIndicator) { console.warn(`setShowIndicator was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return; }
        this.contentRefs[x][y].setShowIndicator(true);
        this.indicatorStatuses[x][y] = true;
    }

    static disableAllIndicators(){
        for (let x = 0; x < this.contentRefs.length; x++){
            for (let y = 0; y < this.contentRefs[x].length; y++){
                if(this.indicatorStatuses[x][y]){
                    this.contentRefs[x][y].setShowIndicator(false);
                    this.indicatorStatuses[x][y] = false;
                }
            }
        }
    }

    setContentSetter(cb){
        this.contentData.setContent = cb;
    }

    setShowIndicatorSetter(cb){
        this.contentData.setShowIndicator = cb;
    }

    setContentGenerator(cb){
        this.contentData.contentGenerator = cb;
    }
}