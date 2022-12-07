import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";

interface SelectOption {
  label: string;
  value: string;
}

const Weather = () => {
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState<SelectOption | null>();
  const [country, setCountry] = useState<SelectOption | null>();
  const [weatherDesc, setWeatherDesc] = useState("");

  // Load country list on page load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Make the API call
        const response = await fetch("http://localhost:3001/api/countries");
        // Convert the result to json
        const results = await response.json();
        // Update the state
        setCountries(results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCountries();
  }, []);

  // Load filtered cities based on search
  const loadCities: any = (inputValue: string) => {
    // Do nothing if no country selected
    if (!country) {
      return [];
    }

    return fetch(
      `http://localhost:3001/api/cities/${country.value}/${inputValue}`
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
  };

  // Clear city when country changes
  useEffect(() => {
    setCity(null);
  }, [country]);

  // Get weather description from API
  useEffect(() => {
    if (!country || !city) {
      return;
    }
    console.log("here");
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await fetch(
          `http://localhost:3001/api/weather?city=${city.value}&country=${country.value}`
        );
        // Convert the result to plain text as it's just a description
        const description = await response.text();
        // Update the state
        setWeatherDesc(description);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [city]); // make a new call each time city changes

  return (
    <div>
      <Select
        isLoading={countries.length === 0}
        value={country}
        onChange={(option) => setCountry(option)}
        className="inputField"
        placeholder="Select a country..."
        options={countries}
      />
      <br />
      <AsyncSelect
        isDisabled={!country}
        value={city}
        onChange={(option) => setCity(option)}
        className="inputField"
        placeholder={
          !country ? "Select a country first" : "Start typing to see options..."
        }
        loadOptions={loadCities} // Should be debounced
      />
      <h3>{weatherDesc}</h3>
    </div>
  );
};

export default Weather;
