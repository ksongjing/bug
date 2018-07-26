import React, {Component} from 'react';
import styles from './GameBox.scss';
import PropTypes from "prop-types";
import classNames from 'classnames/bind';
import LazyLoad from 'react-lazyload';
import {CSSTransitionGroup} from "react-transition-group";

let cx = classNames.bind(styles);

class GameBox extends Component {
    static propTypes = {
        showFloat: PropTypes.bool,
        index: PropTypes.number,
        item: PropTypes.shape({
            content: PropTypes.string,
            picture: PropTypes.string,
            title: PropTypes.string,
            url: PropTypes.string,
        })
    };

    render() {
        const {showFloat, index, item} = this.props;
        const {content, picture, title, url} = item;
        let gameBoxClassName = cx({
            "gamebox": true,
            "no-marging-right": (index + 1) % 4 === 0,
            "mobile-no-marging": (index + 1) % 2 === 0
        });
        return (
            <a className={gameBoxClassName} href={url} target="_blank" rel="noopener noreferrer">
                <div className="gamebox-top">
                    <LazyLoad throttle={200} height={161}>
                        <CSSTransitionGroup
                            key="1"
                            transitionName="fade"
                            transitionAppear
                            transitionAppearTimeout={500}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <img src={picture} alt={title}/>
                        </CSSTransitionGroup>
                    </LazyLoad>
                    {
                        showFloat ? (<div className="gamebox-float"><span>{title}</span></div>) : (<div/>)
                    }
                </div>
                {
                    !showFloat ? (<div>
                        <div className="gamebox-name">{title}</div>
                        <div className="gamebox-desc">{content}</div>
                    </div>) : (<div/>)
                }
            </a>
        );
    }
}

export default GameBox;