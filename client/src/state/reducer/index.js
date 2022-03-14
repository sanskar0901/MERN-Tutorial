import { combineReducers } from "redux"
import taskReducer from "./taskReducer"
import userReducer from "./userReducer"

const reducers = combineReducers({
    user: userReducer,
    task: taskReducer
})

export default reducers