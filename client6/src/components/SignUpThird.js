import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo-hive.svg';
import doge from '../images/doge.png';
import InfoWhite from '../images/icons/information-white.svg';

const dogeSeed = require('doge-seed');
var qr = require('qr-encode');
var seedPhrase = dogeSeed();
var dataURI = qr(seedPhrase, {type: 6, size: 6, level: 'M'});

class SignUpThird extends Component {

  /* eslint-disable */
  continue = e => {
    e.preventDefault;
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault;
    this.props.prevStep();
  }

  render() {
    const { values, handleChange } = this.props;

    values.get_seed = seedPhrase;

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
                      <Alert.Heading className="alertHeading" >Your Seed Phrase</Alert.Heading>
                      <p>Find below your wallet generation seed. Please save these 12 words in a safe place or download the corresponding QR code (the word’s order is important). This seed will allow you to recover your wallet, in case of a failure or a lost password. You will it need for backup and recovery purposes, so make sure you do not lose it!</p>
                      <div style={{margin:"0 auto", width:"100px"}}>
                        <img src={doge} alt="doge-meme" style={{width:"100px", textAlign:"center"}}/>
                      </div>
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
                        <Form.Control
                          as="textarea"
                          rows="4"
                          readOnly
                          defaultValue={values.get_seed}
                          onMouseOver={handleChange('get_seed')}
                          onMouseOut={handleChange('get_seed')}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Col>
              <Col sm={3} lg={4}></Col>
            </Row>
            <Row className="colsButtons" style={{marginBottom:"1em"}}>
              <Col sm={3} lg={4}></Col>
              <Col sm={6} lg={4}>
              <Row className="">
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
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SignUpThird;
