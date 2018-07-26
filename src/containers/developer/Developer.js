import React, { Component } from 'react';
import './Developer.scss';
import intl from 'react-intl-universal';
import SubmitGame from '../../components/subHeader/SubHeader';
import FormGame from '../../components/developer/formGame/FormGame';
// import _ from "lodash";
// import {getIndexData, getRoadMapData} from "../../actions/home.action";
// import {bindActionCreators} from "redux/index";
// import environment from "../../environments/environment";

class Developer extends Component {
    render() {
        return (
            <div className="Developer">
                <div className="Developer-title">
                    <SubmitGame title={intl.get("submitGame")}></SubmitGame>
                    <FormGame></FormGame>
                </div>
            </div>
        );
    }
}
export default Developer;