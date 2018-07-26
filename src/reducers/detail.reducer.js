import {
    LOADING_DATA,
    LOAD_SUCCESS
} from "../actions/detail.action";

export const detailReducer = (state = 0, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {...state};
        case LOAD_SUCCESS:
            return {...state, detailData: action.data};
        default:
            return state || false;
    }
};