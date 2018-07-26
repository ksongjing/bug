import React, { Component } from 'react';
import './empty.scss';
import PropTypes from 'prop-types';
import image from "../../assets/images/icon-empty.png";


class Empty extends Component {
    static propTypes = {
        isEmpty: PropTypes.bool,
    };

    render() {
        const { isEmpty } = this.props;
        return (
            <div className="empty" style={{display: isEmpty ? 'flex' : 'none'}}>
                <div className="container empty-container">
                    <img src={image} alt="logo" />
                    <div className="empty-text">No Content</div>
                </div>
            </div>
        );
    }
}
export default Empty;