import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import Button from "./btn";

// TO DO
// 1) Fix eval(), if there was any bug.
// 2) Change * ×, / ÷
// 3) Add History.

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appinput: "",
      appresult: "App Calculator",
      newValueToCalculate: false,
    };
  }

  setValue(p0, p1) {
    if (!this.state.newValueToCalculate) {
      this.setState({
        appinput: this.state.appinput + p0,
      });
    } else {
      this.setState({
        newValueToCalculate: false,
        appinput: p0,
      });
    }
  }

  clearEverything() {
    this.setState({
      appinput: "",
      appresult: "App Calculator",
    });
  }

  clear() {
    this.setState({
      appinput: "",
    });
  }

  delete() {
    this.setState({
      appinput: this.state.appinput.slice(0, -1),
    });
  }

  eqval() {
    try {
      var appinput = this.state.appinput;
      var res = eval(appinput);

      if (res == "Infinity") {
        res = "∞";
      }

      this.setState({
        newValueToCalculate: true,
        appresult: res,
      });
    } catch (error) {
      var SyntaxErrors = [
        "Unexpected token '*'",
        "Unexpected token '**'",
        "Unexpected end of input",
        "Invalid or unexpected token",
        "Invalid regular expression: missing /",
        "Invalid left-hand side expression in postfix operation",
      ];

      SyntaxErrors.forEach((SyntaxError) => {
        if (error == `SyntaxError: ${SyntaxError}`) {
          // alert(SyntaxError);
          this.setState({
            appresult: SyntaxError,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="App-input">
              <input
                type="text"
                className="appresult"
                name="appresult"
                value={this.state.appresult}
                disabled
              />
              <input
                type="text"
                name="appinput"
                value={this.state.appinput}
                disabled
              />
            </div>
            <div className="App-btn--row">
              <div className="App-btn--col">
                <Button
                  className="btn oprator"
                  value="CE"
                  click={() => this.clearEverything()}
                />
                <Button
                  className="btn oprator"
                  value="C"
                  click={() => this.clear()}
                />
                <Button
                  className="btn oprator"
                  value="D"
                  click={() => this.delete()}
                />
                <Button
                  className="btn oprator"
                  value="÷"
                  click={() => this.setValue("/", "÷")}
                />
              </div>
              <div className="App-btn--col">
                <Button
                  className="btn number"
                  value="7"
                  click={() => this.setValue(7)}
                />
                <Button
                  className="btn number"
                  value="8"
                  click={() => this.setValue(8)}
                />
                <Button
                  className="btn number"
                  value="9"
                  click={() => this.setValue(9)}
                />
                <Button
                  className="btn oprator"
                  value="×"
                  click={() => this.setValue("*", "×")}
                />
              </div>
              <div className="App-btn--col">
                <Button
                  className="btn number"
                  value="4"
                  click={() => this.setValue(4)}
                />
                <Button
                  className="btn number"
                  value="5"
                  click={() => this.setValue(5)}
                />
                <Button
                  className="btn number"
                  value="6"
                  click={() => this.setValue(6)}
                />
                <Button
                  className="btn oprator"
                  value="-"
                  click={() => this.setValue("-")}
                />
              </div>
              <div className="App-btn--col">
                <Button
                  className="btn number"
                  value="1"
                  click={() => this.setValue(1)}
                />
                <Button
                  className="btn number"
                  value="2"
                  click={() => this.setValue(2)}
                />
                <Button
                  className="btn number"
                  value="3"
                  click={() => this.setValue(3)}
                />
                <Button
                  className="btn oprator"
                  value="+"
                  click={() => this.setValue("+")}
                />
              </div>
              <div className="App-btn--col">
                <Button
                  className="btn number"
                  value="±"
                  click={() => this.setValue("-")}
                />
                <Button
                  className="btn number"
                  value="0"
                  click={() => this.setValue(0)}
                />
                <Button
                  className="btn number"
                  value="."
                  click={() => this.setValue(".")}
                />
                <Button
                  className="btn oprator eqval"
                  value="="
                  click={() => this.eqval()}
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
