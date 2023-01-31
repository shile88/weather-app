import "../index.css";

import React, { useEffect, useState } from "react";

import WeatherDisplay from "./WeatherDisplay";
import axios from "axios";

const CONVERT_LOCATION_URL = `http://api.openweathermap.org/geo/1.0/direct`;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/*apikey=3480aca91389eff2e94f9f458bf45741*/

const LocationWeather = ({
  location,
  loc,
  setLocation,
  index,
  setError,
}) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoordinates = async () => {
      if (loc !== "") {
        try {
          let res = await axios.get(
            `${CONVERT_LOCATION_URL}?q=${loc}&limit=2&appid=${API_KEY}`
          );
          if (res.status === 200 && res.data.length > 0) {
            if (res.data[0].lat && res.data[0].lon) {
              setLatitude(res.data[0].lat);
              setLongitude(res.data[0].lon);
              setLoading(false);
            }
          } else {
            setLocation(location.filter(a => a !== loc));       
            throw Error(
              "Can't find location. Please check input and try again."
            );
          }
        } catch (err) {
          setLoading(false);
          setError(err.message);
        }
      }
    };
    getCoordinates();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc]);

  useEffect(() => {
    const getLocation = async () => {
      if (latitude !== null && longitude !== null) {
        try {
          let res = await axios.get(
            `${BASE_URL}?lat=${latitude}&lon=${longitude}&&appid=${API_KEY}&units=metric`
          );
          if (res.status !== 200) {
            throw Error(
              "Can't find location. Please check input and try again."
            );
          }
          setLoading(false);
          return setWeatherInfo(res);
        } catch (err) {
          setLoading(false);
          setError(err.message);
        }
      }
    };
    getLocation();
  }, [latitude, longitude, setError]);

  return (
    <>
      <div className="col-xs-12 col-md-6 col-xl-4 mt-4">
        <div
          style={{ height: "250px" }}
          className="rounded-4 bg-light shadow p-1"
        >
          {loading ? (
            <div className="d-flex align-items-center h-100 justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <WeatherDisplay
              weatherInfo={weatherInfo}
              location={location}
              setLocation={setLocation}
              index={index}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LocationWeather;
