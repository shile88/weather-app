import React, { useMemo } from "react";

const WeatherDisplay = ({ weatherInfo, setLocation, index }) => {
  const storage = JSON.parse(localStorage.getItem("location")) || [];

  const weatherData = useMemo(
    function () {
      const data = {
        name: "",
        currTemp: 0,
        skyCon: "",
        speedWind: 0,
        dirWind: "",
        flag: "",
        description: "",
      };
      if (weatherInfo.status === 200 && weatherInfo.data) {
        if (weatherInfo.data.name) {
          data.name = weatherInfo.data.name;
        }
        if (weatherInfo.data.main.temp) {
          data.currTemp = weatherInfo.data.main.temp;
        }
        if (weatherInfo.data.weather[0].icon) {
          data.skyCon = weatherInfo.data.weather[0].icon;
        }
        if (weatherInfo.data.wind.speed) {
          data.speedWind = weatherInfo.data.wind.speed;
        }
        if (weatherInfo.data.wind.deg) {
          data.dirWind = weatherInfo.data.wind.deg;
        }
        if (weatherInfo.data.sys.country) {
          data.flag = weatherInfo.data.sys.country.toUpperCase();
        }
        if (weatherInfo.data.weather[0].description) {
          data.description = weatherInfo.data.weather[0].description;
        }
      }
      return data;
    },
    [weatherInfo]
  );

  const handleRemove = (index) => {
    setLocation((value) => {
      return value.filter((_, i) => i !== index);
    });
    localStorage.setItem(
      "location",
      JSON.stringify(storage.filter((_, i) => i !== index))
    );
  };

  return (
    <div className="fs-5 p-2">
      <div className="d-flex flex-row justify-content-between">
        <h3 className="float-left text-black fs-2">
          {weatherData.name.toUpperCase()}
        </h3>
        {weatherData.flag && (
          <img
            src={`https://www.countryflagicons.com/SHINY/64/${weatherData.flag}.png`}
            alt="country flag"
          />
        )}
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center fs-3 ps-1 px-1">
        <p>{Math.round(weatherData.currTemp)}°C</p>
        {weatherData.skyCon && (
          <div className="img-back rounded-4">
            <img
              className="img rounded-4"
              src={`http://openweathermap.org/img/wn/${weatherData.skyCon}@2x.png`}
              title={weatherData.description}
              alt="sky condition"
            />
          </div>
        )}

        <p>{Math.round(weatherData.speedWind)}km/h</p>
        <p style={{ transform: `rotate(${weatherData.dirWind + 90}deg)` }}>
          <i className="bi bi-arrow-right"></i>
        </p>
      </div>

      <div className="text-center border-top border-1 mt-2">
        <button
          className="btn btn-danger mt-2"
          onClick={() => handleRemove(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WeatherDisplay;
