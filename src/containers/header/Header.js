/**
 * 头部组件-header
 */
import React from "react";
import styles from "./Header.scss";
import logo from "../../assets/images/logo.png";
import iconUpload from "../../assets/images/icon-upload.svg";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import intl from 'react-intl-universal';
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MNavBar from "../../components/header/mNavbar/MNavBar";
import DropMenu from "../../components/header/dropMenu/DropMenu";
import SearchBox from "../../components/header/searchBox/SearchBox";
import _ from "lodash";

let cx = classNames.bind(styles);

class Header extends React.Component {
    static propTypes = {
        languages: PropTypes.array,
        curLanguage: PropTypes.string,
        history: PropTypes.object,
        bodyScroll: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {isScroll: false};
    }

    render() {
        const {languages, curLanguage} = this.props;
        let headerClassName = cx({
            "header": true,
            "no-shadow": !this.props.bodyScroll
        });
        return (
            <div className={headerClassName}>
                <div className="container header-container">
                    <Link className="logo" to="/"><img className="" src={logo} alt="Fair.Game"/></Link>
                    <SearchBox history={this.props.history}/>
                    <NavBar languages={languages} curLanguage={curLanguage} history={this.props.history}/>
                    <MNavBar/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bodyScroll: state.appReducer.bodyScroll ? state.appReducer.bodyScroll : false
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;

/***
 * @Author ChenLiheng
 * @Desc 头部导航条组件
 * @Date 2018/7/20 20:12
 **/
class NavBar extends React.Component {
    static propTypes = {
        languages: PropTypes.array,
        curLanguage: PropTypes.string,
        history: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {curNav: 0}
    }

    componentDidMount() {
        this.updateState();
        this.props.history.listen(() => {
            this.updateState();
        })
    }

    updateState() {
        let hash = window.location.hash;
        if (_.startsWith(hash, "#roadmap")) {
            this.setState({curNav: 1});
        } else if (_.startsWith(hash, "#support", 0)) {
            this.setState({curNav: 2});
        } else {
            this.setState({curNav: 0});
        }
    }

    render() {
        const {languages, curLanguage} = this.props;
        return (
            <div className="nav-bar">
                <NavBarLink selected={this.state.curNav === 0} name={intl.get("home")} to="/"/>
                <NavBarLink selected={this.state.curNav === 1} name={intl.get("roadMap")} to="/#roadmap"/>
                <NavBarLink name={intl.get("blog")} to="https://medium.com/@FairGameOnline" target="_blank"/>
                <NavBarLink name={intl.get("whitePaper")} to="https://fair.game/docs/whitepaper_cn.pdf"
                            target="_blank"/>
                <NavBarLink selected={this.state.curNav === 2} name={intl.get("support")} to="/#support"/>
                <div className="split-line"/>
                <NavBarLink name={intl.get("submitGame")} to="/dev"/>
                <div className="split-line"/>
                <DropMenu languages={languages} curLanguage={curLanguage}/>
            </div>
        );
    }
}

/***
 * @Author ChenLiheng
 * @Desc 头部导航组件
 * @Date 2018/7/20 20:13
 **/
class NavBarLink extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        to: PropTypes.string,
        target: PropTypes.string,
        selected: PropTypes.bool
    };

    render() {
        const {name, to, target, selected} = this.props;
        let navItemClass = cx({
            "nav-item": true,
            "nav-item-selected": selected
        });
        {/*<img src={iconUpload} alt=""/>*/}
        return (
            target ?
                (<a className={navItemClass} href={to} target={target} rel="noopener noreferrer">{name}</a>) :
                ((<Link className={navItemClass} to={to}>{name}</Link>))
        );
    }

}



