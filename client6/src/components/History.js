import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar';
import BitcoinLogo from '../images/icons/bitcoin-logo.svg'
import jwt_decode from 'jwt-decode';
import Timestamp from 'react-timestamp';

var randomstring = require("randomstring");

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      wallet_name: '',
      public_key: '',
      balance_btc: '',
      reg_date: '',
      transaction_time: '',
      transactions: [],
      wallets: [],
      btc_data: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id: decoded.id,
      wallet_name: decoded.wallet_name,
      public_key: decoded.public_key,
      balance_btc: decoded.balance_btc,
      reg_date: decoded.reg_date,
      transaction_time: decoded.transaction_time,
    }, () => {
      let self = this;
      fetch('http://localhost:5000/transactions/transactions', {
        method: 'GET'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState((prevState) => ({
            id: prevState.id,
            transactions: data.filter(item =>
              item.sender_id === prevState.id |
              item.receiver_id === prevState.id
            )
        }));
      }).catch(err => {
      console.log('caught it!',err);
      })
      fetch('http://localhost:5000/wallets/walletslist', {
          method: 'GET'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({wallets: data});
          console.log(self.state.wallets)
      })
      fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(data => data.json())
      .then(data => {
        this.setState({
          btc_data: data
        })
      })
      console.log("should work");
    })
  }

  walletIdToName() {
    const walletItem = this.state.wallets.map(function(wallet) {
      return {
        wallet_name: wallet.wallet_name,
        id: wallet.id
      }
    });

    var transactionItem = this.state.transactions.map(function(trans) {
      return {
        sender_id: trans.sender_id,
        receiver_id: trans.receiver_id
      }
    });

    const dict = {transactionItem: walletItem}
    console.log(dict)
    return dict;
  }

  matchId(transactionerId) { // TODO if have time
    var data = this.walletIdToName();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key]
        if (value === transactionerId) {
          console.log(value);
          return value;
        }
      }
    }
  }

  getLatestBtc() { // returns the newest value
    var lastProp;
    for (var key in this.state.btc_data.bpi) {
      if(this.state.btc_data.bpi.hasOwnProperty(key)) {
        lastProp = this.state.btc_data.bpi[key];
        // console.log(key+ " " + firstProp);
      }
    }
    return lastProp;
  }

  render() {
    this.walletIdToName();

    const btcToUsd = (amountBtc, btcValue = this.getLatestBtc()) => {
      return (amountBtc * btcValue);
    }

    const transactionItem = this.state.transactions.map(transaction =>
      <tr className="transactionRow" key={transaction.id}>
        <td>{randomstring.generate({
          length: 4,
          charset: 'alphanumeric'
        })}...</td>
        <td>
            <span>{transaction.sender_id} { this.state.id === transaction.sender_id ? <strong>
              {this.matchId(this.state.id)}
              {/*this.state.wallet_name*/} (Me)</strong> : ''}</span>
        </td>

        <td>
          { this.state.id !== transaction.receiver_id ?
            <span>Sent To</span> : <span>Received From</span>
          }
        </td>

        <td>
            <span>{transaction.receiver_id} { this.state.id === transaction.receiver_id ? <strong>(Me)</strong> : ''}</span>
        </td>

        <td><Timestamp options={{twentyFourHour: true}} date={transaction.transaction_time} /></td>
        <td>₿ {transaction.amount_btc} / <br/>$  {btcToUsd(transaction.amount_btc)}</td>
      </tr>
    )

    return (
      <Container fluid className="h-100">
        <Row>
          <Navbar/>
          <Col sm={9} className="content">
            <Row style={{marginTop:"2em", marginBottom:"2em"}}>
              <Col sm={4}></Col>
              <Col sm={4}>
                <img src={BitcoinLogo} alt="bitcoinLogo"/>
              </Col>
              <Col sm={4}></Col>
            </Row>
            <Row>
              <Col sm={12} className="align-items-center">
                <table className="transactionsTable">
                  <thead className="tableHeader">
                      <tr>
                          <th>Hash</th>
                          <th>From Wallet ID</th>
                          <th>Type</th>
                          <th>To Wallet ID</th>
                          <th>Timestamp</th>
                          <th>Value (BTC/USD)</th>
                      </tr>
                  </thead>
                  <tbody>

                    {transactionItem}
                  </tbody>
                </table>

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default History;
