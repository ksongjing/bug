import environment from '../environments/environment'

export const LOADING_DATA = 'GAMELIST_LOADING_DATA';
export const LOAD_SUCCESS = 'GAMELIST_LOAD_SUCCESS';
export const SEARCH_LOAD_SUCCESS = 'SEARCHLIST_LOAD_SUCCESS';
export const LOAD_FAILED = 'GAMELIST_LOAD_FAILED';

export const loadingData = () => {
    return {type: LOADING_DATA}
};
export const loadSuccess = (data, totalPage) => {
    return {type: LOAD_SUCCESS, data: data, totalItems:totalPage};
};

export const searchLoadSuccess = (data) => {
    return {type: SEARCH_LOAD_SUCCESS, data: data};
};

export const loadFailed = () => {
    return {type: LOAD_FAILED}
};

export const PAGE_NUM = 5;
export const CHANGE_KEY = 'CHANGE_KEY';

export const actChangeKey = (key) => {
    return {type: CHANGE_KEY, data:key}
};

export const changeKey = (key) => {
    return (dispatch) => {
        dispatch (actChangeKey(key));
    }
};

export const resetGameList = () => {
    return (dispatch) => {
        dispatch(loadSuccess([], 0));
    }
}

export const resetSearchList = () => {
    return (dispatch) => {
        dispatch(searchLoadSuccess([]));
    }
}

export const getGameList = (pageNo, pageNum) => {
    let url = environment.serverHost + "/api/v1/games/games_list/?start=";
    url += (pageNo || '0');
    url += '&num='+ (pageNum || PAGE_NUM);

    return (dispatch) => {
        // 发送LoadingData消息
        dispatch(loadingData());
        // 异步请求数据
        fetch(url)
            .then(resp => resp.json())
            // 发送数据请求成功的消息
            .then(json => {
                if (json.msg === 'success') {
                    dispatch(loadSuccess(json.data ? json.data.list : [], json.data.total));
                } else {
                    dispatch(loadFailed());
                }
            })
            .catch(error => {
                console.error(error)
            });
    };
};

export const getSearchGames = (kwd) => {
    let url = environment.serverHost +  "/api/v1/games/search_games/?kwd=";

    return (dispatch) => {
        // 发送LoadingData消息
        dispatch(loadingData());
        // 异步请求数据
        fetch(url)
            .then(resp => resp.json())
            // 发送数据请求成功的消息
            .then(json => {
                if (json.msg === 'success') {
                    dispatch(searchLoadSuccess(json.data));
                } else {
                    dispatch(loadFailed());
                }
            })
            .catch(error => {
                console.error(error)
            });
    };
};