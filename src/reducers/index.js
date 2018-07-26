import {combineReducers} from "redux";
import {homeReducer} from "./home.reducer";
import {appReducer} from "./app.reducer";
import {detailReducer} from "./detail.reducer";
import {gameListReducer} from "./gameList.reducer";

export let defState = {};

export let reducers = combineReducers({
    appReducer,
    homeReducer,
    detailReducer,
    gameListReducer
});
