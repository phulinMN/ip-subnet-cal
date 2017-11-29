import React, { Component } from 'react';
import { subnet, classSubnet, IpToBinary, NetworkAdd, usableLength, broadcast, ResultHost,ResultUsable, WildcardMask, BinarySubnet, classIp, IpType, Short, BinaryID, HexID, IpToDecimal, AllPossibleNetAdd, IsIpv4} from './utils/helper'
import { Button, Icon, Radio, Input, Select, Grid, Form, Table } from 'semantic-ui-react'

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

            {/* Result table */}
            <div>
            {
              this.state.checked &&
                <Grid>
                  <Grid.Row centered columns={3}>
                    <Grid.Column>
                      <Table celled selectable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell colSpan='2'>IP Subnet Calculator</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>IP Address</Table.Cell>
                            <Table.Cell>{ this.state.ipUse }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Network Address</Table.Cell>
                            <Table.Cell>{ NetworkAdd(this.state.ipUse, this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Usable Host IP Range</Table.Cell>
                            <Table.Cell>{ usableLength(this.state.ipUse, this.state.n) }</Table.Cell>
                         </Table.Row>
                          <Table.Row>
                            <Table.Cell>Broadcast Address</Table.Cell>
                            <Table.Cell>{ broadcast(this.state.ipUse, this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Total Number of Hosts</Table.Cell>
                            <Table.Cell>{ ResultHost(this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Number of Usable Hosts</Table.Cell>
                            <Table.Cell>{ ResultUsable(this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Subnet Mask</Table.Cell>
                            <Table.Cell>{ subnet(this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Wildcard Mask</Table.Cell>
                            <Table.Cell>{ WildcardMask(this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Binary Subnet Mask</Table.Cell>
                            <Table.Cell>{ BinarySubnet(this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>IP Class</Table.Cell>
                            <Table.Cell>{ classIp(this.state.n) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>CIDR Notation</Table.Cell>
                            <Table.Cell>/{ this.state.n }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>IP Type</Table.Cell>
                            <Table.Cell>{ IpType(this.state.ipUse) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Short</Table.Cell>
                            <Table.Cell>{ this.state.ipUse }/{ this.state.n }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Binary ID</Table.Cell>
                            <Table.Cell>{ BinaryID(this.state.ipUse) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Integer ID</Table.Cell>
                            <Table.Cell>{ IpToDecimal(this.state.ipUse) }</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Hex ID</Table.Cell>
                            <Table.Cell>{ HexID(this.state.ipUse) }</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
            }
            </div> 

            {/* All Possible table */}
            {
              this.state.checked &&
              <Grid>
                <Grid.Row centered columns={3}>
                  <Grid.Column>
                    <Table  celled selectable> 
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Network Address</Table.HeaderCell>
                          <Table.HeaderCell>Usable Host LengTable.Cell</Table.HeaderCell>
                          <Table.HeaderCell>Broadcast Address</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        { AllPossibleNetAdd(this.state.ipUse, this.state.n).map((net, i) =>
                        <Table.Row>
                          <Table.Cell>{ net }</Table.Cell>
                          <Table.Cell>{ usableLength(net, this.state.n) }</Table.Cell>
                          <Table.Cell>{ broadcast(net, this.state.n) }</Table.Cell>
                        </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
