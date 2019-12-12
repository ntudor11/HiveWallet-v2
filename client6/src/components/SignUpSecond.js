import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo-hive.svg';
import InfoWhite from '../images/icons/information-white.svg';

class SignUpSecond extends Component {
  /* eslint-disable */
  continue = e => {
    e.preventDefault;
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault;
    this.props.prevStep();
  }

  // constructor() {
  //   super()
  //   this.state = {
  //     walletName: '',
  //     password: ''
  //   }
  //
  //   this.onChange = this.onChange.bind(this)
  //   this.onSubmit = this.onSubmit.bind(this)
  // }
  //
  // onChange(e) {
  //   this.setState({[e.target.name]: e.target.value})
  // }
  //
  // onSubmit(e) { //TODO make it work
  //   e.preventDefault()
  //
  //   // const wallet = {
  //   //   walletName: this.state.walletName,
  //   //   password: this.state.password
  //   // }
  // }

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
                <Alert variant="warning">
                  <Row>
                    <Col className="d-flex align-items-center" sm={2}>
                      <img className="infoIcon" src={InfoWhite} alt="info"/>
                    </Col>

                    <Col sm={10}>
                      <Alert.Heading className="alertHeading" >VERY IMPORTANT:
                      Your Seed Phrase</Alert.Heading>
                      <p>The next screen contains highly sensitive information that you should not disclose to anyone. Before proceeding, make sure that there is nobody behind you / no one can see your screen!</p>
                    </Col>
                  </Row>
                </Alert>

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

export default SignUpSecond;
