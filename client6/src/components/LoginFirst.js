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
import {login} from './UserFunctions'


class LoginFirst extends Component {

  constructor() {
    super()
    this.state = {
      wallet_name: '',
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

    const wallet = {
      wallet_name: this.state.wallet_name,
      password: this.state.password
    }

    login(wallet).then(res => {
      if(res) {
        this.props.history.push(`/login-second`)
        console.log("Right credentials. Press login again (this step is demo only)")
      } else {
        console.log("Wrong credentials.")
        var errorLogin = "<p>Wrong credentials. Please check for errors.</p>"
        var errorPlaceholder = document.getElementById('error-placeholder');
        errorPlaceholder.innerHTML += errorLogin;
      }
    })
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
                      <Alert.Heading className="alertHeading" >Authentication method</Alert.Heading>
                      <p>Choose your wallet from the list to the left and input the corresponding password.</p>
                    </Col>
                  </Row>
                </Alert>

                <Form noValidate onSubmit={this.onSubmit}>
                  <Form.Group className="formTemplate" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Choose Existing Wallet</Form.Label>
                    {/*<Form.Control as="select">
                      <option>Wallet 1</option>
                      <option>Wallet 2</option>
                      <option>Wallet 3</option>
                    </Form.Control> */}

                    <Form.Control
                      type="text"
                      name="wallet_name"
                      placeholder="Enter Wallet Name"
                      value={this.state.wallet_name}
                      onChange={this.onChange}
                    />
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Row className="colsButtons">
                      <Col sm={6}>
                        <NavLink exact to="/">
                          <Button block variant="outline-primary">Back</Button>
                        </NavLink>
                      </Col>

                      <Col sm={6}> {/* TODO Remove following navlink*/}

                          <Button type="submit" block variant="primary">Log In</Button>

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
                <div id="error-placeholder">
                </div>
              </Col>
              <Col sm={3} lg={4}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LoginFirst;
