import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import './GameDetail.scss';
import GameIntro from "../../components/gameDetail/gameIntro/GameIntro";
import GameContent from "../../components/gameDetail/gameContent/GameContent";
import GameRecommend from "../../components/gameDetail/gameRecommend/GameRecommend";
import SubHeader from "../../components/subHeader/SubHeader";
import {getDetailData} from "../../actions/detail.action";
import intl from 'react-intl-universal';
import _ from "lodash"
import environment from '../../environments/environment'

class GameDetail extends Component {
    static propTypes = {
        detailData: PropTypes.object,
        curLanguage: PropTypes.string,
    };

    componentDidMount() {
        window.scrollTo(0, 0);

        const { id } = this.props.match.params;
        this.props.getDetailData(id);
    }

    render() {
        const { detailData, curLanguage } = this.props;

        return (
            <div className="gamedetail">
                <SubHeader title={intl.get("detailGame")}/>
                <GameIntro introInfo={detailData}  curLanguage={curLanguage}/>
                <div className="container gamedetail-cententView">
                    <GameContent title={intl.get("gamePicVideo")} titleContent={intl.get("gameIntro")}
                                 description={detailData ? detailData.description : null}
                                 items={detailData && detailData.picture_list ? detailData.picture_list : []}/>
                    <GameRecommend title={intl.get("gameRecommend")} items={detailData && detailData.game_list ? detailData.game_list : []}/>
                </div>
            </div>
        );
    }
}


const formatData = (data) => {
    if ( !data.game_list ) return data;

    if ( data && data.picture_list ){
        for (let item of data.picture_list) {
            if (!_.startsWith(item.picture, environment.serverHost)) {
                item.picture = environment.serverHost + item.picture;
            }
        }
    }

    if ( data && data.game_list ){
        for (let item of data.game_list) {
            if (!_.startsWith(item.icon, environment.serverHost)) {
                item.icon = environment.serverHost + item.icon;
            }
        }
    }

    return data;
};

const mapStateToProps = (state) => {
    let data = state.detailReducer.detailData;
    return {
        detailData: data ? formatData(data) : null,
        curLanguage: state.appReducer.curLanguage
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getDetailData}, dispatch)
};

GameDetail = connect(mapStateToProps, mapDispatchToProps)(GameDetail);

export default GameDetail;