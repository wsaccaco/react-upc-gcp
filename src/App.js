import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Main from './page/main/main.js'

import './App.css';

class App extends Component {

  render() {
      console.log("soy weon")
    return (
        <Router>
          <Route exact path="/main" component={Main}/>
        </Router>
    );
  }

}

export default App;
