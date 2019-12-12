import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo-hive.svg';
import InfoWhite from '../images/icons/information-white.svg';

class SignUpFourth extends Component {

  /* eslint-disable */
  continue = e => {
    e.preventDefault;
    if (this.props.values.get_seed !== this.props.values.confirm_seed) {
      console.log("Wrong seed, type again");
      alert("The Seedphrase you introduces is wrong. Try again or press Back for viewing it again.");
    } else {
      this.props.nextStep();
    }
  }

  back = e => {
    e.preventDefault;
    this.props.prevStep();
  }

  render() {
    // const { values, handleChange } = this.props;
    const {
      values: {
        wallet_name, get_seed, confirm_seed
      },
      handleChange
    } = this.props;

    return (
      <Container fluid className="h-100">
        <Row>
          <Col className="content loginsignup">
            <Row className="logoContainer">
              <Col sm={12}>
                <img src={logo} className="logoFront" alt="Hive-logo"/>
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
                      <Alert.Heading className="alertHeading" >Confirm Seed Phrase</Alert.Heading>
                      <p>Write below the seed phrase received earlier to confirm that you have stored it securely.</p>
                    </Col>
                  </Row>
                </Alert>

                <Form noValidate>
                  <Form.Group className="formTemplate" controlId="formNewWallet">

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Seed Phrase"
                        onChange={handleChange('confirm_seed')}
                        defaultValue={confirm_seed}
                      />
                    </Form.Group>

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

export default SignUpFourth;
