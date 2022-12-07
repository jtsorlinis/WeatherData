import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { cities, countries } from "./utils/generateCitiesAndCountries.js";

dotenv.config();

const app = express();
const port = 3001;
const apiKey = process.env.APIKEY; // Store API key in gitignored .env file

// Add cors middleware to prevent cors issues locally
app.use(cors());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each key to 100 requests every minute
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get("/api/countries", async (req, res) => {
  res.json(countries);
});

app.get("/api/cities/:countryCode/:searchVal", async (req, res) => {
  const country = req.params.countryCode;
  const searchVal = req.params.searchVal;

  // Filter by country and search input
  let filteredCities = cities.filter(
    (city) =>
      city.country === country &&
      city.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  // Convert to label/value pairs
  filteredCities = filteredCities.map((city) => {
    return {
      label: city.name,
      value: city.name,
    };
  });

  // Remove duplicates if any
  filteredCities = [...new Set(filteredCities)];

  // Sort alphabetically
  filteredCities.sort((a, b) => (a.name > b.name ? 1 : -1));

  // Only return first 100 rows for performance
  res.json(filteredCities.slice(0, 100));
});

app.get("/api/weather", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city},${req.query.country}&appid=${apiKey}`
    );
    const data = await response.json();

    // Return error if city not found
    if (!response.ok) {
      res.send("Please enter a valid city/country combination");
      return;
    }

    // Only send back description
    res.send(data.weather[0].description);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
