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

class LoginSecond extends Component {

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
                      <Alert.Heading className="alertHeading" >Two-Factor Authentication required</Alert.Heading>
                      <p>Enter the six-digit code from your code-generator or third party app below (NB: This is just a demo, so you can directly press on Log in).</p>
                    </Col>
                  </Row>
                </Alert>

                <Form>
                  <Form.Group className="formTemplate" controlId="exampleForm.ControlSelect2">

                    <Form.Group controlId="formBasic2FAToken">
                      <Form.Control type="text" placeholder="Enter Login Code" />
                    </Form.Group>

                    <Row className="colsButtons">
                      <Col sm={6}>
                        <NavLink exact to="/login-first">
                          <Button block variant="outline-primary">Back</Button>
                        </NavLink>
                      </Col>

                      <Col sm={6}>
                        <NavLink exact to="/dashboard"> {/*TODO replace this or not?? */}
                          <Button type="submit" block variant="primary">Log In</Button>
                        </NavLink>
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

export default LoginSecond;
