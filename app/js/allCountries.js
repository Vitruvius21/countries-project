import * as theme from "./theme.js";
import * as dataService from "./services/dataService.js";

theme.defineTheme();

let pagingNumber = 10;

window.onload = async function () {
  const allCountries = await dataService.getAllCountries();

  const addr = new URL(window.location.href);
  const maxPageNumber = Math.ceil(allCountries.length / pagingNumber);
  const paramsPageNumber = +addr.searchParams.get("page");
  const paramsDefaultPage =
    paramsPageNumber > 0 && paramsPageNumber <= maxPageNumber
      ? paramsPageNumber
      : 1;

  const loaderImg = document.querySelector(".loader-img");
  const paginator = document.getElementById("paginator");
  let btnsCollection;
  let previousPagingTarget = null;

  loaderImg.setAttribute("style", "display:none");

  function updateCountriesData(i) {
    const countries = allCountries.slice(
      (i - 1) * pagingNumber,
      i * pagingNumber
    );

    const countriesContainer = document.querySelector(".countries");
    countriesContainer.innerHTML = "";

    countries.forEach((country) => {
      let countryDiv = document.createElement("div");
      countryDiv.innerHTML = `<h1>${country.name.common}</h1>`;
      countriesContainer.append(countryDiv);
    });
  }

  function updateHrefParams(i) {
    addr.searchParams.set("page", i);
    window.history.pushState({ path: addr.href }, "", addr.href);
  }

  function updatePaginator() {
    for (let index = 1; index <= maxPageNumber; index++) {
      const btn = document.createElement("button");
      btn.innerHTML = `${index}`;
      paginator.append(btn);

      btn.addEventListener("click", (event) => {
        for (const button of btnsCollection) {
          button.classList.remove("navigation__active-btn");
        }
        event.target.classList.add("navigation__active-btn");

        //* check for duplicate click
        if (event.target !== previousPagingTarget) {
          updateCountriesData(index);
          updateHrefParams(index);
        }
        previousPagingTarget = event.target;
      });
    }

    btnsCollection = paginator.getElementsByTagName("button");
    btnsCollection[paramsDefaultPage - 1].classList.add(
      "navigation__active-btn"
    );
  }

  window.addEventListener(
    "popstate",
    (event) => {
      const found = +event?.state?.path.match(/page=\d+/g)[0].split("=")[1];

      if (found) {
        for (const button of btnsCollection) {
          button.classList.remove("navigation__active-btn");
        }

        btnsCollection[found - 1]?.classList.add("navigation__active-btn");
      }

      updateCountriesData(found || 1);
    },
    false
  );

  updatePaginator();
  updateCountriesData(paramsDefaultPage);
  updateHrefParams(paramsDefaultPage);
};
