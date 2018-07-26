import React, { Component } from 'react';
import './GameContent.scss';
import PropTypes from 'prop-types';
import DetailSlider from "../../../components/gameDetail/detailSlider/DetailSlider";
import TitleLine from "../titleLine/TitleLine";

class GameContent extends Component {

    static propTypes = {
        title: PropTypes.string,
        titleContent: PropTypes.string,
        description: PropTypes.object,
        items:  PropTypes.array,
    };

    isZhCn() {
        const { curLanguage } = this.props;
        return curLanguage === 'zh_CN';
    }

    getValue(key){
        if ( !key || !key.zh || !key.en) { return '--'; }

        return this.isZhCn() ? key.zh : key.en;
    }

    render() {

        const { title, titleContent, description, items } = this.props;
        return (
            <div className="gamecontent">
                <TitleLine title={title}/>
                <DetailSlider items={items} />

                <TitleLine title={titleContent}/>
                <div className="gamecontent-container gamecontent-descpt">
                    <div dangerouslySetInnerHTML={{__html: this.getValue(description)}} />
                </div>
            </div>
        );
    }
}

export default GameContent;