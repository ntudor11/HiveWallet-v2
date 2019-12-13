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
      coinmarket: [
        {
          price_usd: '',
          market_cap_usd: ''
        }
      ]
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
      })

      fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
      .then(data => data.json())
      .then(data => {
        this.setState({
          coinmarket: data
        })
      });
      console.log("should work");
    })
  }

  walletIdToName() { // first part of viewing transactioning wallet ID as wallet name
    const walletItem = this.state.wallets.map(function(wallet) {
      return {
        wallet_name: wallet.wallet_name,
        id: wallet.id
      }
    });

    // eslint-disable-next-line
    var transactionItem1 = this.state.transactions.map(function(trans) {
      return {
        sender_id: trans.sender_id,
        receiver_id: trans.receiver_id
      }
    });

    const dict = {transactionItem1: walletItem}
    console.log(dict.transactionItem1)
    return dict.transactionItem1;
  }

  matchId(transactionerId) {
    var data = this.walletIdToName();
    console.log(transactionerId);
    var value;
    var BreakException= {};

    try {
      data.forEach((wallet) => {
        value = wallet.wallet_name;
        var key = wallet.id;
        if (key === transactionerId) {
          console.log(value + " it works!!!");
          throw BreakException;
        } else (
          console.log("cannot find wallet")
        )
      })
    } catch(e) {
      if (e!==BreakException) throw e;
    }

    return value;
  }

  getCurrentPrice() {
    var currentPrice = this.state.coinmarket[0].price_usd;
    return (+(currentPrice)).toFixed(2);
  }

  render() {
    const btcToUsd = (amountBtc, btcValue = this.getCurrentPrice()) => {
      return (amountBtc * btcValue).toFixed(2);
    }

    const transactionItem = this.state.transactions.map(transaction =>
      <tr className="transactionRow" key={transaction.id}>
        <td>{randomstring.generate({
          length: 4,
          charset: 'alphanumeric'
        })}...</td>
        <td>
            {this.matchId(transaction.sender_id)} { this.state.id === transaction.sender_id ?
               <strong>

              {/*this.state.wallet_name*/} (Me)</strong> :
              ''
            }
        </td>

        <td>
            <span>{this.matchId(transaction.receiver_id)} { this.state.id === transaction.receiver_id ? <strong>(Me)</strong> : ''}</span>
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
                          <th>Sender</th>
                          <th>Receiver</th>
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
