import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Switch from "react-switch";
import {NavLink } from "react-router-dom";
import Navbar from '../components/Navbar';

var qr = require('qr-encode');
var publicAddress = "13xqbGCStztjRsEAZHbMAw82SRdQvyUT1t";
var dataURI = qr(publicAddress, {type: 6, size: 6, level: 'M'});

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }


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
              <Form style={{width:"60%", margin:"1em auto"}}>
                <Form.Group className="formTemplate" controlId="exampleForm.ControlSelect3">
                  <Form.Group controlId="formSendTransaction">
                    <Form.Control type="text" placeholder="Send to address"/>
                  </Form.Group>

                  <Form.Group controlId="formSendBtc" className="formSendBtc">
                    <Form.Control type="number" placeholder="Value (BTC)"/>
                  </Form.Group>

                  <Form.Group controlId="formSendUsd">
                    <Form.Control type="number" placeholder="Value (USD)"/>
                  </Form.Group>

                    <Row className="colsButtons">

                      <Col sm={12}> {/* TODO Remove following navlink*/}
                        <NavLink exact to="/transactions">
                          <Button type="submit"  variant="primary">Send Payment</Button>
                        </NavLink>
                      </Col>
                    </Row>
              </Form.Group>
            </Form>
              </div>
                 :
              <div className="transactionReceive">
                <p style={{fontFamily:"josefinSansRegular"}}>Your BTC Address:</p>
                <img src={dataURI} alt="qrcode-wallet-address" style={{width:"200px", border:"10px solid white"}}/>
                <Form style={{width:"60%", margin:"1em auto"}}>
                  <Form.Group className="formTemplate" controlId="exampleForm.ControlSelect4">

                    <Form.Group controlId="formBtcAddress">
                      <Form.Control type="text" placeholder="13xqbGCStztjRsEAZHbMAw82SRdQvyUT1t"defaultValue={publicAddress} readOnly/>
                    </Form.Group>
                </Form.Group>
              </Form>
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
