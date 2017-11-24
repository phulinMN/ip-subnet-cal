import React, { Component } from 'react';
import { subnet } from './utils/helper'

class App extends Component {
  state = {
    ip: subnet(1)
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
                  <input type="radio" name="class" />A
                  <input type="radio" name="class" />B
                  <input type="radio" name="class" />C
                  <input type="radio" name="class" checked="checked" />Any
                </div>
                <div id="select">
                  <label>Subnet</label>
                  <select>
                    {
                      
                    }
                    <option>{ this.state.ip }</option>
                    <option>"255.255.255.255"</option>
                    <option>"255.255.255.255"</option>
                    <option>"255.255.255.255"</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-success">HELLO</button>
        </div>
      </div>
    );
  }
}

export default App;
