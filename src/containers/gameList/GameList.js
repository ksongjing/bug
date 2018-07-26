import React, {Component} from "react";
import "./GameList.scss";
import SubHeader from "../../components/subHeader/SubHeader";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {changeKey, getGameList, getSearchGames, resetGameList, resetSearchList, PAGE_NUM} from "../../actions/gameList.action";
import GamePanel from "../../components/gameList/gamePanel/GamePanel";
import intl from 'react-intl-universal';
import _ from "lodash"
import environment from '../../environments/environment'
import Empty from "../../components/empty/empty";


class GameList extends Component {
    static propTypes = {
        searchKey: PropTypes.string,
        curLanguage: PropTypes.string,
        totalItems: PropTypes.number,
        isSearchAction: PropTypes.bool,
        gameList: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            isSearchAction: false,
            lastSearchKey: '',
            curItems: 0
        };
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const { searchKey } = this.props;
        if ( typeof(searchKey) !== 'undefined' ) {
            this.props.getSearchGames(this.state.searchKey);
            this.setState( {isSearchAction: true, lastSearchKey: searchKey} );
        } else {
            this.props.getGameList(this.state.curItems);
            this.setState( {isSearchAction: false} );
        }
    }

    componentDidUpdate() {
        const { searchKey, gameList } = this.props;
        const { lastSearchKey, isSearchAction } = this.state;
        if ( typeof(searchKey) !== 'undefined' ) {
            if ( searchKey.length === 0 ) {
                this.props.changeKey(undefined);
                if ( !isSearchAction ){ this.setState( {isSearchAction: true}); }   // 务必判断，否则循环进来
                if ( lastSearchKey && lastSearchKey.length > 0 ) { this.setState( {lastSearchKey: ''}); }
                if ( gameList && gameList.length > 0 ) { this.props.resetSearchList(); }
            } else if ( lastSearchKey !== searchKey) {
                this.setState( {isSearchAction: true, lastSearchKey: searchKey} );
                this.props.getSearchGames(this.state.searchKey);
            }
        }
    }

    componentWillUnmount() {
        this.props.changeKey(undefined);    // 确保再次进来是undefined，否则引起if问题
        this.props.resetGameList();

    }

    loadMore() {
        if ( this.isDataEnded() ) {
            return ;    //  数据加载完成
        }

        this.setState({ curItems: this.state.curItems + PAGE_NUM }, () => {
            this.props.getGameList(this.state.curItems);
        });
    }

    isDataEnded() {
        const { totalItems } = this.props;
        const { curItems } = this.state;

        return totalItems && (curItems + PAGE_NUM >= totalItems);
    }

    isEmptyData() {
        const { gameList } = this.props;

        return !gameList || gameList.length === 0;
    }

    render() {
        const { curLanguage, gameList } = this.props;

        return (
            <div className="gamelist">
                <SubHeader title={this.state.isSearchAction ? intl.get("searchResult") : intl.get("gameList")}/>

                <Empty isEmpty={this.isEmptyData()} />
                <GamePanel isEmpty={this.isEmptyData()} items={gameList} curLanguage={curLanguage} />
                <div className="gamelist-loadmore" onClick={this.loadMore}
                     style={{display: this.state.isSearchAction || this.isDataEnded() || this.isEmptyData() ? 'none' : 'flex'}}>
                    加载更多
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchKey: state.gameListReducer.searchKey,
        gameList: formatData(state.gameListReducer.gameList),
        totalItems: state.gameListReducer.totalItems,
        curLanguage: state.appReducer.curLanguage
    }
};

const formatData = (data) => {
    if ( !data ) return [];

    for (let item of data) {
        if (!_.startsWith(item.icon, environment.serverHost)) {
            item.icon = environment.serverHost + item.icon;
        }
    }

    return data;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeKey, getGameList, getSearchGames, resetGameList, resetSearchList}, dispatch)
};
GameList = connect(mapStateToProps, mapDispatchToProps)(GameList);
export default GameList;