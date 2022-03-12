import * as theme from "./theme.js";
import { getCountry } from "./services/dataService.js";
import { loadGoogleMap } from "./services/googleMapService.js";

theme.defineTheme();

const addr = new URL(window.location.href);
const countryName = addr.searchParams.get("country");

window.onload = async function () {
  const country = await getCountry(countryName);
  const countryData = document.createElement("p");

  countryData.innerHTML = JSON.stringify(country);

  loadGoogleMap(country, "gmap_canvas");

  console.log(country);

  document.querySelector(".main").append(countryData);
};
