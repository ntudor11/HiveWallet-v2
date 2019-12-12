import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Switch from "react-switch";
import Navbar from '../components/Navbar';
import {NavLink } from "react-router-dom";

class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <Container fluid className="h-100">
        <Row>
          <Navbar/>
          <Col sm={9} className="content">
            <Row style={{marginBottom:"4em", marginTop:"2em"}}>
              <Col sm={6} id="setting1container">
                <p className="settingsHeading">Change Password</p>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Form.Group className="formTemplate" controlId="formNewWallet">

                    <Form.Control type="password" placeholder="Old Password" />
                    <Form.Control type="password" placeholder="New Password" />
                    <Form.Control type="password" placeholder="Repeat New Password" />

                  </Form.Group>
                </Form>
              </Col>

              <Col sm={6}>
                <p className="settingsHeading">Backup</p>
                <label style={{marginTop:"1em"}}>
                {this.state.checked ? <span style={{color:"grey"}}>Off</span> : <span style={{color:"#fff", fontFamily:"josefinSansRegular"}}>Off</span>}
                <Switch
                  checked={this.state.checked}
                  onChange={this.handleChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                /> {this.state.checked ? <span style={{color:"#fff", fontFamily:"josefinSansRegular"}}>On</span> : <span style={{color:"grey"}}>On</span>}
                </label>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Form.Group className="formTemplate" controlId="formEncryptBackup">

                    <Form.Control type="password" placeholder="Encryption Password" />
                    <Form.Control type="password" placeholder="Repeat Encryption Password" />

                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <Row style={{marginBottom:"2em"}}>
              <Col sm={6}>
                <p className="settingsHeading">Advanced Settings</p>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Form.Group className="formTemplate" controlId="currencySelector">
                    <Form.Label>Preferred Currency</Form.Label>
                    <Form.Control as="select" className="shortFormSelector">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </Form.Control>
                  </Form.Group>
                </Form>

              </Col>
              <Col sm={6} className="colsButtons">
                <p className="settingsHeading">Wallet Data</p>
                <NavLink exact to="/settings"> {/* TODO remove navlink and add another window to view the seed */}
                  <Button variant="outline-primary">Get Seed</Button>
                </NavLink>
              </Col>
            </Row>

            <Row className="colsButtons">
              <Col sm={3} lg={4}></Col>
              <Col sm={6} lg={4}>
                <NavLink exact to="/settings" className="demoHolder"> {/*TODO remove the navlink and update settings on button click?? */}
                  <Button block variant="primary">Save All</Button>
                  <span class="tooltiptext">This feature is coming soon.</span>
                </NavLink>
              </Col>
              <Col sm={3} lg={4}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Settings;
