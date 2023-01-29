# Weather App Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Description

Weather is a simple application where you type location(city name) and you will get information about temperature, sky conditions, wind speed and wind direction(you will get an image representing sky conditions).

You can type and get information for as many locations as you want.

## Project Features:

- Header: Simple displaying component for the application title
- App: Parent component for the application. It tracks input for location and displays if there is a error. Also passes all props to other components.
- LocationWeather: Most complex component of the application. It uses Axios to fetch data from open API so you can get information about weather conditions. Also it checks the typed location and throws an error if the location doesn't exist.
- WeatherCard: Simple component for typing the location and storing it in local storage.
- WeatherDisplay: Component for displaying weather data. It uses a useMemo hook so it optimizes re-render and displays data in the correct format.

## Build with

- HTML 
- CSS (used Bootstrap(https://getbootstrap.com/) and MaterialUI(https://mui.com/))
- ReactJS (require Axios for fetching weather data from open API: https://openweathermap.org/api)

## To get a local copy up and running follow these simple steps:

1. Clone the repo using the link from [GitHub](https://github.com/shile88/weather-app.git)

2. Install NPM packages using `npm install`

3. Start the project using `npm start` (open `https://localhost:3000` to view in a browser)



