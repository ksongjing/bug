import {
    LOAD_LANGUAGE,
    CHANGE_LANGUAGE,
    INIT_DONE,
    OPEN_SLIDEBAR,
    CLOSE_SLIDEBAR,
    BODY_SCROLL,
    SHOW_SEARCHBOX
} from "../actions/app.action";

export const appReducer = (state = 0, action) => {
    switch (action.type) {
        case LOAD_LANGUAGE:
            return {...state, languages: action.data};
        case CHANGE_LANGUAGE:
            return {...state, curLanguage: action.data};
        case INIT_DONE:
            return {...state, initDone: action.data};
        case OPEN_SLIDEBAR:
            return {...state, slideStatu: true};
        case CLOSE_SLIDEBAR:
            return {...state, slideStatu: false};
        case BODY_SCROLL:
            return {...state, bodyScroll: action.data};
        case SHOW_SEARCHBOX:
            return {...state, searchBoxStatu: action.data};
        default:
            return state || false;
    }
};