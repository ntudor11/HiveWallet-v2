import React, {Component} from 'react'
import {register} from './UserFunctions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      wallet_name: '',
      password: '',
      public_key: '',
      balance_btc: 0,
      reg_date: ''
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
      password: this.state.password,
      public_key: this.state.public_key,
      balance_btc: this.state.balance_btc,
    }

    register(wallet).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    return (
      <div className="container-form">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Please Register.
              </h1>
              <div className="form-group">
                <label htmlFor="wallet_name">
                  Wallet Name
                </label>
                <input type="text"
                  className="form-control"
                  name="wallet_name"
                  placeholder="Enter Wallet Name"
                  value={this.state.wallet_name}
                  onChange={this.onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>
                <input type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange} />
              </div>

              <button type="submit"
                className="button btn btn-lg btn-primary btn-block"> Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
