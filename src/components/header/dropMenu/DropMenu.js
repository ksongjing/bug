import React from "react";
import PropTypes from "prop-types";
import arrowDown from "../../../assets/images/arrow-down.png";
import "./DropMenu.scss"
import _ from "lodash";

/***
 * @Author ChenLiheng
 * @Desc 头部切换语言下拉菜单组件
 * @Date 2018/7/20 20:13
 **/
class DropMenu extends React.Component {
    static propTypes = {
        languages: PropTypes.array,
        curLanguage: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {isDropMenuOn: false};
        this.dropMenuClick = this.dropMenuClick.bind(this);
        this.dropMenuItemClick = this.dropMenuItemClick.bind(this);
        this.dropMenuClose = this.dropMenuClose.bind(this);
    }

    componentDidMount() {
        document.onclick = this.dropMenuClose;
    }

    render() {
        const {languages, curLanguage} = this.props;
        let dropMenu = null;
        if (this.state.isDropMenuOn) {
            dropMenu = (<div className="dropdown-menu">
                {languages && languages.map(language => {
                    const {name, value} = language;
                    return (<div className="btn-option" onClick={(e) => this.dropMenuItemClick(value, e)}
                                 key={value}>{name}</div>)
                })}
            </div>);
        }
        return (
            <div className="btn-group dropup">
                <div className="btn-select" onClick={this.dropMenuClick}>
                    <div>{_.find(languages, {value: curLanguage}).name}</div>
                    <img className="icon-arrow" src={arrowDown} alt="icon-arrow"/>
                </div>
                {dropMenu}
            </div>
        );
    }

    dropMenuClose() {
        this.setState(preState => ({
            isDropMenuOn: false
        }));
    }

    dropMenuClick(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState(preState => ({
            isDropMenuOn: !preState.isDropMenuOn
        }));
    }

    dropMenuItemClick(val, e) {
        e.nativeEvent.stopImmediatePropagation();
        window.location.hash = "";
        window.location.search = `?lang=${val}`;
        this.setState(preState => ({
            isDropMenuOn: !preState.isDropMenuOn
        }));
    }
}
export default DropMenu;