import React from "react";
import "./RouterOutlet.scss";
import {Route, Switch} from "react-router-dom";
import Page404 from "../../containers/404/Page404";
import Developer from "../../containers/developer/Developer";
import GameDetail from "../../containers/gameDetail/GameDetail";
import GameList from "../../containers/gameList/GameList";
import Home from "../../containers/home/Home";

class RouterOutlet extends React.Component {
    render() {
        return (
            <div className="RouterOutlet">
                <Switch>
                    <Route path="/search/:key" component={GameList}/>
                    <Route path="/list" component={GameList}/>
                    <Route path="/detail/:id" component={GameDetail}/>
                    <Route path="/dev" component={Developer}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={Page404}/>
                </Switch>
            </div>
        );
    }
}

export default RouterOutlet;
