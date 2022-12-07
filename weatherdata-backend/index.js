import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const port = 3001;
const apiKey = process.env.APIKEY; // Store API key in gitignored environment variable

// Add cors to prevent cors issues locally
app.use(cors());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each key to 100 requests every minute
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

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
