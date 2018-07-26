import React, {Component} from 'react';
import styles from "./BlockTabs.scss"
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

let cx = classNames.bind(styles);

class BlockTabs extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.changeTab = this.changeTab.bind(this);
        this.state = {curTab: 0};
    }

    render() {
        const items = ["以太坊", "EOS", "星云链", "其他"];
        return (
            <div className="blocktab">
                <div className="container blocktab-container">
                    <div className="blocktab-items">
                        {
                            items && items.map((item, index) => {
                                let itemClass = cx({
                                    "blacktab-item": true,
                                    "blacktab-item-selected": this.state.curTab === index
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
export default BlockTabs;