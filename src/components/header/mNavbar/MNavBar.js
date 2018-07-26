import React from "react";
import "./MNavBar.scss"
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {switchSearchBox, switchSlideBar} from "../../../actions/app.action";

/***
 * @Author ChenLiheng
 * @Desc 手机版头部NavBar
 * @Date 2018/7/23 16:44
 **/
class MNavBar extends React.Component {
    static propsTypes = {
        slideStatus: PropTypes.bool,
        switchSlideBar: PropTypes.func,
        searchBoxStatu: PropTypes.bool,
        switchSearchBox: PropTypes.func

    };

    constructor(props) {
        super(props);
        this.switchSlide = this.switchSlide.bind(this);
        this.openSearchBox = this.openSearchBox.bind(this);
    }

    componentDidUpdate() {
        document.body.className = this.props.slideStatus ? "slide-open" : "";
    }

    render() {
        return (
            <div className="m-navbar">
                <div className="m-navbar-search" onClick={this.openSearchBox}/>
                <div className="m-navbar-btn-menu" onClick={this.switchSlide}>
                    <div className="btn-menu-top">
                        <div className="top-rect"  />
                    </div>
                    <div className="btn-menu-center">
                        <div className="center-rect"  />
                    </div>
                    <div className="btn-menu-bottom">
                        <div className="bottom-rect"  />
                    </div>
                </div>
            </div>
        )
    }

    switchSlide() {
        let curSlideStatu = this.props.slideStatus;
        this.props.switchSlideBar(curSlideStatu);

    }

    openSearchBox() {
        this.props.switchSearchBox(true);
    }
}

const mapStateToProps = (state) => {
    return {
        slideStatus: state.appReducer.slideStatu ? state.appReducer.slideStatu : false
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({switchSlideBar,switchSearchBox}, dispatch)
};
MNavBar = connect(mapStateToProps, mapDispatchToProps)(MNavBar);
export default MNavBar;