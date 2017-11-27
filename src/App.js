import React, { Component } from 'react';
import { subnet, classSubnet, IpToBinary, NetworkAdd, usableLengthF, usableLengthL, broadcast, ResultHost,ResultUsable, WildcardMask, BinarySubnet, classIp, IpType, Short, BinaryID, HexID, IpToDecimal } from './utils/helper'

class App extends Component {
  state = {
    subnetall: classSubnet('A'),
    type: 'Any',
    ip: '0.0.0.0',
    n: '32',
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
    //console.log(e.target.value);
  }
  handleClick = (e) => {
    this.setState({
      checked: true
    });
    //console.log(this.state.subnetall.split('/'));
  }
  render() {
    return(
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="page-header">
              <h1>IP Subnet Calculator</h1>
              <div>
                <table>
                  <td></td>
                </table>
                <div class="input-form">
                  <label>Network Class</label>
                  <input onChange={this.handleChangeRadio} value='Any' type="radio" name="class" checked={this.state.type === 'Any'} />Any
                  <input onChange={this.handleChangeRadio} value='A' type="radio" name="class" checked={this.state.type === 'A'}/>A
                  <input onChange={this.handleChangeRadio} value='B' type="radio" name="class" checked={this.state.type === 'B'}/>B
                  <input onChange={this.handleChangeRadio} value='C' type="radio" name="class" checked={this.state.type === 'C'}/>C
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
                    <td>IP Address</td>
                    <td>{ this.state.ip }</td>
                  </tr>
                  <tr>
                    <td>Network Address</td>
                    <td>{ NetworkAdd(this.state.ip, this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>Usable Host IP Range</td>
                    <td>{ usableLengthF(this.state.ip, this.state.n) } - { usableLengthL(this.state.ip, this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>Broadcast Address</td>
                    <td>{ broadcast(this.state.ip, this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>Total Number of Hosts</td>
                    <td>{ ResultHost(this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>Number of Usable Hosts</td>
                    <td>{ ResultUsable(this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>Subnet Mask</td>
                    <td>{ subnet(this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>Wildcard Mask</td>
                    <td>{ WildcardMask(this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>Binary Subnet Mask</td>
                    <td>{ BinarySubnet(this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>IP Class</td>
                    <td>{ classIp(this.state.n) }</td>
                  </tr>
                  <tr>
                    <td>CIDR Notation</td>
                    <td>/{ this.state.n }</td>
                  </tr>
                  <tr>
                    <td>IP Type</td>
                    <td>{ IpType(this.state.ip) }</td>
                  </tr>
                  <tr>
                    <td>Short</td>
                    <td>{ this.state.ip }/{ this.state.n }</td>
                  </tr>
                  <tr>
                    <td>Binary ID</td>
                    <td>{ BinaryID(this.state.ip) }</td>
                  </tr>
                  <tr>
                    <td>Integer ID</td>
                    <td>{ IpToDecimal(this.state.ip) }</td>
                  </tr>
                  <tr>
                    <td>Hex ID</td>
                    <td>{ HexID(this.state.ip) }</td>
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
