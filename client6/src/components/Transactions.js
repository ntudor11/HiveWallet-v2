import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Switch from "react-switch";
// import {NavLink } from "react-router-dom";
import Navbar from '../components/Navbar';
import { FiCopy } from "react-icons/fi"
import jwt_decode from 'jwt-decode';

var qr = require('qr-encode');

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.holderRef = React.createRef()
    this.state = {
      wallet_name: '',
      public_key: '',
      balance_btc: '',
      reg_date: '',
      sendBtc: '',
      transaction_time: '',
      transactions: [],
      btc_data: {},
      coinmarket: [
        {
          price_usd: '',
          market_cap_usd: ''
        }
      ],
      checked: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      wallet_name: decoded.wallet_name,
      public_key: decoded.public_key,
      balance_btc: decoded.balance_btc,
      reg_date: decoded.reg_date
    }, () => {
      fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => res.json())
      .then(json => {
        this.setState({
          btc_data: json
          // data.labels:
        })
      })
      fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
      .then(data => data.json())
      .then(data => {
        this.setState({
          coinmarket: data
        })
      });
    })
  }

  viewPublicKey() {
    var dataURI = qr(this.state.public_key, {type: 6, size: 6, level: 'M'});
    return dataURI;
  }

  getCurrentPrice() {
    var currentPrice = this.state.coinmarket[0].price_usd;
    return currentPrice;
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

  btcToUsd() {
    // const convertToUsd = (priceCharts.getLatestBtc() * this.state.balance_btc);
    return (this.getCurrentPrice() * this.state.sendBtc);
  }

  copyText(stateComponent) {
    navigator.clipboard.writeText(stateComponent);
  }
  //
  demo() {
    var errorLogin = "<p>Wrong credentials. Please check for errors.</p>"
    var errorPlaceholder = document.getElementById('error-placeholder');
    errorPlaceholder.innerHTML += errorLogin;
  }

  // copyText() {
    // navigator.clipboard.writeText(this.state.public_key);
    // document.getElementById("copyplaceholder").innerHTML = "You copied text!"
  // }

  render() {
    return (
      <Container fluid className="h-100">
        <Row>
          <Navbar/>
          <Col sm={9} className="content">

            <label style={{marginTop:"2em", marginBottom:"6em"}}>
            {this.state.checked ? <span style={{color:"grey"}}>Receive</span> : <span style={{color:"#fff", fontFamily:"josefinSansRegular"}}>Receive</span>}
            <Switch
              checked={this.state.checked}
              onChange={this.handleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            /> {this.state.checked ? <span style={{color:"#fff", fontFamily:"josefinSansRegular"}}>Send</span> : <span style={{color:"grey"}}>Send</span>}
            </label>

            <div className="switch-type">
              {this.state.checked ?
              <div className="transactionSend">
              <Form
                style={{width:"60%", margin:"1em auto"}}
                onSubmit={this.onSubmit}
              >
                <Form.Group className="formTemplate" controlId="exampleForm.ControlSelect3">
                  <Form.Group controlId="formSendTransaction">
                    <Form.Control type="text" placeholder="Send to address / Wallet ID"/>
                  </Form.Group>

                  <Form.Group controlId="formSendBtc" className="formSendBtc">
                    <Form.Label>Value (BTC)</Form.Label>
                    <Form.Control
                      type="number"
                      name="sendBtc"
                      placeholder="Value (BTC)"
                      onChange={this.onChange}
                      value={this.state.sendBtc}
                      />
                  </Form.Group>

                  <Form.Group controlId="formSendUsd">
                    <Form.Label>Value (USD)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Value (USD)"
                      onChange ={this.onChange}
                      value={this.btcToUsd()}
                      />
                  </Form.Group>

                    <Row className="colsButtons">

                      <Col sm={12} className="demoHolder">
                        <Button
                          type="submit"
                          variant="primary">Send Payment
                        </Button>
                        <span className="tooltiptext">This feature is coming soon. </span>
                      </Col>
                    </Row>
              </Form.Group>
            </Form>
              </div>
                 :
              <div className="transactionReceive" ref={this.holderRef}>
                <p style={{fontFamily:"josefinSansRegular"}}>Your Public Key:</p>
                <img src={this.viewPublicKey()} alt="qrcode-wallet-address" style={{width:"200px", border:"10px solid white"}}/>
                <Form style={{width:"60%", margin:"1em auto"}}>
                  <Form.Group className="formTemplate" controlId="exampleForm.ControlSelect4">

                    <Form.Group controlId="formBtcAddress">
                      <Form.Control type="text" placeholder="" defaultValue={this.state.public_key} readOnly/>
                      <Button
                        className="copy"
                        id="togglePassBtn"
                        onClick={() => {navigator.clipboard.writeText(this.state.public_key).then(
                          () => {
                            var copied = "<p>Copied to clipboard</p>";
                            var copiedPlaceholder = this.myRef.current;
                            copiedPlaceholder.innerHTML += copied;
                          }).then(() => {
                            setTimeout( () => {
                              this.myRef.current.remove();
                            }, 1000)
                          })
                        }
                      }
                      >
                        <FiCopy/>
                      </Button>
                    </Form.Group>
                </Form.Group>
              </Form>
              <div className="copy-placeholder" ref={this.holderRef}>
                <p className="hideMe" ref={this.myRef}></p>
              </div>
            </div>
            }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Transactions;
