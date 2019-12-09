import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar';
import BitcoinLogo from '../images/icons/bitcoin-logo.svg'

class History extends Component {
  render() {
    return (
      <Container fluid className="h-100">
        <Row>
          <Navbar/>
          <Col sm={9} className="content">
            <Row style={{marginTop:"2em", marginBottom:"2em"}}>
              <Col sm={4}></Col>
              <Col sm={4}>
                <img src={BitcoinLogo} alt="bitcoinLogo"/>
              </Col>
              <Col sm={4}></Col>
            </Row>
            <Row>
              <Col sm={12} className="align-items-center">
                <table className="transactionsTable">
                  <thead className="tableHeader">
                      <tr>
                          <th>Hash</th>
                          <th>Type</th>
                          <th>Address</th>
                          <th>Timestamp</th>
                          <th>Value (BTC/USD)</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>15531...</td>
                      <td>Sent To</td>
                      <td>1AxqrT6SqH7jmVVqci6dNsZLgojtPjkfHY</td>
                      <td>22:31:42 2019.11.23</td>
                      <td>₿ 2.03 / <br/> $ 14,264.32</td>
                    </tr>

                    <tr>
                      <td>12cac...</td>
                      <td>Received From</td>
                      <td>16tDnuNzLgTmWuK8nTaE82dnz2J58nVzpd</td>
                      <td>17:48:05 2019.09.12</td>
                      <td>₿ 2.03 /<br/> $ 14,264.32</td>
                    </tr>

                    <tr>
                      <td>12c32...</td>
                      <td>Received From</td>
                      <td>16tDnuNzLgTmWuK8nTaE82dnz2J58nVzpd</td>
                      <td>17:48:05 2019.09.12</td>
                      <td>₿ 2.03 /<br/> $ 14,264.32</td>
                    </tr>

                    <tr>
                      <td>12c43.  ..</td>
                      <td>Received From</td>
                      <td>16tDnuNzLgTmWuK8nTaE82dnz2J58nVzpd</td>
                      <td>17:48:05 2019.09.12</td>
                      <td>₿ 2.03 /<br/> $ 14,264.32</td>
                    </tr>
                  </tbody>
                </table>

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default History;
