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
      coinmarket: [
        {
          price_usd: '',
          market_cap_usd: ''
        }
      ]
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
      })
      fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
      .then(data => data.json())
      .then(data => {
        this.setState({
          coinmarket: data
        })
      });
    })
  }

  getChartData() {
    var testData = {
      labels: [],
      datasets: [
        {
          label: "BTC Value (USD)",
          data: [],
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
    };

    for (var key in this.state.data.bpi) {
      testData.labels.push(key);
      var value = this.state.data.bpi[key];
      testData.datasets[0].data.push(value);
    }

    console.log(testData.datasets[0]);
    console.log(this.state.data);

    return testData;
  }

  getMarketCap(){
    var marketCap = this.state.coinmarket[0].market_cap_usd;
    return marketCap;
  }

  getCurrentPrice() {
    var currentPrice = this.state.coinmarket[0].price_usd;
    return (+(currentPrice)).toFixed(2);
  }

  formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
    // if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  }

  render() {

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
                  <h3 className="walletKpiValue">$ {this.getCurrentPrice()}</h3>
                </div>
              </Col>

              <Col sm={4} className="walletKpi align-items-center">
                <div className="kpiHolder kpiHolder-last">
                  <p className="walletKpiName">Market Cap</p>
                  <h3 className="walletKpiValue">$ {this.formatCash(this.getMarketCap())}</h3>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="chart" style={{height:"20em"}} sm={12}>
                <Line
                  data={this.getChartData()}
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

              </Col>
              <Col sm={2}></Col>
            </Row>
          </Col>

        </Row>
      </Container>
    )
  }
}

// const priceCharts = new PriceCharts();
export default PriceCharts;
