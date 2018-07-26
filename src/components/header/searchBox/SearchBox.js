import {changeKey} from "../../../actions/gameList.action";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SearchBox.scss";
import {switchSearchBox} from "../../../actions/app.action";

let cx = classNames.bind(styles);

/***
 * @Author ChenLiheng
 * @Desc 头部搜索框组件
 * @Date 2018/7/20 20:12
 **/
class SearchBox extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        searchBoxStatu: PropTypes.bool,
        switchSearchBox: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {isFocus: false, isChange: false, value: ""};
        this.doFocus = this.doFocus.bind(this);
        this.doChange = this.doChange.bind(this);
        this.doEnter = this.doEnter.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.closeSearchBox = this.closeSearchBox.bind(this);
    }

    render() {
        let boxClass = cx({
            "searchbox": true,
            "searchbox-hidden": !this.props.searchBoxStatu
        });
        let containerClass = cx({
            "searchbox-container": true,
            "searchbox-focus": this.state.isFocus
        });

        let btnClass = cx({
            "searchbox-btn": true,
            "searchbox-btn-change": this.state.isChange

        });
        return (
            <div className={boxClass}>
                <div className={containerClass}>
                    <input className="searchbox-input"
                           value={this.state.value}
                           onFocus={this.doFocus}
                           onBlur={this.doFocus}
                           onChange={this.doChange}
                           onKeyPress={this.doEnter}/>
                    <div className={btnClass} onClick={this.doSearch}/>
                </div>
                <div className={cx({"btn-cancel":true,"searchbox-hidden": !this.props.searchBoxStatu})} onClick={this.closeSearchBox}>取消</div>
            </div>
        );
    }

    doFocus() {
        this.setState(preState => ({
            isFocus: !preState.isFocus
        }));
    }

    doChange(e) {
        let newValue = e.target.value;
        this.setState(preState => ({
            value: newValue
        }));
        this.setState(preState => ({
            isChange: newValue.length > 0
        }));
    }

    doEnter(e) {
        let keyCode = null;
        if (e.which)
            keyCode = e.which;
        else if (e.keyCode)
            keyCode = e.keyCode;
        if (keyCode === 13) {
            this.props.changeKey(this.state.value);
            this.doSearch();
            return false;
        }
        return true;
    }

    doSearch() {
        let searchKey = this.state.value;
        if (searchKey && searchKey.length > 0) {
            this.props.history.push("/search/" + searchKey);
        }
    }

    closeSearchBox() {
        this.props.switchSearchBox(false);
    }
}

const mapStateToProps = (state) => {
    return {
        searchBoxStatu: state.appReducer.searchBoxStatu ? state.appReducer.searchBoxStatu: false
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeKey,switchSearchBox}, dispatch)
};
SearchBox = connect(mapStateToProps, mapDispatchToProps)(SearchBox);
export default SearchBox;