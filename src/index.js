import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import App from './App';
import {Login,NotFound} from './pages'

import store from './store'

import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
console.log(store)
ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/admin" component={App}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/404" component={NotFound}/>
                    <Redirect to="/admin" from="/" exact/>
                    <Redirect to="/admin/404"/>
                </Switch>
            </Router>
        </LocaleProvider>
    </Provider>,
document.getElementById('root'));
