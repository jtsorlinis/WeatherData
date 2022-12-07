import { useEffect, useState } from "react";
import Input from "./Input";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");

  useEffect(() => {
    // Get weather description from API
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await fetch(
          `http://localhost:3001/api/weather?city=${city}&country=${country}`
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
  }, [city, country]);

  return (
    <div>
      <Input
        label="City"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Input
        label="Country"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <h3>{weatherDesc}</h3>
    </div>
  );
};

export default Weather;
