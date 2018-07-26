import React, {Component} from "react";
import "./GamePanel.scss";
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';

/**
 * Created by ChenLiheng on 2018/7/21.
 * @desc 游戏列表页游戏数据
 */
class GamePanel extends Component {
    static propTypes = {
        isEmpty: PropTypes.bool,
        curLanguage: PropTypes.string,
        items: PropTypes.array
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
        const { isEmpty, items } = this.props;
        return (
            <div className="gamepanel" style={{display: !isEmpty ? 'flex' : 'none'}}>
                <div className="container">
                    <div className="gamepanel-items">
                        {
                            items && items.length > 0 && items.map((item) => {
                                const { game_id, game_name, game_status, game_type, icon, language, description, url } = item;
                                return (
                                    <a className="gamepanel-item" key={game_id} href={url} target="_blank" rel="noopener noreferrer">
                                        <div className="item-icon"><img src={icon} alt="logo"/></div>
                                        <div className="item-content">
                                            <div className="name">{ this.getValue(game_name) }</div>
                                            <div className="tags">
                                                <div>{intl.get("type")}：{ this.getValue(game_type) }</div>
                                                <div>{intl.get("language")}：{ this.getValue(language) }</div>
                                                <div>{intl.get("status")}：{ this.getValue(game_status) }</div>
                                            </div>
                                            <div className="desc">{ this.getValue(description) }</div>
                                        </div>
                                        <div className="item-todetail">{intl.get("viewDetail")}</div>
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default GamePanel;