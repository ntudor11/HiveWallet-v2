import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo-hive.svg';
import InfoWhite from '../images/icons/information-white.svg';
import { AiOutlineEyeInvisible } from "react-icons/ai"
import {register} from './UserFunctions';
var CoinKey = require('coinkey');

class SignUpSeventh extends Component {
  /* eslint-disable */
  continue = e => {
    e.preventDefault;
    // PROCESS FORM HERE
    var ck = new CoinKey.createRandom();
    console.log("Private Key (Wallet Import Format): " + ck.privateWif);
    console.log("Private Key (Hex): " + ck.privateKey.toString('hex'));
    console.log("Public Address: " + ck.publicAddress);

    const wallet = {
      wallet_name: this.props.values.wallet_name,
      get_seed: this.props.values.get_seed,
      password: this.props.values.password,
      public_key: ck.publicAddress,
      balance_btc: 1 // for transactioning purposes
    }

    register(wallet).then(res => {
      alert(`Your new wallet name is: ${this.props.values.wallet_name} and its public address is ` + ck.publicAddress);
      document.location.href = "/login-first";
    })
  }

  back = e => {
    e.preventDefault;
    this.props.prevStep();
  }

  togglePass = e => {
    e.preventDefault;
    let pass = document.getElementById("approvePass");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }

  toggleSeed = e => {
    e.preventDefault;
    let seed = document.getElementById("approveSeed");
    if (seed.type === "password") {
      seed.type = "text";
    } else {
      seed.type = "password";
    }
  }

  render() {
    const {
      values: {
        wallet_name, password, get_seed, confirm_seed
      }
    } = this.props;

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
                      <Alert.Heading className="alertHeading" >Confirm Data</Alert.Heading>
                      <p>Re-check the data you have entered and proceed when you consider it is correct.</p>
                    </Col>
                  </Row>
                </Alert>

                <div className="checkDataContainer">
                  <p>Wallet Name: <strong>{wallet_name}</strong></p>
                </div>

                <Row>
                  <Col sm={3}><p className="approveLabel">Password:</p></Col>
                  <Col sm={9}>
                    <Form noValidate>
                      <Form.Group className="formTemplate" controlId="formApprovePass" id="formApprovePass">
                        <Form.Control
                          id = "approvePass"
                          type="password"
                          placeholder="Password"
                          defaultValue={password}
                          readOnly
                        />
                        <Button
                          className="togglePass"
                          onClick={this.togglePass}
                        >
                          <AiOutlineEyeInvisible/>
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>

                <Row>
                  <Col sm={3}><p className="approveLabel">Seed Phrase:</p></Col>
                  <Col sm={9}>
                    <Form noValidate>
                      <Form.Group className="formTemplate" controlId="formApprovePass" id="formApprovePass">
                        <Form.Control
                          style={{zIndex:86}}
                          id = "approveSeed"
                          type="password"
                          placeholder="Seed Phrase"
                          defaultValue={get_seed}
                          readOnly
                        />
                        <Button
                          style={{zIndex:99}}
                          id="togglePass"
                          onClick={this.toggleSeed}
                        >
                          <AiOutlineEyeInvisible/>
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>

                <Row className="colsButtons">
                  <Col sm={6}>
                    <Button block
                      variant="outline-primary"
                      onClick={this.back}>Back
                    </Button>
                  </Col>

                  <Col sm={6}>
                    <Button block
                      variant="primary"
                      onClick={this.continue}>Create Wallet
                    </Button>
                  </Col>
                </Row>
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

export default SignUpSeventh;
