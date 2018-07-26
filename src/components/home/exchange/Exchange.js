import React, {Component} from 'react';
import './Exchange.scss'
import PropTypes from "prop-types";

/**
 * Created by ChenLiheng on 2018/7/15.
 * @desc 交易所组件
 */

class Exchange extends Component {
    static propTypes = {
        title: PropTypes.string,
        options: PropTypes.object,
        items: PropTypes.array
    };


    render() {
        const {title, items} = this.props;
        if (items && items.length > 0) {
            return (
                <div id="support" className="exchange">
                    <div className="container exchange-container">
                        <h2>{title}</h2>
                        <div className="exchange-items">
                            {items && items.map((item) => {
                                const {title, url, picture} = item;
                                return (
                                    <a href={url} target="_blank" rel="noopener noreferrer" key={picture}>
                                        <img src={picture} alt={title}/>
                                    </a>)
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return (null);
    }
}

export default Exchange;
