import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar';
import BitcoinLogo from '../images/icons/bitcoin-logo.svg'
import jwt_decode from 'jwt-decode';
import Timestamp from 'react-timestamp';

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
          method: 'GET' // TODO change to MY transactions when it works
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
      console.log("should work");
      console.log(this.state.wallet_name);
    })
  }

  getLatestBtc() { // returns the oldest value
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

    const btcToUsd = (amountBtc, btcValue = this.getLatestBtc()) => {
      return (amountBtc * btcValue);
    }

    const transactionItem = this.state.transactions.map(transaction =>
      <tr key={transaction.id}>
        <td>d3m0...</td>
        <td>
          { this.state.id !== transaction.receiver_id ?
            <span>Sent To</span> : <span>Received From</span>
          }
        </td>
        <td>
          { this.state.id !== transaction.receiver_id ?
            <span>d3m0AdDr3sS / {transaction.receiver_id}</span> : <span>d3m0AdDr3sS / {transaction.sender_id}</span>
          }
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
                          <th>Type</th>
                          <th>Address / Wallet ID</th>
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
