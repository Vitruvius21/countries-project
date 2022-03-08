// function calculate(area) {
//   if (area > 1_000_000) {
//     return "3";
//   } else if (area > 300_000) {
//     return "5";
//   } else {
//     return "7";
//   }
// }
const ENDPOINT = "https://restcountries.com/v3.1";

function getData({ countryName } = {}) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();

    if (countryName) {
      xhttp.open("GET", `${ENDPOINT}/name/${countryName}`);
    } else {
      xhttp.open("GET", `${ENDPOINT}/all`);
    }

    xhttp.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhttp.response));
      } else {
        reject({
          status: this.status,
          statusText: xhttp.statusText,
        });
      }
    };

    xhttp.onerror = function () {
      reject({
        status: this.status,
        statusText: xhttp.statusText,
      });
    };

    xhttp.send();
  });
}

export function getCountry(countryName) {
  return getData({ countryName });
}

export function getAllCountries() {
  return getData();
}

// console.log("loadDoc called");

// const xhttp = new XMLHttpRequest();
// xhttp.onload = function () {
//   // document.getElementById("demo").innerHTML = this.responseText;
//   data = JSON.parse(this.responseText);

//   console.log("xhttp called", data);

//   // let map = document.getElementById("gmap_canvas");
//   // console.log(data);
//   // map.setAttribute(
//   //   "src",
//   //   "https://maps.google.com/maps?q=" +
//   //     data[0].latlng[0] +
//   //     ", " +
//   //     data[0].latlng[1] +
//   //     `&t=&z=${calculate(data[0].area)}&ie=UTF8&iwloc=&output=embed`
//   // );
//   // src="https://maps.google.com/maps?q=usa&t=&z=5&ie=UTF8&iwloc=&output=embed"
// };
// }