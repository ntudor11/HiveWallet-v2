import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar';
import BitcoinLogo from '../images/icons/bitcoin-logo.svg';
import { Line } from 'react-chartjs-2';

// var coininfo = require('coininfo')

class PriceCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      chartData:{
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data: [
              617594,
              181045,
              153060,
              840401,
              105162,
              95072
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
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => res.json())
    .then(json => {
      this.setState({
        data: json
      });
    });
  }

  render() {
    const { data } = this.state;
    console.log(data);
    // console.log(coininfo('BTC'));

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
                  <h3 className="walletKpiValue">$ 7,066.84</h3>
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
                <code>{JSON.stringify(this.state.data.bpi)}</code>
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
