import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo-hive.svg';
import {NavLink } from "react-router-dom";

class LogSignIn extends Component {
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
            <Row className="colsButtons frontColsButtons">
              <Col sm={4}></Col>
              <Col sm={4}>
                <NavLink exact to="/login-first">
                  <Button block variant="primary">Log In to Existing Wallet</Button>
                </NavLink>

                <NavLink exact to="/signup-form">
                  <Button block variant="outline-primary">Create New Wallet</Button>
                </NavLink>

                <Button block variant="outline-primary">Restore Wallet</Button>
              </Col>
              <Col sm={4}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LogSignIn;
