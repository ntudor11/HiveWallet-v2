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
import {login} from './UserFunctions';
import { IoIosArrowDown } from "react-icons/io";


class LoginFirst extends Component {

  constructor() {
    super()
    this.state = {
      wallet_name: '',
      password: '',
      wallets: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
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
        var errorLogin = "Wrong credentials. Please check for errors."
        alert(errorLogin);
      }
    }).catch(err => {
      console.log(err)
      console.log("not working")
    })
  }

  componentDidMount() {
    let self = this;
    fetch('http://localhost:5000/wallets/walletslist', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        self.setState({wallets: data});
    }).catch(err => {
    console.log('caught it!',err);
    })
  }

  render() {
    const walletItem = this.state.wallets.map(wallet =>
      wallet.wallet_name
    );

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
                      <p>Choose your wallet from the list below and type the corresponding password.</p>
                    </Col>
                  </Row>
                </Alert>

                <Form noValidate onSubmit={this.onSubmit}>
                  <Form.Group
                    className="formTemplate"
                    controlId="exampleForm.ControlSelect1"
                    >
                    <Form.Group className="formTemplate" controlId="formSelectWallet" id="formSelectWallet">
                      <Form.Label>Choose Existing Wallet</Form.Label>
                      <Form.Control
                        style={{zIndex:'2'}}
                        as="select"
                        name="wallet_name"
                        value={this.state.wallet_name}
                        onChange = {this.onChange}
                        >
                        <option>Choose existing wallet</option>
                        {walletItem.map(item => (
                          <option key={item.toString()} value={item}>{item}</option>
                        ))}
                      </Form.Control>

                      <span
                        className="togglePass, togglePass2"
                      >
                        <IoIosArrowDown/>
                      </span>
                    </Form.Group>


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

                      <Col sm={6}>
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
