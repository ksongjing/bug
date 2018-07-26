import React, {Component} from 'react';
import './RecommendGames.scss'
import PropTypes from "prop-types";
import GameBox from "../gameBox/GameBox";
import {Link} from "react-router-dom";

/***
 * @Author ChenLiheng
 * @Desc 首页推荐游戏组件
 * @Date 2018/7/17 15:09
 **/
class RecommendGames extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
    };

    render() {
        const {title, items} = this.props;
        return (
            <div className="recomgames">
                <div className="container recomgames-container">
                    <div className="container-top"><h2>{title}</h2><Link to="/list"><div className="more"/></Link></div>
                    <div className="recomgames-items">
                        <div className="items-left">
                            {items && items[0] ? (<GameBox showFloat={true} item={items[0]} index={0} key={0}/>) : (<div />)}
                        </div>
                        <div className="items-center">
                            {items && items[1] ? (<GameBox showFloat={true} item={items[1] } index={1} key={1}/>) : (<div />)}
                            {items && items[2] ? (<GameBox showFloat={true} item={items[2]}  key={2}/>) : (<div />)}
                        </div>
                        <div className="items-right">
                            {items && items[3] ? (<GameBox showFloat={true} item={items[3]}  key={3}/>) : (<div />)}
                            {items && items[4] ? (<GameBox showFloat={true} item={items[4]}  key={4}/>) : (<div />)}
                            {items && items[5] ? (<GameBox showFloat={true} item={items[5]}  key={5}/>) : (<div />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendGames;