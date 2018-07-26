import React, {Component} from 'react';
import "./BackTop.scss"
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updateBodyScroll} from "../../actions/app.action";

class BackTop extends Component {
    static propsType = {
        bodyScroll: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.backToTop = this.backToTop.bind(this);
    }

    componentDidMount() {
        window.onscroll = () => {
            const t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t <= 0) {
                this.props.updateBodyScroll(false);
            } else {
                if (!this.props.bodyScroll) {
                    this.props.updateBodyScroll(true);
                }
            }
            const backtop_view = document.getElementById("backtop");
            if (backtop_view !== null) {
                backtop_view.style.display = t >= 100 ? 'block' : 'none';
            }
        };
    }

    render() {
        return (
            <div id="backtop" className="backtop" onClick={this.backToTop} />);
    }

    backToTop() {
        window.scrollTo(0,0)
    }
}

const mapStateToProps = (state) => {
    return {
        bodyScroll: state.appReducer.bodyScroll ? state.appReducer.bodyScroll : false
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateBodyScroll}, dispatch)
};
BackTop = connect(mapStateToProps,mapDispatchToProps)(BackTop);

export default BackTop;