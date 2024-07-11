import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Button from "./btn";

// TO DO
// 3) Add History.

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appinput: "",
      appresult: "App Calculator",
      newValueToCalculate: false,
      keyboard: [
        ["CE", "C", "D", "÷"],
        ["7", "8", "9", "×"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["±", "0", ".", "="],
      ],
      history: [],
      showhistory: false,
    };
  }

  setValue(p0) {
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
      newValueToCalculate: false,
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

      if (
        this.state.appinput !== "" &&
        this.state.appresult !== "App Calculator"
      ) {
        this.setState((prevState) => ({
          newValueToCalculate: true,
          appresult: res,
          history: [...prevState.history, `${this.state.appinput} = ${res}`],
        }));
      } else {
        this.setState({
          newValueToCalculate: true,
          appresult: res,
        });
      }
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
        if (error.message.includes(SyntaxError)) {
          this.setState({
            appresult: SyntaxError,
          });
        }
      });
    }
  }

  handleHistoryClick(historyItem) {
    const [appinput, appresult] = historyItem.split(" = ");
    this.setState({
      appinput,
      appresult,
      newValueToCalculate: true,
      showhistory: false,
    });
  }

  render() {
    return (
      <div className="App">
        <div className={`history ${this.state.showhistory ? "" : "hide"}`}>
          <div
            className="close"
            onClick={() => this.setState({ showhistory: false })}
          ></div>
          <ul>
            {this.state.history.map((item, index) => (
              <li key={index} onClick={() => this.handleHistoryClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
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
                onChange={this.state.appinput}
                disabled
              />
            </div>
            <div className="App-btn--row">
              <div className="App-btn--col">
                {this.state.keyboard[0].map((key) => (
                  <Button
                    className="btn oprator"
                    value={key}
                    click={() => {
                      if (key == "CE") this.clearEverything();
                      if (key == "C") this.clear();
                      if (key == "D") this.delete();
                      if (key == "÷") this.setValue("/", "÷");
                    }}
                  />
                ))}
              </div>
              <div className="App-btn--col">
                {this.state.keyboard[1].map((key) => (
                  <Button
                    className={`btn ${key == "×" ? "oprator" : "number"}`}
                    value={key}
                    click={() => {
                      if (key == "7") this.setValue(7);
                      if (key == "8") this.setValue(8);
                      if (key == "9") this.setValue(9);
                      if (key == "×") this.setValue("*", "×");
                    }}
                  />
                ))}
              </div>
              <div className="App-btn--col">
                {this.state.keyboard[2].map((key) => (
                  <Button
                    className={`btn ${key == "-" ? "oprator" : "number"}`}
                    value={key}
                    click={() => {
                      if (key == "4") this.setValue(4);
                      if (key == "5") this.setValue(5);
                      if (key == "6") this.setValue(6);
                      if (key == "-") this.setValue("-");
                    }}
                  />
                ))}
              </div>
              <div className="App-btn--col">
                {this.state.keyboard[3].map((key) => (
                  <Button
                    className={`btn ${key == "+" ? "oprator" : "number"}`}
                    value={key}
                    click={() => {
                      if (key == "1") this.setValue(1);
                      if (key == "2") this.setValue(2);
                      if (key == "3") this.setValue(3);
                      if (key == "+") this.setValue("+");
                    }}
                  />
                ))}
              </div>
              <div className="App-btn--col">
                {this.state.keyboard[4].map((key) => (
                  <Button
                    className={`btn ${
                      key == "=" ? "oprator eqval" : "number"
                    } oprator`}
                    value={key}
                    click={() => {
                      if (key == "±") this.setValue("-");
                      if (key == "0") this.setValue(0);
                      if (key == ".") this.setValue(".");
                      if (key == "=") this.eqval();
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>
        <footer>
          <button
            className="btn foot--btn"
            onClick={() => this.setState({ showhistory: true })}
          >
            Show History
          </button>
        </footer>
      </div>
    );
  }
}

export default App;
