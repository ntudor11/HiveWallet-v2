import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar';
import BitcoinLogo from '../images/icons/bitcoin-logo.svg';
import { Line } from 'react-chartjs-2';
import jwt_decode from 'jwt-decode'

class PriceCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet_name: '',
      public_key: '',
      balance_btc: '',
      reg_date: '',
      data: {
        labels: [],
        datasets: []
      },
      chartData: {
        labels: [
          "2019-11-08",
          "2019-11-09",
          "2019-11-10",
          "2019-11-11",
          "2019-11-12",
          "2019-11-13",
          "2019-11-14",
          "2019-11-15",
          "2019-11-16",
          "2019-11-17"
        ],
        datasets: [
          {
            label: 'Value (USD)',
            data: [
              8770.3617,
              8813.3567,
              9044,
              8726.36,
              8820.2333,
              8775.1017,
              8639.1833,
              8471.2783,
              8496.6,
              8516.08
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      wallet_name: decoded.wallet_name,
      public_key: decoded.public_key,
      balance_btc: decoded.balance_btc,
      reg_date: decoded.reg_date
    }, () => {
      fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json
          // data.labels:
        });
      });
    })
  }

  getLatestBtc() { // returns the oldest value
    var lastProp;
    for (var key in this.state.data.bpi) {
      if(this.state.data.bpi.hasOwnProperty(key)) {
        lastProp = this.state.data.bpi[key];
        // console.log(key+ " " + firstProp);
      }
    }
    return lastProp;
  }

  render() {
    const { data } = this.state;
    console.log(data);

    this.getLatestBtc();

    return (
      <Container fluid className="h-100">
        <Row>
          <Navbar/>
          <Col sm={9} className="content">
            <Row>
              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder">
                  <img src={BitcoinLogo} alt="Bitcoin-logo"/>
                </div>
              </Col>

              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder">
                  <p className="walletKpiName">Current Value</p>
                  <h3 className="walletKpiValue">$ {this.getLatestBtc()}</h3>
                </div>
              </Col>

              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder kpiHolder-last">
                  <p className="walletKpiName">Market Cap</p>
                  <h3 className="walletKpiValue">$ 127.66B</h3>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="chart" style={{height:"20em"}} sm={12}>
                <Line
                  data={this.state.chartData}
                  width={100}
                  height={50}
                  options={{ maintainAspectRatio: false }}
                />
              </Col>
            </Row>

            <Row>
              <Col sm={2}></Col>
              <Col sm={8}>
                <p className="disclaimer">{this.state.data.disclaimer}</p>
                <code>{JSON.stringify(data.bpi)}</code>
              </Col>
              <Col sm={2}></Col>
            </Row>
          </Col>

        </Row>
      </Container>
    )
  }
}

export default PriceCharts;
