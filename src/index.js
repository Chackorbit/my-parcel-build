import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { debounce } from 'debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}50`;
}

const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

refs.inputCountry.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry() {
  const nameCountry = refs.inputCountry.value.trim();

  if (nameCountry) {
    fetchCountries(nameCountry)
      .then(countrys => {
        if (countrys.length > 6) {
          refs.countryList.innerHTML = '';
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
          const addHtml = countrys => {
            return countrys.map((country, index, array) => {
              if (array.length === 1) {
                return `<li style = 'background-color:${getRandomHexColor()}'>
              <p>Страна: <span class="name-official">${country.name.official}</span></p>
              <p>Столица: <span class="capital">${country.capital.join('')}</span></p>
              <div>Флаг: <img class="flagImg" src="${country.flags.svg}" alt="Флаг страны" /></div>
              <p>Языки: <span class="languages">${Object.values(country.languages).join(
                '',
              )}</span></p>
              <p>Население: <span class="population">${country.population}</span></p>
            </li>`;
              } else {
                return `<li style = 'background-color:${getRandomHexColor()}'>
              <div>Флаг: <img class="flagImg" src="${country.flags.svg}" alt="Флаг страны" /></div>
              <p>Страна: <span class="name-official">${country.name.official}</span></p>
            </li>`;
              }
            });
          };
          refs.countryList.innerHTML = addHtml(countrys).join('');
        }
      })
      .catch(error => {
        refs.countryList.innerHTML = '';
        Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
      });
  } else {
    refs.countryList.innerHTML = '';
  }
}
