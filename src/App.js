import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import routes from './routes'


import {AppFrame} from './components'

class App extends Component {
  render() {
    return ( 
      <AppFrame>
        <Switch>
          {
            routes.map(route=>{
              return <Route
              key={route.path}
              path={this.props.match.path+route.path}
              component={route.component}/>
            })
          }
          <Redirect to={this.props.match.path+routes[0].path} from="/admin" exact/>
          <Redirect to={this.props.match.path+"/404"}/>
        </Switch>
      </AppFrame>
    );
  }
}

export default App;
