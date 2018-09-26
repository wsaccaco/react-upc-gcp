import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LeaderTechnical from './page/leaderTechnical/LeaderTechnical'
import PlanningRisk from './page/planningRisk/PlanningRisk'
import Change from './layout/change/change'
import Modules from './page/main/main.jsx'

import './App.css';

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>

            <Route path="/change" component={Change}/>
            <Route path="/loader-technical/:id" component={LeaderTechnical}/>
            <Route path="/planning-risk" component={PlanningRisk}/>
            <Route path="/modules" component={Modules}/>
          </Switch>
        </Router>
    );
  }

}

export default App;
