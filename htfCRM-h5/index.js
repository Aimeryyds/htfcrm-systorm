import React from 'react';
import ReactDom from 'react-dom'
import { hashHistory, IndexRoute, Route, Router } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers/index'

import './src/resources/css/app.less'
import 'antd-mobile/dist/antd-mobile.css';

import routerConfig from './src/config/routerConfig'

export const store = createStore(reducer);

const routes = routerConfig;

ReactDom.render((
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>
), document.getElementById('J_app-pages'));

/**
 *
 */
 