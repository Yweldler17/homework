import './App.css';
import React, { Component } from 'react';
import WeatherDetails from './WeatherDetails';
import ErrorMessage from './ErrorMessage';
const apiKey = '45f104b299251ab3758428b277ec59c0';
// const zip = `zip=07055`

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentZip: '',
      hasWeather: false,
      isError: false,
      myWeather: {
        cityName: '',
        currentTemp: '',
        icon: ``
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ currentZip: event.target.value });
  }

  getWeather(zip) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${apiKey}`)
      .then(r => {
        if (!r.ok) {
          this.setState({
            isError: true,
            hasWeather: false
          })
          throw new Error(`${r.status} ${r.statusText}`);

        }
        return r.json();
      })
      .then(weatherData => {
        this.setState({
          hasWeather: true,
          isError: false,
          myWeather: {
            cityName: weatherData.name,
            currentTemp: `${weatherData.main.temp.toFixed(0)}° F`,
            icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
          }
        })
      })
      .catch(err => console.log(err));
  }

  getWeatherInfo() {
    if (this.state.hasWeather) {
      return <WeatherDetails className="weatherIcon" weather={this.state.myWeather} />
    } else if (this.state.isError) {
      return <ErrorMessage className="errorDiv" />
    }
    return null;
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Weather by Zipcode</h1>
        </header>
        <div className="buttonWrapper">
          <button className="weatherButton" onClick={
            () => this.getWeather(this.state.currentZip)
          }>Get Weather</button>
          <input type="text" className="zipInputBox" value={this.state.currentZip} onChange={this.handleChange} />
        </div>
        <div>
          {this.getWeatherInfo()}
        </div>
      </div>
    );
  }
}

export default App;
