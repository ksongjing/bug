import React, { Component } from 'react';
import './RoadMap.scss'
import PropTypes from "prop-types";
/**
 * Created by ChenLiheng on 2018/7/15.
 * @desc 路线图组件
 */

class RoadMap extends Component{
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
    };

    render() {
        const {title,items}  =this.props;
        return (
            <div id="roadmap" className="roadmap">
                <div className="container roadmap-container">
                    <h2>{title}</h2>
                    <div className="roadmap-items">
                        {items && items.map((item, index) => {
                            const {date, content} = item;
                            return (<RoadMapItem date={date} content={content} index={index} key={date}/>);
                        })}

                    </div>
                </div>
            </div>
        );
    }
}
export default RoadMap;

class RoadMapItem extends Component{
    static propTypes = {
        date: PropTypes.string,
        content: PropTypes.string,
        index: PropTypes.number
    };

    render() {
        const {date,content,index} = this.props;
        let itemContentClassName = "item-content";

        if (index % 2 === 0) {
            itemContentClassName += " item-content-right";
        }else {
            itemContentClassName += " item-content-left";
        }
        return (
            <div className="roadmap-item">
                <div className="item-point" />
                {content.length !== 0 ?  (<div className="item-line" />): (<div />)}
                <div className={itemContentClassName}>
                    <div className="item-date">{date}</div>
                    <div className="item-desc">{content}</div>
                </div>
            </div>
        );
    }
}
