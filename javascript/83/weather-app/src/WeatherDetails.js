import React, { Component } from 'react'

export default class WeatherDetails extends Component {

    render() {
        const { cityName, currentTemp, icon } = this.props.weather;

        return (
            <div className="containerDiv">
                <h2 className="currentCity">{cityName}</h2>
                <img className="currentIcon" src={icon} alt="weathericon" />
                <br />
                <p className="tempDiv">{currentTemp}</p>
            </div>
        )
    }
}
