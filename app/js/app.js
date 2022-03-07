import * as theme from "./theme.js";
import * as dataService from "./dataService.js";

theme.defineTheme();

window.onload = async function () {
  console.log("aaa");

  let result = await dataService.getCountry("france");
  let result2 = await dataService.getAllCountries();
  console.log("data", result2);

  const card = document.querySelector(".main__section-card");

  card.innerHTML =
    '<div class="main__section-card-title">' + result[0].name.common + "</div>";
};
