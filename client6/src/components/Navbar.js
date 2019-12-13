import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {NavLink } from "react-router-dom";
//import icons
import DashboardDes from '../images/icons/dashboard-deselected.svg';
import StatsDes from '../images/icons/statistics-deselected.svg';
import HistoryDes from '../images/icons/history-deselected.svg';
import TransactionDes from '../images/icons/transaction-deselected.svg';
import SettingsDes from '../images/icons/settings-deselected.svg';
import LogOutDes from '../images/icons/logout-deselected.svg';
import Col from 'react-bootstrap/Col';
import logo from '../images/logo-hive.svg';

class Navbar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
    return (
      <Col sm={3} className="sideMenu">
        <img id="logo" src={logo} alt="Hive logo"/>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard" className="nav-link underline-from-center">
              <img src={DashboardDes} alt="img"/>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/price-charts" className="nav-link underline-from-center">
              <img src={StatsDes} alt="img"/>
              <span>Price Charts</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/history" className="nav-link underline-from-center">
              <img src={HistoryDes} alt="img"/>
              <span>History</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/transactions" className="nav-link underline-from-center">
              <img src={TransactionDes} alt="img"/>
              <span>Transaction</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/settings" className="nav-link underline-from-center">
              <img src={SettingsDes} alt="img"/>
              <span>Settings</span>
            </NavLink>
          </li>

          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a href="#" onClick={this.logOut.bind(this)} to="/register" className="nav-link underline-from-center">

              <img src={LogOutDes} alt="img"/>
              <span>Log Out</span>
            </a>

          </li>
        </ul>
      </Col>
    )
  }
}

export default withRouter(Navbar)
