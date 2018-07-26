import React, { Component }from "react";
import "./SubHeader.scss";
import PropTypes from 'prop-types';
class SubHeader extends Component {

    static propTypes = {
        title: PropTypes.string
    };

    render () {
        const {title} = this.props;
        return (
            <div className="subheader">
                <div className="container subheader-container">
                    <span>{title}</span>
                </div>
            </div>
        )
    }
}
export default SubHeader;