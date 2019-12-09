import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {NavLink } from "react-router-dom";
import Navbar from '../components/Navbar';
import BitcoinLogo from '../images/icons/bitcoin-logo.svg';
import jwt_decode from 'jwt-decode'

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
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      wallet_name: decoded.wallet_name,
      public_key: decoded.public_key,
      balance_btc: decoded.balance_btc,
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
      console.log("should work");
      console.log(this.state.wallet_name);
    })
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
                  <h3 className="walletKpiValue">$ -247.45</h3>
                </div>
              </Col>

              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder">
                  <p className="walletKpiName">Best 24h Growth</p>
                  <h3 className="walletKpiValue">$ +971.32</h3>
                </div>
              </Col>

              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder kpiHolder-last">
                  <p className="walletKpiName">Portfolio Age</p>
                  <h3 className="walletKpiValue">1.2y</h3>
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={4}></Col>
              <Col sm={4}>
                <img src={BitcoinLogo} alt="bitcoin-logo"/>
                <div className="balanceContainer">
                  <h2 className="btcBalance">3.4721 BTC</h2>
                  <h4 className="btcBalanceUSD">$ 24,748.25</h4>
                </div>
              </Col>
              <Col sm={4}></Col>
            </Row>

            <Row className="colsButtons" style={{marginTop:"2em"}}>
              <Col sm={2}></Col>

              <Col sm={4}> {/* TODO Remove following navlink*/}
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
