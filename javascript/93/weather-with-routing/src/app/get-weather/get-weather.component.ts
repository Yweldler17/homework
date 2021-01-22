import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetWeather } from '../shared/getWeather';

@Component({
  selector: 'app-get-weather',
  templateUrl: './get-weather.component.html',
  styleUrls: ['./get-weather.component.css']
})
export class GetWeatherComponent {

  constructor(private httpClient: HttpClient) { }

  @Input()
  getWeather: GetWeather | undefined;
  currentWeather!: {
    city: '',
    temp: '',
    icon: ''
  };

  apiKey = '';

  currentZip = '';


  getCurrentWeather() {

    this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/weather?zip=${this.currentZip}&units=imperial&appid=${this.apiKey}`)
      .subscribe(result => {
        this.currentWeather = {
          city: result.name,
          temp: result.main.temp,
          icon: result.weather[0].icon
        }

        console.log(this.currentWeather);

      });
  }

}
