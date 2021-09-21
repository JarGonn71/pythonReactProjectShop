import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import filterReducer from "./filter"
import productReducer from "./product"
import authUserReducer from "./authUser"
import modalReducer from "./modalWindow"


let rootReducer = combineReducers({
    filterReducer,
    productReducer,
    authUserReducer,
    modalReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose()

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
)

export default store