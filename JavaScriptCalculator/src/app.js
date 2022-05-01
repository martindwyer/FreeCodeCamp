import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      lastOperator: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState(() => {
      return {
        input: "0",
        lastOperator: "",
      };
    });
  }
  evaluate() {
    let opsRegex = /[\+\-\/\*]/g;
    let threeOpsRegex = /([\+\-\/\*]{1,})([\+\-\/\*]{1})([\+\/\*]{1})/g;
    let twoOpsRegex = /([\+\-\/\*])([\+\/\*])/g;
    let expression = this.state.input.replace("x", "*").replace(threeOpsRegex, "$3").replace(twoOpsRegex, "$2");
    this.setState(() => {
      return {
        input: eval(expression),
        lastOperator: ".",
      };
    });
  }

  handleNumber(clickValue) {
    let newState;
    if (this.state.input === "0") {
      newState = clickValue;
    } else {
      newState = this.state.input + clickValue;
    }
    this.setState(() => {
      return {
        input: newState,
      };
    });
  }

  handleOperator(clickValue) {
    if (clickValue === "=") {
      this.setState(() => {
        return {
          lastOperator: "=",
        };
      });
      this.evaluate();
      return;
    }
    if (clickValue === "." && this.state.lastOperator === ".") {
      // Do nothing
      return;
    }
    let newState = this.state.input + clickValue;

    this.setState(() => {
      return {
        input: newState,
        lastOperator: clickValue,
      };
    });
  }

  handleClick(e) {
    let clickValue = e.target.value;
    if (clickValue === "AC") {
      console.log("reset");
      this.reset();
      return;
    }
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (numbers.includes(clickValue)) {
      this.handleNumber(clickValue);
    } else {
      this.handleOperator(clickValue);
    }
    return;
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Calculator</h1>
        <div id="display">{this.state.input}</div>
        <div>
          <button id="clear" onClick={this.handleClick} value="AC">
            AC
          </button>
          <button id="divide" onClick={this.handleClick} value="/">
            /
          </button>
          <button id="multiply" onClick={this.handleClick} value="x">
            x
          </button>
          <button id="add" onClick={this.handleClick} value="+">
            +
          </button>
          <button id="subtract" onClick={this.handleClick} value="-">
            ‑
          </button>
          <button className="blank"></button>
          <button id="seven" onClick={this.handleClick} value="7">
            7
          </button>
          <button id="eight" onClick={this.handleClick} value="8">
            8
          </button>
          <button id="nine" onClick={this.handleClick} value="9">
            9
          </button>

          <button id="four" onClick={this.handleClick} value="4">
            4
          </button>
          <button id="five" onClick={this.handleClick} value="5">
            5
          </button>
          <button id="six" onClick={this.handleClick} value="6">
            6
          </button>

          <button id="one" onClick={this.handleClick} value="1">
            1
          </button>
          <button id="two" onClick={this.handleClick} value="2">
            2
          </button>
          <button id="three" onClick={this.handleClick} value="3">
            3
          </button>
          <button id="decimal" onClick={this.handleClick} value=".">
            .
          </button>
          <button id="zero" onClick={this.handleClick} value="0">
            0
          </button>

          <button id="equals" onClick={this.handleClick} value="=">
            =
          </button>
        </div>{" "}
      </div>
    );
  }
}
const appTarget = document.querySelector("#app");

ReactDOM.render(<Calculator />, appTarget);
