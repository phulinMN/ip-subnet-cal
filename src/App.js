import React, { Component } from 'react';
import { subnet, classSubnet, IpToBinary, NetworkAdd, usableLength, broadcast, ResultHost,ResultUsable, WildcardMask, BinarySubnet, classIp, IpType, Short, BinaryID, HexID, IpToDecimal, AllPossibleNetAdd, IsIpv4} from './utils/helper'
import { Button, Icon, Radio, Input, Select, Grid, Form } from 'semantic-ui-react'

const subnetToSelectArray = (subnetArray) => {
  return subnetArray.map((subnet, n) => {
    return {
      text: subnet + " / " + (32 - n),
      value: 32 - n
    }
  });
} 

class App extends Component {
  state = {
    subnetall: classSubnet('Any'),
    type: 'Any',
    ip: '0.0.0',
    n: '32',
    checked: false,
  }
  handleChangeSelect = (e) => {
    this.setState({
      n: e.target.value,
      subnet: subnet(this.state.n)
    });
  }
  handleChangeRadio = (e, { value }) => {
    this.setState({
      type: value,
      subnetall: classSubnet(value)
    });
  }
  handleChangeInput = (e) => {
    this.setState({
      ip: e.target.value
    });
    console.log(e.target.value);
  }
  handleClick = (e) => {
    console.log(this.state.ip)
    this.setState({
      checked: true,
      ipUse : this.state.ip
    });
  }
  render() {
    // console.log(this.state.n)
    return(
      <div className="App">
        <div className="container">
          <div className="row">
            {/* Header */}
            <div className="page-header">
              <label id="text-header">IP Subnet Calculator</label>
              <div class="input-form">
              <Grid>
                <Grid.Row centered columns={6}>
                  <Grid.Column>Network Class</Grid.Column>
                  <Grid.Column>
                  <Form>
                    <Form.Field>
                      <Radio
                        label='Any'
                        name='radio'
                        value='Any'
                        checked={this.state.type === 'Any'}
                        onChange={this.handleChangeRadio}
                      />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='A'
                        name='radio'
                        value='A'
                        checked={this.state.type === 'A'}
                        onChange={this.handleChangeRadio}
                      />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='B'
                        name='radio'
                        value='B'
                        checked={this.state.type === 'B'}
                        onChange={this.handleChangeRadio}
                      />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='C'
                        name='radio'
                        value='C'
                        checked={this.state.type === 'C'}
                        onChange={this.handleChangeRadio}
                      />
                    </Form.Field>
                  </Form>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={6}>
                  <Grid.Column>Subnet</Grid.Column>
                  <Grid.Column>
                    <Select placeholder="Select Subnet" options={subnetToSelectArray(this.state.subnetall)} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={6}>
                  <Grid.Column>IP Address</Grid.Column>
                  <Grid.Column>
                    <Input placeholder="IPV4 example: 158.104.14.15" onChange={this.handleChangeInput} type="text" name="ip-address"/>
                    <Button primary disabled={!IsIpv4(this.state.ip)} onClick={this.handleClick} animated>
                      <Button.Content visible>Calculate</Button.Content>
                      <Button.Content hidden>
                        <Icon name='right arrow' />
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              </div>
            </div>

            {/* Result table */}
            <div>
            {
              this.state.checked &&
              <div>
                <label id="text-header">IP Subnet Calculator</label>
                <div className="row">
                  <div className="col col-xs-9 col-xs-offset-3">
                    <div className="table-result">
                      <table style={{ width:'100%' }}>
                        <tr>
                          <td>IP Address</td>
                          <td>{ this.state.ipUse }</td>
                        </tr>
                        <tr>
                          <td>Network Address</td>
                          <td>{ NetworkAdd(this.state.ipUse, this.state.n) }</td>
                        </tr>
                        <tr>
                          <td>Usable Host IP Range</td>
                          <td>{ usableLength(this.state.ipUse, this.state.n) }</td>
                        </tr>
                        <tr>
                          <td>Broadcast Address</td>
                          <td>{ broadcast(this.state.ipUse, this.state.n) }</td>
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
                          <td>{ IpType(this.state.ipUse) }</td>
                        </tr>
                        <tr>
                          <td>Short</td>
                          <td>{ this.state.ipUse }/{ this.state.n }</td>
                        </tr>
                        <tr>
                          <td>Binary ID</td>
                          <td>{ BinaryID(this.state.ipUse) }</td>
                          </tr>
                        <tr>
                          <td>Integer ID</td>
                          <td>{ IpToDecimal(this.state.ipUse) }</td>
                        </tr>
                        <tr>
                          <td>Hex ID</td>
                          <td>{ HexID(this.state.ipUse) }</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            }
            </div> 

            {/* All Possible table */}
            {
              this.state.checked &&
              <div>
                <label id="text-header">All Possible /{ this.state.n } Network</label>
                <div className="row">
                  <div className="col col-xs-10 col-xs-offset-2">
                    <div className="table-possible">
                      <table style={{ width:'100%' }}>
                        <tr>
                          <th>Network Address</th>
                          <th>Usable Host Length</th>
                          <th>Broadcast Address</th>
                        </tr>
                          { AllPossibleNetAdd(this.state.ipUse, this.state.n).map((net, i) =>
                            <tr value={i}>
                                <td>{ net }</td>
                                <td>{ usableLength(net, this.state.n) }</td>
                                <td>{ broadcast(net, this.state.n) }</td>
                            </tr>
                          )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            }
            <div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
