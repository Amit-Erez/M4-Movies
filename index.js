// API: "https://www.omdbapi.com/?apikey=46d82378&s=fast"

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const showMovies = document.querySelector('.movies__list')

function filterMovies(event) {
let filter = event.target.value;
let storedArrayString = localStorage.getItem('arrayToSort');
let stringToArray = JSON.parse(storedArrayString)

if (filter === 'By_Title_A-Z') {
    stringToArraySorted = stringToArray.sort((a, b) => {
  const titleA = a.Title.replace(/^the\s+/i, '').toLowerCase();
  const titleB = b.Title.replace(/^the\s+/i, '').toLowerCase();
  return titleA.localeCompare(titleB);
});
}

else if(filter === 'By_Title_Z-A') {
    stringToArraySorted = stringToArray.sort((a, b) => {
  const titleA = a.Title.replace(/^the\s+/i, '').toLowerCase();
  const titleB = b.Title.replace(/^the\s+/i, '').toLowerCase();
  return titleB.localeCompare(titleA);
});
}

else if(filter === 'New_to_Old') {
    stringToArraySorted = stringToArray.sort((a, b) => b.Year - a.Year);
}

else {
    stringToArraySorted = stringToArray.sort((a, b) => a.Year - b.Year);
}

let sortedMoviesHTML = stringToArraySorted.map((movie) => movieHTML(movie))
showMovies.innerHTML = sortedMoviesHTML.join('');
}


function handleSearch() {
  document.getElementById('filter').value = '';
}


async function onSearchChange(event) {
document.querySelector('.movies__list--container').classList += ' movies__loading';
await delay(1000); 
document.querySelector('.movies__list--container').classList.remove('movies__loading')
handleSearch()
const entry = event.target.value;
const movies = await fetch(`https://www.omdbapi.com/?apikey=46d82378&s=${entry}`);
const moviesSearchObject = await movies.json();
const moviesArray =  moviesSearchObject.Search;
const moviesArray6 = moviesArray.filter(element => element).slice(0,6);
let moviesHTML = moviesArray6.map((movie) => movieHTML(movie))
showMovies.innerHTML = moviesHTML.join('');

let moviesArrayString = JSON.stringify(moviesArray6);
localStorage.setItem('arrayToSort', moviesArrayString)
}   



function movieHTML(movie) {
    return `<div class="movie">
            <div class="movie__card">
                <figure class="movie__poster--wrapper">
                  <a href="">
                    <img
                      src="${movie.Poster}"
                      class="movie__poster"
                      alt=""
                    />
                  </a>
                  <div class="poster__wrapper--after">
                    <P class="more__info">More Info</P>
                  </div>
                </figure>
                <h3 class="movie__title">${movie.Title}</h3>
                <p class="movie__year">${movie.Year}</p>
              </div>
            </div>
            </div>`
}







