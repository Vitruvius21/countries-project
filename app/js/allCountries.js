import * as theme from "./theme.js";
import * as dataService from "./services/dataService.js";

theme.defineTheme();

let pagingNumber = 10;

window.onload = async function () {
  const allCountries = await dataService.getAllCountries();
  const paginator = document.getElementById("paginator");
  let previousPagingTarget = null;

  function updateCountriesData(i = 0) {
    const countries = allCountries.slice(
      i * pagingNumber,
      (i + 1) * pagingNumber
    );

    console.log(countries);

    const countriesContainer = document.querySelector(".countries");
    countriesContainer.innerHTML = "";

    countries.forEach((country) => {
      let countryDiv = document.createElement("div");
      countryDiv.innerHTML = `<h1>${country.name.common}</h1>`;

      countriesContainer.append(countryDiv);
    });
  }

  for (
    let index = 0;
    index < Math.ceil(allCountries.length / pagingNumber);
    index++
  ) {
    const btn = document.createElement("button");
    btn.innerHTML = `${index}`;
    paginator.append(btn);

    // btn.addEventListener("click", updateCountriesData.bind(null, index) );
    btn.addEventListener("click", (event) => {
      if (event.target !== previousPagingTarget) {
        updateCountriesData(index);
      }
      previousPagingTarget = event.target;
    });
  }

  updateCountriesData();
};
