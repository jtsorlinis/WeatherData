import fs from "fs";

const citiesFile = fs.readFileSync("./city.list.min.json");
const cities = JSON.parse(citiesFile);

const countriesFile = fs.readFileSync("./countries.json");
const countries = JSON.parse(countriesFile, function (k, v) {
  if (k === "Code") {
    this.value = v;
    return;
  }
  if (k === "Name") {
    this.label = v;
    return;
  }
  return v;
});

export { cities, countries };
