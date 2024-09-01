import { useState } from "react";

const RentForm = ({ car_id, onDatesChange, onCityChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    onDatesChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    onDatesChange(startDate, e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    onCityChange(e.target.value);
  };

  return (
    <div>
      <div>
        <label>City</label>
        <select value={city} onChange={handleCityChange} required>
          <option value="">Select a city</option>
          <option value="Mostar">Mostar</option>
          <option value="Sarajevo">Sarajevo</option>
          <option value="Banja Luka">Banja Luka</option>
        </select>
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          required
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          required
        />
      </div>
    </div>
  );
};

export default RentForm;
