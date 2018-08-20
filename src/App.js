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
<<<<<<< HEAD
            <Route path="/change1" component={Main}/>

=======
            <Route path="/change" component={Change}/>
            <Route path="/loader-technical" component={LeaderTechnical}/>
>>>>>>> baf70071811d0f88276679b157c19a6fad909145
          </Switch>
        </Router>
    );
  }

}

export default App;
