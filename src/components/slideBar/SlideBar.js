import React from "react";
import "./SlideBar.scss"
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {switchSlideBar} from "../../actions/app.action";
import {connect} from "react-redux";

class SlideBar extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        switchSlideBar: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.toHome = this.toHome.bind(this);
        this.toBlog = this.toBlog.bind(this);
        this.toWhitePaper = this.toWhitePaper.bind(this);
        this.toChinese = this.toChinese.bind(this);
        this.toEnglish = this.toEnglish.bind(this);
    }

    render() {
        return (
            <div className="slidebar">
                <ul>
                    <li onClick={this.toHome}>首页</li>
                    <li onClick={this.toBlog}>博客</li>
                    <li onClick={this.toWhitePaper}>白皮书</li>
                    <li onClick={this.toChinese}>中文</li>
                    <li onClick={this.toEnglish}>English</li>
                </ul>
            </div>
        );
    }

    toHome() {
        this.props.switchSlideBar(true);
        if (this.props.history.location.pathname !== "/") {
            this.props.history.push("/")
        }
    }

    toBlog() {
        this.props.switchSlideBar(true);
        window.open("https://medium.com/@FairGameOnline","_blank");
    }

    toWhitePaper() {
        this.props.switchSlideBar(true);
        window.open("https://fair.game/docs/whitepaper_cn.pdf","_blank");
    }

    toChinese() {
        this.props.switchSlideBar(true);
        window.location.hash = "";
        window.location.search = `?lang=zh_CN`;
    }

    toEnglish() {
        this.props.switchSlideBar(true);
        window.location.hash = "";
        window.location.search = `?lang=en-US`;
    }
}

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({switchSlideBar}, dispatch)
};
SlideBar = connect(mapStateToProps,mapDispatchToProps)(SlideBar);
export default SlideBar;