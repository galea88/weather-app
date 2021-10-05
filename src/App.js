import { Component } from "react";
import "./App.css";
import React from "react";

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=0.1278&exclude=current,minutely&appid=988ca5b44525d499bbd210a79352091b&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.setState({ weather: data, isLoading: false }));
  }

  render() {
    let cards = [];

    {
      if (this.state.isLoading == false) {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        this.state.weather.daily.map((item) => {
          let date = new Date(item.dt * 1000);
          let day = weekdays[date.getDay()];

          cards.push(
            <WeatherCard
              day={day}
              highTemp={Math.floor(item.temp.max)}
              lowTemp={Math.floor(item.temp.min)}
              icon={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            />
          );
        });
      }
    }

    {
      if (!this.state.weather.daily) {
        return <p> ... </p>;
      } else {
        return (
          <div className="container">
            <div className="row d-flex justify-content-center pt-5">
              {cards}
            </div>
          </div>
        );
      }
    }
  }
}

class WeatherCard extends Component {
  render() {
    return (
      <div className="col-12 col-md-1 mx-3">
        <div className="cardWrapper">
          <h1>{this.props.day}</h1>
          <img src={this.props.icon}></img>
          <div id="temp">
            <span className="highTemp">{this.props.highTemp}°</span>
            <span className="lowTemp">{this.props.lowTemp}°</span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherData;
