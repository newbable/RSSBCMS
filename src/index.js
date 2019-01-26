import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import App from './App';
import {Login} from './pages'

ReactDOM.render(
<Router>
    <Switch>
        <Route path="/admin" component={App}/>
        <Route path="/login" component={Login}/>
        <Redirect to="/admin" from="/" exact/>
        <Redirect to="/admin/404"/>
    </Switch>
</Router>,
document.getElementById('root'));
