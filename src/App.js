import React, { Component } from 'react';
import { subnet, classSubnet, IpToBinary, NetworkAdd } from './utils/helper'

class App extends Component {
  state = {
    subnetall: classSubnet('A'),
    type: 'A',
    ip: '0.0.0.0',
    n: '1',
    bi: '11111111.11111111.00000000.00000000',
    checked: false,
  }
  handleChangeSelect = (e) => {
    this.setState({
      n: e.target.value,
      subnet: subnet(this.state.n)
    });
    //console.log(subnet(this.state.n) + ' / ' + (e.target.value));
  }
  handleChangeRadio = (e) => {
    this.setState({
      type: e.target.value,
      subnetall: classSubnet(e.target.value)
    });
  }
  handleChangeInput = (e) => {
    this.setState({
      ip: e.target.value
    });
    console.log(e.target.value);
  }
  handleClick = (e) => {
    this.setState({
      checked: true,
      bi: IpToBinary(this.state.ip),
      n: this.state.subnet.split('/')
    });
    console.log(this.state.subnetall.split('/'));
  }
  render() {
    return(
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="page-header">
              <h1>IP Subnet Calculator</h1>
              <div>
                <div>
                  <label>Network Class</label>
                  <input onChange={this.handleChangeRadio} value='A' type="radio" name="class" />A
                  <input onChange={this.handleChangeRadio} value='B' type="radio" name="class" />B
                  <input onChange={this.handleChangeRadio} value='C' type="radio" name="class" />C
                  <input onChange={this.handleChangeRadio} value='Any' type="radio" name="class" />Any
                </div>
                <div id="select">
                  <label>Subnet</label>
                  <select onChange={this.handleChangeSelect}>
                    { this.state.subnetall.map((sub, i) =>
                      <option value={(32-i)}>
                        { sub + ' / ' + (32-i) }
                      </option>
                    )}
                  </select>
                </div>
                <div id="ip-address">
                  <label>IP Address</label>
                  <input onChange={this.handleChangeInput} type="text" name="ip-address"/>
                  <button onClick={this.handleClick} className="btn btn-success">submit</button>
                </div>
              </div>
              <div>
              {
                this.state.checked &&
               <table style={{ width:'100%' }}>
                  <tr>
                    <th>IP Address</th>
                    <th>{ this.state.ip }</th>
                  </tr>
                  <tr>
                    <th>Network Address</th>
                    <th>{ NetworkAdd(this.state.ip,) }</th>
                  </tr>
                  <tr>
                    <th>Binary IP</th>
                    <th>{ this.state.bi }</th>
                  </tr>
                </table>
              }
                {/* <label>Binary IP: { this.state.bi }</label> */}
              </div>
            </div>
          </div>
          {/* <button className="btn btn-success">HELLO</button> */}
        </div>
      </div>
    );
  }
}

export default App;
