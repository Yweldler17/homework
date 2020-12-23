import './App.css';
import React, { Component } from 'react';
import CalculatorRow from './calculatorRow';
import CalculatorButton from './calculatorButton';


export default class App extends Component {
  state = {
    labelVal: '',
    firstNum: '',
    operator: '',
    showingOperator: false
  }

  clear() {
    this.setState({
      labelVal: '',
      firstNum: '',
      operator: '',
      showingOperator: false
    })
  }

  updateLabel = (buttonVal) => {
    let newVal;
    if (this.state.showingOperator) {
      this.setState({
        labelVal: '',
        showingOperator: false,
      });
      newVal = buttonVal
    } else {
      newVal = this.state.labelVal + '' + buttonVal;
    }
    this.setState({
      labelVal: newVal
    });
  };

  runEquation(first, second, op) {
    let result;
    switch (op) {
      case 'x':
        result = first * second;
        break;
      case '÷':
        result = first / second;
        break;
      case '-':
        result = first - second;
        break;
      case '+':
        result = first + second;
        break;
    }
    this.setState({
      labelVal: result,
      operator: '',
      showingOperator: false
    });

    return result;
  }

  useOperation = (operation) => {
    switch (operation) {
      case '(':
      case ')':
      case '+/-':
      case '.':
        break;
      default:
        let intval = parseInt(this.state.labelVal)
        if (operation === '=') {
          this.runEquation(this.state.firstNum, intval, this.state.operator)
        } else {
          if (this.state.labelVal > 0 || this.state.labelVal < 0) {
            this.setState({
              labelVal: operation,
              firstNum: intval,
              showingOperator: true,
              operator: operation
            });
          };
        }
    }
  }

  render() {
    return (
      <>
        <div className="calc">
          <div className="calcLabel">{this.state.labelVal}</div>
          <div className="calcRow">
            <button onClick={
              () => this.clear()
            }>Clear</button>
            <CalculatorButton val='(' key='(' clickFunction={this.updateLabel} useOperation={this.useOperation}></CalculatorButton>
            <CalculatorButton val=')' key=')' clickFunction={this.updateLabel} useOperation={this.useOperation}></CalculatorButton>
            <button>+/-</button>
          </div>
          <CalculatorRow nums={[7, 8, 9, 'x']} updateLabel={this.updateLabel} useOperation={this.useOperation}></CalculatorRow>
          <CalculatorRow nums={[4, 5, 6, '-']} updateLabel={this.updateLabel} useOperation={this.useOperation}></CalculatorRow>
          <CalculatorRow nums={[1, 2, 3, '+']} updateLabel={this.updateLabel} useOperation={this.useOperation}></CalculatorRow>
          <CalculatorRow nums={['=', 0, '.', '÷']} updateLabel={this.updateLabel} useOperation={this.useOperation}></CalculatorRow>
        </div>
      </>
    );
  }
}

