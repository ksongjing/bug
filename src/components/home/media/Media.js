import React, {Component} from 'react';
import './Media.scss'
import PropTypes from "prop-types";

/**
 * Created by ChenLiheng on 2018/7/15.
 * @desc 媒体列表组件
 */

class Media extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
    };

    render() {
        const {title, items} = this.props;
        if (items && items.length > 0) {
            return (
                <div className="media">
                    <div className="container media-container">
                        <h2>{title}</h2>
                        <div className="media-items">
                            {
                                items && items.map(item => {
                                    const {title, picture, url} = item;
                                    return (
                                        <a href={url} target="_blank" rel="noopener noreferrer" key={picture}>
                                            <img src={picture} alt={title}/>
                                        </a>
                                    )
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

export default Media;
