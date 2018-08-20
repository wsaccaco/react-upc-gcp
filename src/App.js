import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LeaderTechnical from './page/leaderTechnical/LeaderTechnical'
import Change from './layout/change/change'

import './App.css';

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path="/change" component={Change}/>
            <Route path="/loader-technical" component={LeaderTechnical}/>
          </Switch>
        </Router>
    );
  }

}

export default App;
