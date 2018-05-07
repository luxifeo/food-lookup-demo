import React, { Component } from "react";
import "./App.css";
import {Route, Switch} from 'react-router-dom';
import Home from './component/Home';
import Admin from './component/Admin';
class App extends Component {
  
  render() {
    return (
      <div className="App container">
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route path='/' component={Home} />
      </Switch>
      </div>
    )
  }
}

export default App;
