import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo-hive.svg';
import InfoWhite from '../images/icons/information-white.svg';
import {NavLink } from "react-router-dom";
var CoinKey = require('coinkey');

class SignUpFirst extends Component {

  // continue = e => {
  //   e.preventDefault;
  //   this.props.nextStep();
  // }

  constructor(props) {
    super(props);
    this.state = {
      walletName: '',
      publicAddress: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      walletName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.walletName.length <= 3) {
      console.log("The wallet name needs to have a minimum of 4 characters!");
      alert(`The wallet name needs to have a minimum of 4 characters!`);
    } else {
      var ck = new CoinKey.createRandom();

      document.location.href = "/signup-second";
      alert(`Your new wallet name is: ${this.state.walletName} and its public address is ` + ck.publicAddress);
      console.log(`New Wallet Name: ${this.state.walletName}`);
      console.log("Private Key (Wallet Import Format): " + ck.privateWif);
      console.log("Private Key (Hex): " + ck.privateKey.toString('hex'));
      console.log("Public Address: " + ck.publicAddress);
    }
  }

  render() {
    const { values, handleChange } = this.props;

    return (
      <Container fluid className="h-100">
        <Row>
          <Col className="content loginsignup">
            <Row className="logoContainer">
              <Col sm={12}>
                <img src={logo} className="logoFront" alt="Hive logo"/>
              </Col>
            </Row>
            <Row>
              <Col sm={3} lg={4}></Col>
              <Col sm={6} lg={4}>
                <Alert variant="info">
                  <Row>
                    <Col className="d-flex align-items-center" sm={2}>
                      <img className="infoIcon" src={InfoWhite} alt="info"/>
                    </Col>

                    <Col sm={10}>
                      <Alert.Heading className="alertHeading" >Wallet Name</Alert.Heading>
                      <p>This will be the name of the file that will store the wallet keys and the containing data.</p>
                    </Col>
                  </Row>
                </Alert>

                <Form noValidate onSubmit={this.handleSubmit}>
                  <Form.Group className="formTemplate" controlId="formNewWallet">

                    <Form.Control type="text" value={this.state.walletName} placeholder="Enter Wallet Name" onChange={this.handleChange} />

                    <Row className="colsButtons">
                      <Col sm={6}>
                        <NavLink exact to="/">
                          <Button block variant="outline-primary">Back</Button>
                        </NavLink>
                      </Col>

                      <Col sm={6}>
                        <Button type="submit" block variant="primary">Next</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={3} lg={4}></Col>
            </Row>
            <Row className="colsButtons">
              <Col sm={3} lg={4}></Col>
              <Col sm={6} lg={4}>

              </Col>
              <Col sm={3} lg={4}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SignUpFirst;
