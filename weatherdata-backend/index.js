import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = 3001;
const apiKey = process.env.APIKEY;

app.get("/api/weather", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city},${req.query.country}&appid=${apiKey}`
    );
    const data = await response.json();

    // Return error if city not found
    if (!response.ok) {
      res.status(data.cod).send(data.message);
      return;
    }

    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
