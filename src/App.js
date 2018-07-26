import React, {Component} from 'react';
import './App.scss';

import RouterOutlet from "./components/routerOutlet/RouterOutlet";
import Footer from "./components/footer/Footer";
import {loadLocalData, loadLanguageData} from "./actions/app.action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import BackTop from "./components/backTop/BackTop";
import {withRouter} from "react-router-dom";
import SlideBar from "./components/slideBar/SlideBar";
import Header from "./containers/header/Header";

class App extends Component {
    static propTypes = {
        languages: PropTypes.array,
        curLanguage: PropTypes.string,
        initDone: PropTypes.bool
    };

    componentDidMount() {
        this.props.loadLanguageData();
        this.props.loadLocalData();
    }

    render() {
        const {languages,curLanguage,initDone} = this.props;
        return (
            initDone &&
            <div className="App">
                <Header languages={languages} curLanguage={curLanguage} history={this.props.history}/>
                <div className="main-container">
                    <RouterOutlet/>
                    <Footer/>
                </div>
                <BackTop />
                <SlideBar history={this.props.history}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        initDone: state.appReducer.initDone ? state.appReducer.initDone : false,
        languages: state.appReducer.languages,
        curLanguage: state.appReducer.curLanguage
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadLanguageData, loadLocalData}, dispatch)
};
App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export default App;
