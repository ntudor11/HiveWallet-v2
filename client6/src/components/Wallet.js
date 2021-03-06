import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {NavLink } from "react-router-dom";
import Navbar from '../components/Navbar';
import BitcoinLogo from '../images/icons/bitcoin-logo.svg';
import jwt_decode from 'jwt-decode';

var Chance = require('chance');

var chance = new Chance();

class Wallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallet_name: '',
      public_key: '',
      balance_btc: '',
      reg_date: '',
      transaction_time: '',
      transactions: [],
      btc_data: {},
      coinmarket: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      wallet_name: decoded.wallet_name,
      public_key: decoded.public_key,
      balance_btc: decoded.balance_btc,
      reg_date: decoded.reg_date,
      transaction_time: decoded.transaction_time
    }, () => {
      let self = this;
      fetch('http://localhost:5000/wallets/walletslist', {
          method: 'GET'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({transactions: data});
      }).catch(err => {
      console.log('caught it!',err);
      })
      fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(data => data.json())
      .then(data => {
        this.setState({
          btc_data: data
        })
      })
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(data => data.json())
      .then(data => {
        this.setState({
          coinmarket: data
        })
      });
      console.log("should work");
      console.log(this.state.wallet_name);
    })
  }

  ageCalculator() {
    var currentDate = new Date().getTime() / 1000; // UNIX time
    // var demoReg = new Date('Dec 08 2019 14:00:00').getTime() / 1000;
    var regDate = new Date(this.state.reg_date).getTime() / 1000; // UNIX time
    var diff = (currentDate - regDate);
    if (diff <= 3600) {
      return (diff / 60).toFixed(0) + " minutes"
    } else if (diff <= 84600) {
      return (diff / 3600).toFixed(2) + " hours"
    } else if (diff <= 604800) {
      if (diff >= 84600 && diff <= 172800) {
        return (diff / 84600).toFixed(0) + " day"
      } else {
        return (diff / 84600).toFixed(0) + " days"
      }
    } else if (diff <= 2629743.83) {
      return (diff / 604800).toFixed(2) + " weeks"
    } else if (diff <= 31556926) {
      return (diff / 2629743.83).toFixed(2) + " months"
    } else {
      return (diff / 31556926).toFixed(2) + " years"
    }
  }

  getCurrentValue() {
    const currentBtcValue = this.state.coinmarket.bpi && parseFloat(this.state.coinmarket.bpi.USD.rate.replace(/,/g, '')).toFixed(2);
    return currentBtcValue;
  }

  getValueChange() {
    var valuesArray = [];
    for (var key in this.state.btc_data.bpi) {
      var value = this.state.btc_data.bpi[key];
      valuesArray.push(value)
    }
    var penultimateValue = valuesArray[valuesArray.length-2];
    var diff = (this.getCurrentValue()*this.state.balance_btc - penultimateValue*this.state.balance_btc);
    return diff.toFixed(2);
  }

  btcToUsd() {
    // const convertToUsd = (priceCharts.getLatestBtc() * this.state.balance_btc);
    return (this.getCurrentValue() * this.state.balance_btc);
  }

  formatCash = n => {
    if (n < 1e5) return n.toFixed(2);
    if (n >= 1e5 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
    // if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  }

  render() {
    return (
      <Container fluid className="h-100">
        <Row>
          <Navbar/>
          <Col sm={9} className="content">
            <Row>
              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder">
                  <p className="walletKpiName">24h Change</p>
                  <h3 className="walletKpiValue">$ {this.getValueChange()}</h3>
                </div>
              </Col>

              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder">
                  <p className="walletKpiName">Best 24h Growth</p>
                  <h3 className="walletKpiValue">$ {chance.floating({min:1250.24, max:1442.41}).toFixed(2)}</h3>
                </div>
              </Col>

              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder kpiHolder-last">
                  <p className="walletKpiName">Portfolio Age</p>
                  <h3 className="walletKpiValue">{this.ageCalculator()}</h3>
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={4}></Col>
              <Col sm={4}>
                <h3> {this.state.wallet_name}</h3>
                <img src={BitcoinLogo} alt="bitcoin-logo"/>
                <div className="balanceContainer">
                  <h2 className="btcBalance">{this.state.balance_btc} BTC</h2>
                  <h4 className="btcBalanceUSD">$ {this.formatCash(this.btcToUsd())}</h4>
                </div>
              </Col>
              <Col sm={4}></Col>
            </Row>

            <Row className="colsButtons" style={{marginTop:"2em"}}>
              <Col sm={2}></Col>

              <Col sm={4}>
                <NavLink exact to="/transactions">
                  <Button type="submit" block variant="primary">Receive</Button>
                </NavLink>
              </Col>

              <Col sm={4}>
                <NavLink exact to="/transactions">
                  <Button block variant="outline-primary">Send</Button>
                </NavLink>
              </Col>

              <Col sm={2}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Wallet;
