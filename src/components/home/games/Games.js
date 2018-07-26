import React, {Component} from 'react';
import './Games.scss'
import PropTypes from "prop-types";
import GameBox from "../gameBox/GameBox";
import {Link} from "react-router-dom";

/***
 * @Author ChenLiheng
 * @Desc 首页即将上线游戏/热门游戏组件
 * @Date 2018/7/17 15:10
 **/
class Games extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
    };

    render() {
        const {title, items} = this.props;
        if (items && items.length > 0) {
            return (
                <div className="games">
                    <div className="container games-container">
                        <div className="container-top"><h2>{title}</h2><Link to="/list"><div className="more"/></Link></div>
                        <div className="game-items">
                            {
                                items && items.map((item,index) => {
                                    return (<GameBox showFloat={false} item={item} index={index} key={item.picture}/>);
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
        return (null);
    }
}

export default Games;