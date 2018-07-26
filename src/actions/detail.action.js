import environment from '../environments/environment'

export const LOADING_DATA = 'DETAIL_LOADING_DATA';
export const LOAD_SUCCESS = 'DETAIL_LOAD_SUCCESS';
export const LOAD_FAILED = 'DETAIL_LOAD_FAILED';

export const loadingData = () => {
    return {type: LOADING_DATA}
};
export const loadSuccess = (data) => {
    return {type: LOAD_SUCCESS, data: data};
};
export const loadFailed = () => {
    return {type: LOAD_FAILED}
};

/**
 * 游戏详情
 * @return {function(*)}
 */
export const getDetailData = (game_info_id) => {
    if ( !game_info_id || game_info_id.length === 0 ) { return null; }
    let url = environment.serverHost + "/api/v1/games/{gid}/info/";
    if (url.indexOf('{gid}') === -1) {
        return null;
    }
    url = url.replace('{gid}', game_info_id);
    return (dispatch) => {
        // 发送LoadingData消息
        dispatch(loadingData());
        // 异步请求数据
        fetch(url)
            .then(resp => resp.json())
            // 发送数据请求成功的消息
            .then(json => {
                if (json.msg === 'success') {
                    dispatch(loadSuccess(json.data));
                } else {
                    dispatch(loadFailed());
                }
            })
            .catch(error => {
                console.error(error)
            });
    };
};
