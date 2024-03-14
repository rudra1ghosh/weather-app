import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import cloud_icon from "../Assets/cloud.png";
import clear_icon from "../Assets/clear.png";

export const WeatherApp = () => {
  let api_key = "9e3dc7672b687f017921c7eaa95eaacd";
  const [ic,seticon]=useState(clear_icon);
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const description = document.getElementsByClassName("weather-desc");
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temperature[0].innerHTML = Math.round(data.main.temp) + "°C";
    location[0].innerHTML = data.name;
    description[0].innerHTML = data.weather[0].main;
    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n") seticon(clear_icon);
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n") seticon(cloud_icon);
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n" || data.weather[0].icon==="04d" || data.weather[0].icon==="04n") seticon(drizzle_icon);
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n" || data.weather[0].icon==="10d" || data.weather[0].icon==="10n") seticon(rain_icon);
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n") seticon(snow_icon);
    else seticon(clear_icon);

  };
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Please enter the city name"
          className="cityInput"
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={ic} alt="" />
      </div>
      <div className="weather-temp">NA</div>
      <div className="weather-desc">NA</div>
      <div className="weather-location">Enter Location</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">NA</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">NA</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherApp;
