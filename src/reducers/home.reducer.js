import {
    LOADING_DATA,
    LOAD_SUCCESS,
    LOAD_FAILED,
    LOAD_ROADMAP,
    LOAD_FEATURE
} from "../actions/home.action";

export const homeReducer = (state = 0, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {...state};
        case LOAD_SUCCESS:
            return {...state, indexData: action.data};
        case LOAD_FAILED:
            return state || false;
        case LOAD_ROADMAP:
            return {...state, roadMapData: action.data};
        case LOAD_FEATURE:
            return {...state, featureData: action.data};
        default:
            return state || false;
    }
};