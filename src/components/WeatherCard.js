import React, { useRef } from "react";

const WeatherCard = ({ location, setLocation, disabled, setDisabled, setError }) => {
  const locationRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const locationName = locationRef.current.value
    location.push(locationName);
    setLocation([...location]);
    setDisabled(!disabled);
    localStorage.setItem("location", JSON.stringify([...location], location));
  };

  const handleClick = () => {
    locationRef.current.value = '';
  };

  return (
    <div className="col-md-8 col-lg-6 mt-5">
      <form
        onSubmit={handleSubmit}
        className=" border border-4 p-4 rounded-4 bg-light"
      >
        <input
          ref={locationRef}
          type="text"
          className="form-control mb-3 ph-size"
          placeholder="Type location and press enter"
          required
        />
       
        <div onClick={handleClick} className="btn btn-danger">
          Remove
        </div>
      </form>
    </div>
  );
};

export default WeatherCard;
