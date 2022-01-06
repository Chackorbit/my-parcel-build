export { fetchCountries };

function fetchCountries(nameCountry) {
  return fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,flags,population,languages`,
  ).then(response => {
    return response.json();
  });
}
