import React, { Component } from 'react';
import CalculatorButton from './calculatorButton';

export default class CalculatorRow extends Component {

    render() {
        return (
            <div className="calcRow">
                {this.props.nums.map(num => <CalculatorButton val={num} key={num} updateLabel={this.props.updateLabel} useOperation={this.props.useOperation}></CalculatorButton>)}
            </div>
        )
    }
}