import React, { Component } from 'react'

export default class CalculatorButton extends Component {

    clickListener() {
        if (typeof this.props.val === 'number') {
            this.props.updateLabel(this.props.val)
        } else {
            this.props.useOperation(this.props.val)
        }
    }

    render() {
        return (
            <>
                <button onClick={
                    () => this.clickListener()
                }>{this.props.val}</button>
            </>
        )
    }
}