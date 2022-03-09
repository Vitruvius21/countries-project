import * as theme from "./theme.js";
import * as dataService from "./services/dataService.js";

theme.defineTheme();

const addr = new URL(window.location.href);
const countryName = addr.searchParams.get("country");

dataService.getCountry(countryName).then((cntr) => {
  const countryData = document.createElement("p");

  countryData.innerHTML = JSON.stringify(cntr[0]);

  console.log(cntr[0]);
  document.body.append(countryData);
});
