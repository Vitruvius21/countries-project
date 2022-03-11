import * as theme from "./theme.js";
import * as dataService from "./services/dataService.js";
import { transformNumber } from "./utils/utils.js";

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

  function createCountryElement(countryData) {
    let countryElsArray = [];
    let countryEl;

    ["div", "img", "h4", "p", "p", "p"].forEach((tag) => {
      countryElsArray.push(document.createElement(tag));
    });

    [
      "country",
      "country-flag",
      "country-name",
      "country-capital",
      "country-region",
      "country-population",
    ].forEach((clss, i) => {
      countryElsArray[i].classList.add(clss);
    });

    countryElsArray[0].setAttribute("title", countryData?.name?.common);
    countryElsArray[1].setAttribute("src", countryData?.flags?.svg);
    countryElsArray[1].setAttribute(
      "alt",
      "Flag of " + countryData?.name?.common
    );

    countryElsArray[2].innerHTML = countryData?.name?.common;
    countryElsArray[3].innerHTML = countryData?.capital;
    countryElsArray[4].innerHTML = countryData?.region;
    countryElsArray[5].innerHTML = transformNumber(+countryData?.population);

    for (let index = 1; index < countryElsArray.length; index++) {
      countryEl = countryElsArray[0];
      countryEl.appendChild(countryElsArray[index]);
    }

    return countryEl;
  }

  function updateCountriesData(i) {
    const countries = allCountries.slice(
      (i - 1) * pagingNumber,
      i * pagingNumber
    );

    const countriesContainer = document.querySelector(".countries");
    countriesContainer.innerHTML = "";

    countries.forEach((countryData, index) => {
      const countryEl = createCountryElement(countryData);
      countryEl.addEventListener(
        "click",
        navigate.bind(null, [countryEl.title])
      );
      countriesContainer.append(countryEl);
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

  //* Navigation
  function navigate(countryName) {
    const navAddr = new URL(window.location.origin);
    navAddr.pathname = "pages/profile.html";
    navAddr.searchParams.set("country", countryName);

    window.location.assign(navAddr);
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
