import React, { Component } from 'react';
import './Feature.scss'
import PropTypes from 'prop-types';
/**
 * Created by ChenLiheng on 2018/7/15.
 * @desc 特点介绍组件
 */

class Feature extends Component{
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
    };

    render() {
        const {title, items} = this.props;
        return (
            <div id="feature" className="feature">
                <div className="container feature-container">
                    <h2>{title}</h2>
                    <div className="feature-items">
                        {items && items.map(item => {
                            const {title, content} = item;
                            return (<div className="feature-item" key={title}>
                                <h3 className="item-title">{title}</h3>
                                <div className="item-desc">{content}</div>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Feature;
