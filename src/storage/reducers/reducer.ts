import { combineReducers } from "redux";
import User from './userReducer'

//Creacion del reducer
const rootReducer = combineReducers({
    User: User,
});

export default rootReducer;