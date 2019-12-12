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

class SignUpFirst extends Component {

  /* eslint-disable */
  continue = e => {
    e.preventDefault;
    if (this.props.values.wallet_name.length < 4) {
      console.log("not allowed");
      alert("The wallet name cannot contain less than 4 characters.");
    } else {
      this.props.nextStep();
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

                <Form noValidate>
                  <Form.Group className="formTemplate" controlId="formNewWallet">

                    <Form.Control
                      type="text"
                      placeholder="Enter Wallet Name"
                      onChange={handleChange('wallet_name')}
                      defaultValue={values.wallet_name}
                    />

                    <Row className="colsButtons">
                      <Col sm={6}>
                        <NavLink exact to="/">
                          <Button block variant="outline-primary">Back</Button>
                        </NavLink>
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

export default SignUpFirst;
