import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './page/main/main'
import Change from './layout/change/change'

import './App.css';

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path="/change1" component={Main}/>

          </Switch>
        </Router>
    );
  }

}

export default App;
