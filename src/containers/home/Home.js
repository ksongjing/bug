import React, {Component} from 'react';
import intl from 'react-intl-universal';
import './Home.scss';
import Slide from "../../components/home/slide/Slide";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import _ from "lodash"
import {getFeatureData, getIndexData, getRoadMapData} from "../../actions/home.action";
import Product from "../../components/home/product/Product";
import Partner from "../../components/home/partner/Partner";
import Media from "../../components/home/media/Media";
import RoadMap from "../../components/home/roadMap/RoadMap";
import Feature from "../../components/home/feature/Feature";
import Exchange from "../../components/home/exchange/Exchange";
import RecommendGames from "../../components/home/recommendGames/RecommendGames";
import Games from "../../components/home/games/Games";
import environment from '../../environments/environment'

/***
 * @Author ChenLiheng
 * @Desc 首页容器组件
 * @Date 2018/7/14 16:19
 **/
class Home extends Component {
    static propTypes = {
        slideData: PropTypes.array,
        gamesData: PropTypes.array,
        mediaData: PropTypes.array,
        exchangesData: PropTypes.array,
        partnersData: PropTypes.array,
        hotGamesData: PropTypes.array,
        soonGamesData: PropTypes.array,
        blockAccess: PropTypes.number,
        roadMapData: PropTypes.array,
        featureData: PropTypes.array,
        curLang: PropTypes.string,
    };

    componentDidMount() {
        this.props.getIndexData(this.props.curLang);
        this.props.getRoadMapData();
        this.props.getFeatureData();
    }

    componentDidUpdate() {
        let hash = window.location.hash;
        if (_.startsWith(hash, "#roadmap")) {
            let roadmapEle = document.getElementById("roadmap");
            if (roadmapEle) {
                window.scrollTo(0, roadmapEle.offsetTop);
            }
        } else if(_.startsWith(hash, "#support", 0)) {
            let exchange = document.getElementById("support");
            if (exchange) {
                window.scrollTo(0, exchange.offsetTop);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }

    render() {
        const {
            slideData, gamesData, hotGamesData, soonGamesData, mediaData, exchangesData,
            partnersData, roadMapData, featureData
        } = this.props;
        return (
            <div className="Home">
                <Slide items={slideData}/>
                <RecommendGames title={intl.get("titleRecommend")} items={gamesData}/>
                <Games title={intl.get("titleSononGames")} items={soonGamesData}/>
                <Games title={intl.get("titleHotGames")} items={hotGamesData}/>
                <Product title={intl.get("titleProduct")}/>
                <Partner title={intl.get("titlePartner")} items={partnersData}/>
                <Media title={intl.get("titleMedia")} items={mediaData}/>
                <RoadMap title={intl.get("titleRoadmap")} items={roadMapData}/>
                <Feature title={intl.get("titleFeature")} items={featureData}/>
                <Exchange title={intl.get("titleExchange")} items={exchangesData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let indexData = state.homeReducer.indexData;
    return {
        slideData: indexData ? formatData(indexData.focus_list) : [],
        gamesData: indexData ? formatData(indexData.game_list) : [],
        mediaData: indexData ? formatData(indexData.media_list) : [],
        exchangesData: indexData ? formatData(indexData.exchange_list) : [],
        partnersData: indexData ? formatData(indexData.partner_list) : [],
        soonGamesData: indexData ? formatData(indexData.soon_games) : [],
        hotGamesData: indexData ? formatData(indexData.hot_games) : [],
        blockAccess: indexData ? indexData.block_access : 0,
        roadMapData: state.homeReducer.roadMapData,
        featureData: state.homeReducer.featureData,
        curLang: state.appReducer.curLanguage
    }
};

const formatData = (data) => {
    for (let item of data) {
        if (!_.startsWith(item.picture, environment.serverHost)) {
            item.picture = environment.serverHost + item.picture;
        }
    }
    return data;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getIndexData, getRoadMapData, getFeatureData}, dispatch)
};
Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;