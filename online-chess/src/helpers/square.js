export default class Square {
    // Contains references to the content on each square of the board
    static contentRefs = [];
    static indicatorStatuses = [];
    static threatOverlays = [];
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
    // setShowThreat: A callback to useState setter for threat overlay
    // contentGenerator: A callback 
    constructor(contentData, x, y){
        this.contentData = contentData;
        Square.contentRefs[x][y] = this.contentData;
    }

    static initContentRefs(width, height){
        for(let x = 0; x < width; x++){
            this.contentRefs.push([]);
            this.indicatorStatuses.push([]);
            this.threatOverlays.push([]);
            for (let y = 0; y < height; y++){
                this.contentRefs[x].push("");
                this.indicatorStatuses[x].push(false);
                this.threatOverlays[x].push(false);
            }
        }
    }

    static setContent(x, y, piece = "X"){
        if (!this.contentRefs[x][y].setContent) { console.warn(`setContent was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return; }
        if (!this.contentRefs[x][y].contentGenerator) { console.warn(`contentGenerator was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return;}
        console.log(`Set content at (${x}, ${y}) to: `);
        console.log(piece);
        this.contentRefs[x][y].setContent(this.contentRefs[x][y].contentGenerator(piece));
    }

    static getContent(x, y){
        if(!this.contentRefs[x][y]){
            console.warn(`Content value was not found at position (${x}, ${y}) in contentRefs array.`); 
            return "";
        } else {
            return this.contentRefs[x][y];
        }
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

    static activateThreat(x, y){
        if (!this.contentRefs[x][y].setShowThreat){ console.warn(`setShowThreat was not assigned or found at position (${x}, ${y}) in contentRefs array.`); return;}
        this.contentRefs[x][y].setShowThreat(true);
        this.threatOverlays[x][y] = true;
    }

    static disableAllThreats(){
        for(let x = 0; x < this.contentRefs.length; x++){
            for(let y = 0; y < this.contentRefs[x].length; y++){
                if(this.threatOverlays[x][y]){
                    this.contentRefs[x][y].setShowThreat(false);
                    this.threatOverlays[x][y] = false;
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