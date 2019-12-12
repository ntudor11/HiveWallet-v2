import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo-hive.svg';
import InfoWhite from '../images/icons/information-white.svg';

class SignUpFifth extends Component {
  /* eslint-disable */
  continue = e => {
    e.preventDefault;
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/;
    if (this.props.values.password.match(re)) {
      console.log("Strong password");
      if (this.props.values.password === this.props.values.confirm_password) {
        console.log("you can go");
        this.props.nextStep();
      } else {
        alert("Password does not match.");
        console.log("password does not match");
      }
    } else {
      console.log("Your password does not meet the requirements.");
      alert("Your password does not meet the requirements.");
    }
  }

  back = e => {
    e.preventDefault;
    this.props.prevStep();
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
                      <Alert.Heading className="alertHeading" >Add Password</Alert.Heading>
                      <p>Secure your wallet with a strong password that you can remember. 8 required characters where there are minimum an uppercase and a number.</p>
                    </Col>
                  </Row>
                </Alert>

                <Form noValidate>
                  <Form.Group className="formTemplate" controlId="formNewWallet">

                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      onChange={handleChange('password')}
                      defaultValue={values.password}
                    />

                    <Form.Control
                      type="password"
                      placeholder="Repeat Password"
                      onChange={handleChange('confirm_password')}
                      defaultValue={values.confirm_password}
                    />

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
