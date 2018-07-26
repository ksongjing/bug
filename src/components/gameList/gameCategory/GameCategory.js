import React, {Component} from 'react';
import styles from "./GameCategory.scss"
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

class GameCategory extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.changeTab = this.changeTab.bind(this);
        this.state = {curTab: 0};
    }

    render() {
        const items = ["最新游戏", "热门游戏", "即将上线"];
        return (
            <div className="gamecatecory">
                <div className="container gamecatecory-container">
                    <div className="gamecatecory-items">
                        {
                            items && items.map((item, index) => {
                                let itemClass = cx({
                                    "gamecatecory-item": true,
                                    "gamecatecory-item-selected": this.state.curTab === index
                                });
                                return (<div className={itemClass} key={index}
                                             onClick={(e) => this.changeTab(index, e)}>{item}</div>);
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    changeTab(index, e) {
        this.setState(preState => ({
            curTab: index
        }));
        // todo 切换游戏列表的数据
    }
}
export default GameCategory;