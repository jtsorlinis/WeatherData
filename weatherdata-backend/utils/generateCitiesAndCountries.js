import fs from "fs";

const citiesFile = fs.readFileSync("./city.list.min.json");
const cities = JSON.parse(citiesFile);

const countriesFile = fs.readFileSync("./countries.json");
const countries = JSON.parse(countriesFile);

export { cities, countries };
