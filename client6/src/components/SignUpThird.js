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

const dogeSeed = require('doge-seed');
var qr = require('qr-encode');
var seedPhrase = "church heal bark extinct facility enjoy convict duty goat chocolate slip shadow"
var seedPhrase2 = dogeSeed();
var dataURI = qr(seedPhrase2, {type: 6, size: 6, level: 'M'});

class SignUpThird extends Component {

  constructor() {
    super()
    this.state = {
      walletName: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) { //TODO make it work
    e.preventDefault()

    // const wallet = {
    //   walletName: this.state.walletName,
    //   password: this.state.password
    // }
  }

  render() {
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
                      <Alert.Heading className="alertHeading" >Your Seed Phrase</Alert.Heading>
                      <p>Find below your wallet generation seed. Please save these 12 words in a safe place or download the corresponding QR code (the word’s order is important). This seed will allow you to recover your wallet, in case of a failure or a lost password. You will it need for backup and recovery purposes.</p>
                    </Col>
                  </Row>
                </Alert>
                <Row>
                  <Col sm={4}>
                    <img className="qrFromSeed" src={dataURI} alt="qr-from-seed" style={{width:"100%", border:"10px solid white", margin:"0 auto"}}/>
                  </Col>
                  <Col sm={8}>
                    <Form noValidate onSubmit={this.onSubmit}>
                      <Form.Group className="formTemplate" controlId="formGetSeed">
                        <Form.Control as="textarea" rows="3" readOnly defaultValue={seedPhrase2} />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Col>
              <Col sm={3} lg={4}></Col>
            </Row>
            <Row className="colsButtons">
              <Col sm={3} lg={4}></Col>
              <Col sm={6} lg={4}>
              <Row className="">
                <Col sm={6}>
                  <NavLink exact to="/signup-second">
                    <Button block variant="outline-primary">Back</Button>
                  </NavLink>
                </Col>

                <Col sm={6}> {/* TODO Remove following navlink*/}
                  <NavLink exact to="/signup-fourth">
                    <Button type="submit" block variant="primary">Next</Button>
                  </NavLink>
                </Col>
              </Row>
              </Col>
              <Col sm={3} lg={4}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SignUpThird;
