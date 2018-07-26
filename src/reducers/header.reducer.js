import {
    LOAD_LANGUAGE,
    CHANGE_LANGUAGE
} from "../actions/app.action";

export const headerReducer = (state = 0, action) => {
    switch (action.type) {
        case LOAD_LANGUAGE:
            return {...state, languages: action.data};
        case CHANGE_LANGUAGE:
            return {...state, curLanguage: action.data};
        default:
            return state || false;
    }
};