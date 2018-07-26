import React, {Component} from "react";
import PropTypes from "prop-types";
import "./GameIntro.scss";
import intl from 'react-intl-universal';

class GameIntro extends Component {
    static propTypes = {
        introInfo: PropTypes.object,
        curLanguage: PropTypes.string
    };

    isZhCn() {
        const { curLanguage } = this.props;
        return curLanguage === 'zh_CN';
    }

    getValue(key){
        if ( !key || !key.zh || !key.en) { return '--'; }

        return this.isZhCn() ? key.zh : key.en;
    }

    render() {
        const {introInfo} = this.props;
        return (
            <div className="gameintro">
                <div className="container gameintro-container">
                    <div className="gameintro-border">
                        <div className="gameintro-title">{ introInfo ? this.getValue(introInfo.game_name) : '--' }</div>
                        <div className="gameintro-content">
                            <div className="gameintro-leftview">
                                <div className="leftview-top">
                                    <div className="item-intro">{intl.get("type")}：{ introInfo ? this.getValue(introInfo.game_type) : '--' }</div>
                                    <div className="item-intro">{intl.get("language")}：{ introInfo ? this.getValue(introInfo.language) : '--' }</div>
                                    <div className="item-intro">{intl.get("status")}：{ introInfo ? this.getValue(introInfo.game_status) : '--' }</div>
                                    <div className="item-intro">{intl.get("terminnal")}：{ introInfo ? this.getValue(introInfo.game_client) : '--' }</div>
                                    <div className="item-intro">{intl.get("gameChain")}：{ introInfo ? this.getValue(introInfo.game_block) : '--' }</div>
                                </div>
                                <div className="leftview-bottom">
                                    {
                                        introInfo && introInfo.tags && introInfo.tags.length > 0 && introInfo.tags.map((tag) => {
                                            return (<div className="item-tag" key={tag.tag_id}>{tag.title ? tag.title : '--'}</div>);
                                        })
                                    }
                                </div>
                            </div>
                            <a className="btn-opengame" href={introInfo && introInfo.game_site ? introInfo.game_site : ""} target="_blank" rel="noopener noreferrer">
                                {intl.get("openGame")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameIntro;