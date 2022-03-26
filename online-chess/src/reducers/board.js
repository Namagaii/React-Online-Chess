const initialBoard = [
    ['r','p','X','X','X','X','P','R'],
    ['n','p','X','X','X','X','P','N'],
    ['b','p','X','X','X','X','P','B'],
    ['k','p','X','X','X','X','P','K'],
    ['q','p','X','X','X','X','P','Q'],
    ['b','p','X','X','X','X','P','B'],
    ['n','p','X','X','X','X','P','N'],
    ['r','p','X','X','X','X','P','R']
]
const boardReducer = (state = initialBoard, action) => {
    switch(action.type){
        case 'UPDATE':
            return action.payload;
        case 'GET':
            return state;
        default: 
            return state;
    }
}

export default boardReducer;