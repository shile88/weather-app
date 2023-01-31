import "./index.css";

import { useEffect, useState } from "react";

import Header from "./components/Header";
import LocationWeather from "./components/LocationWeather";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [location, setLocation] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const storage = JSON.parse(localStorage.getItem("location")) || [];

  const handleAddClick = () => {
    setDisabled(!disabled);
  };

  useEffect(() => {
    if (storage.length > 0) {
      setLocation(storage);
      setDisabled(false);
    } else {
      setLocation([...location]);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid p-0">
      <Header />

      {disabled && (
        <div className="row m-0">
          <WeatherCard
            location={location}
            setLocation={setLocation}
            disabled={disabled}
            setDisabled={setDisabled}
            setError={setError}
          />
        </div>
      )}
      {!disabled && (
        <div className="row m-0">
          {!error &&
            location.map((val, i) => {      
                return (
                  <LocationWeather
                    key={i}
                    loc={val}
                    location={location}
                    setLocation={setLocation}
                    index={i}
                    error={error}
                    setError={setError}
                  />
                );              
            })}
          {error && (
            <div
              className="d-flex justify-content-center mt-5"
              style={{ height: "250px" }}
            >
              <div
                className="alert alert-dark d-flex align-items-center bg-light rounded-4"
                role="alert"
              >
                <i className="bi-exclamation-octagon-fill fs-2"></i>
                <strong className="mx-2 fs-4">{error}</strong>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleAddClick}
        hidden={disabled}
        className="btn btn-dark rounded-circle btn-lg fs-1 position-fixed bottom-0 end-0 mb-5 mx-5"
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
}

export default App;
