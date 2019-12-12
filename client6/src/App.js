import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wallet from './components/Wallet';
import PriceCharts from './components/PriceCharts';
import History from './components/History';
import Transactions from './components/Transactions';
import Settings from './components/Settings';
import LogSignIn from './components/LogSignIn';
import LoginFirst from './components/LoginFirst';
import LoginSecond from './components/LoginSecond';
import SignupForm from './components/SignupForm';
// import SignUpFirst from './components/SignUpFirst';
// import SignUpSecond from './components/SignUpSecond';
// import SignUpThird from './components/SignUpThird';
// import SignUpFourth from './components/SignUpFourth';
// import SignUpFifth from './components/SignUpFifth';
// import SignUpSixth from './components/SignUpSixth';
import NoMatch from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/" component={LogSignIn}/>
              <Route exact path="/signup-form" component={SignupForm}/>
              <Route exact path="/login-first" component={LoginFirst}/>
              <Route exact path="/login-second" component={LoginSecond}/>
              <Route exact path="/dashboard" component={Wallet}/>
              <Route exact path="/price-charts" component={PriceCharts}/>
              <Route exact path="/history" component={History}/>
              <Route exact path="/transactions" component={Transactions}/>
              <Route exact path="/settings" component={Settings}/>
              <Route component={NoMatch} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
