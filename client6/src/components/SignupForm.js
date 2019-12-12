import React, {Component} from 'react';
import SignUpFirst from './SignUpFirst';
import SignUpSecond from './SignUpSecond';
import SignUpThird from './SignUpThird';
import SignUpFourth from './SignUpFourth';
import SignUpFifth from './SignUpFifth';
import SignUpSixth from './SignUpSixth';
import SignUpSeventh from './SignUpSeventh';

class SignupForm extends Component {
  state = {
    step: 1,
    id:'',
    wallet_name: '',
    get_seed: '',
    confirm_seed: '',
    password: '',
    confirm_password: '',
    public_key: '',
    balance_btc: '',
    reg_date: ''
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  // handle fields change
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  }

  render() {
    const { step } = this.state;
    const { id, wallet_name, get_seed, confirm_seed, password, confirm_password, public_key, balance_btc, reg_date } = this.state;
    const values = { id, wallet_name, get_seed, confirm_seed, password, confirm_password, public_key, balance_btc, reg_date };

    switch(step) {
      case 1:
        return(
          <SignUpFirst
            nextStep = {this.nextStep}
            handleChange = {this.handleChange}
            values = {values}
          />
        )
      case 2:
        return (
          <SignUpSecond
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
          />
        )
      case 3:
        return (
          <SignUpThird
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
          />
        )
      case 4:
        return (
          <SignUpFourth
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
          />
        )
      case 5:
        return (
          <SignUpFifth
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
          />
        )
      case 6:
        return (
          <SignUpSixth
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
          />
        )
      case 7:
        return (
          <SignUpSeventh
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            handleChange = {this.handleChange}
            values = {values}
          />
        )
    }
  }
}

export default SignupForm;
