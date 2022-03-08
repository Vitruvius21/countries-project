import * as theme from "./theme.js";
import * as dataService from "./services/dataService.js";
import * as utils from "./utils/utils.js";

theme.defineTheme();

window.onload = async function () {
  const allCountries = await dataService.getAllCountries();
  const sovereigCountries = allCountries.filter((country) => {
    return country?.unMember;
  });
  console.log("data", sovereigCountries);

  const loaderImg = document.querySelector(".loader-img");
  const card = document.querySelector(".main__section-card");
  const cardTitle = document.createElement("h4");
  const cardImg = document.createElement("img");
  const cardText = document.createElement("p");

  loaderImg.setAttribute("style", "display:none");
  cardTitle.className = "main__section-card-heading";
  cardImg.className = "main__section-card-img";
  cardText.className = "main__section-card-text";

  function updateCardData() {
    let rndIndex = utils.getRndInteger({ max: sovereigCountries.length });
    let rndCountry = sovereigCountries[rndIndex];

    console.log(rndIndex);

    cardTitle.innerHTML = rndCountry?.name?.common;
    cardImg.src = rndCountry?.flags?.svg;
    cardImg.alt = `${rndCountry?.name?.common} flag`;
    cardText.innerHTML = `${
      rndCountry?.name?.common
    } is the UN member country in ${
      rndCountry?.continents?.[0]
    }, with the capital city in ${
      rndCountry?.capital?.[0]
    }. The country has a territory of  ${utils.transformNumber(
      rndCountry?.area
    )} km² and a population of ${utils.transformNumber(
      rndCountry?.population
    )} people.`;

    card.append(cardTitle, cardImg, cardText);
  }

  const randomiseBtn = document.getElementById("rand");
  randomiseBtn.addEventListener("click", updateCardData);

  updateCardData();
};
