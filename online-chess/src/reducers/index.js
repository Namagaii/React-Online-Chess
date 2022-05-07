import boardReducer from "./board";
import teamReducer from "./team"
import { combineReducers } from "redux";

const allReducers = combineReducers({
    board : boardReducer,
    team: teamReducer
})

export default allReducers