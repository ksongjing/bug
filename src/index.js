import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {defState, reducers} from "./reducers";
import {applyMiddleware, createStore} from "redux";
import {logger} from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(
    reducers,
    defState,
    applyMiddleware(thunk, logger)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
