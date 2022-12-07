import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;
const apiKey = process.env.APIKEY;

app.use(cors());

app.get("/api/weather", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city},${req.query.country}&appid=${apiKey}`
    );
    const data = await response.json();

    // Return error if city not found
    if (!response.ok) {
      res.status(404).send("Please enter a valid city/country combination");
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
