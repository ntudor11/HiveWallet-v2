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

class SignUpFifth extends Component {
  /* eslint-disable */
  continue = e => {
    e.preventDefault;
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault;
    this.props.prevStep();
  }

  constructor(props) {
    super(props)
    this.state = {
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(e) { //TODO make it work
    alert(`Your password has been successfully set.`);
    document.location.href = "/signup-sixth";
    e.preventDefault();
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
                      <Alert.Heading className="alertHeading" >Add Password</Alert.Heading>
                      <p>Secure your wallet with a strong password that you can remember. Required characters: minimum 1 uppercase, lowercase, number and special character and min 10 characters.</p>
                    </Col>
                  </Row>
                </Alert>

                <Form noValidate onSubmit={this.handleSubmit}>
                  <Form.Group className="formTemplate" controlId="formNewWallet">

                    <Form.Control type="password" value={this.state.password} placeholder="New Password" onChange={this.handleChange} />

                    <Form.Control type="password" placeholder="Repeat Password" />

                    <Row className="colsButtons">
                      <Col sm={6}>
                        <Button block
                          variant="primary"
                          onClick={this.back}>Next
                        </Button>
                      </Col>

                      <Col sm={6}>
                        <Button block
                          variant="primary"
                          onClick={this.continue}>Next
                        </Button>
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

export default SignUpFifth;
