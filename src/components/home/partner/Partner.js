import React, {Component} from 'react';
import './Partner.scss'
import PropTypes from "prop-types";

/**
 * Created by ChenLiheng on 2018/7/15.
 * @desc 合作伙伴组件
 */

class Partner extends Component {
    static prorTypes = {
        title: PropTypes.string,
        itmes: PropTypes.array
    };

    render() {
        const {title, items} = this.props;
        if (items && items.length > 0) {
            return (
                <div className="partner">
                    <div className="container partner-container">
                        <h2>{title}</h2>
                        <div className="partner-items">
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

export default Partner;
