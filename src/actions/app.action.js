import intl from 'react-intl-universal';
import _ from "lodash";

export const LOAD_LANGUAGE = 'LOAD_LANGUAGE';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const INIT_DONE = 'INIT_DONE';
export const OPEN_SLIDEBAR = 'OPEN_SLIDEBAR';
export const CLOSE_SLIDEBAR = 'CLOSE_SLIDEBAR';
export const BODY_SCROLL = 'BODY_SCROLL';
export const SHOW_SEARCHBOX = 'SHOW_SEARCHBOX';

export const loadLanguages = (data) => {
    return {type: LOAD_LANGUAGE, data: data};
};
export const changeLanguage = (language) => {
    return {type: CHANGE_LANGUAGE, data: language}
};
export const init = (data) => {
    return {type: INIT_DONE, data: data}
};
export const openSlidebar = (data) => {
    return {type: OPEN_SLIDEBAR}
};
export const closeSlidebar = (data) => {
    return {type: CLOSE_SLIDEBAR}
};
export const bodyScroll = (data) => {
    return {type: BODY_SCROLL,data:data}
};
export const showSearchBox = (data) => {
    return {type: SHOW_SEARCHBOX, data: data};
};

const localData = [
    {
        name: "English",
        value: "en-US"
    },
    {
        name: "简体中文",
        value: "zh-CN"
    }];

/***
 * @Author ChenLiheng
 * @Desc 本地语言类别
 * @Date 2018/7/18 19:05
 * @Return function
 **/
export const loadLanguageData = () => {
    return (dispatch) => {
        dispatch(loadLanguages(localData));
    };
};

/***
 * @Author ChenLiheng
 * @Desc 加载本地语言包
 * @Date 2018/7/19 10:42
 * @Param local
 * @Return fun
 **/
export const loadLocalData = () => {
    let currentLocale = intl.determineLocale({
        urlLocaleKey: "lang",
        cookieLocaleKey: "lang"
    });

    if (!_.find(localData, {value: currentLocale})) {
        currentLocale = "en-US";
    }
    return (dispatch) => {
        dispatch(changeLanguage(currentLocale));
        fetch(`/i18n/${currentLocale}.json`)
            .then(data => {
                return data.json();
            }).then(json => {
            return intl.init({
                currentLocale,
                locales: {[currentLocale]: json}
            })
        }).then(() => {
            dispatch(init(true));
        }).catch(error => {
            console.error(error)
        });
    }
};

export const switchSlideBar = (statu) => {
    return (dispatch) => {
        statu ? dispatch(closeSlidebar()) : dispatch(openSlidebar());
    }
};

/***
 * @Author ChenLiheng
 * @Desc 更新当前页面的滚动状态
 * @Date 2018/7/23 16:17
 **/
export const updateBodyScroll = (data) => {
    return (dispatch) => {
        dispatch(bodyScroll(data));
    }
};

/***
 * @Author ChenLiheng
 * @Desc 手机端显示搜索框
 * @Date 2018/7/23 17:14
 **/
export const switchSearchBox = (data) => {
    return (dispatch) => {
        dispatch(showSearchBox(data));
    }
};





