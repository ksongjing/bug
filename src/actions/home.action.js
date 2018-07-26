import intl from 'react-intl-universal';
import environment from '../environments/environment'

export const LOADING_DATA = 'LOADING_DATA';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAILED = 'LOAD_FAILED';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const LOAD_ROADMAP = 'LOAD_ROADMAP';
export const LOAD_FEATURE = 'LOAD_FEATURE';

export const loadingData = () => {
    return {type: LOADING_DATA}
};
export const loadSuccess = (data) => {
    return {type: LOAD_SUCCESS, data: data};
};
export const loadFailed = () => {
    return {type: LOAD_FAILED}
};
export const loadRoadMap = (data) => {return {type: LOAD_ROADMAP, data: data}};
export const loadFeature = (data) => {return {type: LOAD_FEATURE, data: data}};


export const changeLanguage = (language) => {
    return {type: CHANGE_LANGUAGE, language: language}
};

/**
 * 查询首页模板数据异步Action
 * @return {function(*)}
 */
export const getIndexData = (lang) => {
    let client = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? "mobile" : "pc";
    lang = lang.slice(0,2);
    let url = `${environment.serverHost}:8080/cms/v1/website/?channel_id=3&client=${client}&language=${lang}`;
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

/***
 * @Author ChenLiheng
 * @Desc 产品路线图数据
 * @Date 2018/7/16 15:05
 * @return {function(*)}
 **/
export const getRoadMapData = () => {
    let roadMapData =  [
        {
            date: intl.get("roadmapOneDate"),
            content: intl.get("roadmapOneContent")
        },
        {
            date: intl.get("roadmapTwoDate"),
            content: intl.get("roadmapTwoContent")
        },
        {
            date: intl.get("roadmapThreeDate"),
            content: intl.get("roadmapThreeContent")
        },
        {
            date: intl.get("roadmapFourDate"),
            content: intl.get("roadmapFourContent")
        },
        {
            date: intl.get("roadmapFiveDate"),
            content: intl.get("roadmapFiveContent")
        },
        {
            date: intl.get("roadmapSixDate"),
            content: intl.get("roadmapSixContent")
        },
        {
            date: intl.get("roadmapSevenDate"),
            content: intl.get("roadmapSevenContent")
        },
        {
            date: intl.get("roadmapEightDate"),
            content: intl.get("roadmapEightContent")
        },
        {
            date: intl.get("roadmapNineDate"),
            content: intl.get("roadmapNineContent")
        },
        {
            date: intl.get("roadmapTenDate"),
            content: intl.get("roadmapTenContent")
        },
        {
            date: intl.get("roadmapElevenDate"),
            content: intl.get("roadmapElevenContent")
        },
        {
            date: intl.get("roadmapTwelveDate"),
            content: intl.get("roadmapTwelveContent")
        }];
    return (dispatch) => {
        dispatch(loadRoadMap(roadMapData));
    };
};

/***
 * @Author ChenLiheng
 * @Desc 产品特征数据
 * @Date 2018/7/18 18:49
 * @return {function(*)}
 **/
export const getFeatureData = () => {
    let featureData = [
        {
            title:intl.get("featureOneTitle"),
            content:intl.get("featureOneContent")
        },
        {
            title:intl.get("featureTwoTitle"),
            content:intl.get("featureTwoContent")
        },
        {
            title:intl.get("featureThreeTitle"),
            content:intl.get("featureThreeContent")
        },
        {
            title:intl.get("featureFourTitle"),
            content:intl.get("featureFourContent")
        }
    ];
    return (dispatch) => {
        dispatch(loadFeature(featureData));
    }
};