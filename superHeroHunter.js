// superHero Hunter Js file

//variables of public_key, private_key, base_URL, ts and hash
const public_key = 'a8e6839991943baedbdc980c952fda45';
const private_key = 'd4f849f5b3a54d5ff5dc73c268eaab9651d6b085';
const base_URL = 'https://gateway.marvel.com:443/v1/public/characters';
const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + private_key + public_key).toString();
console.log(hash);

const searchInput = document.getElementById('search-input');
const superContainer = document.getElementById('super-container');

// Here Function to Get superheroes from Marvel API
async function getSuperheroes(query) {
    const response = await fetch(`${base_URL}?ts=${ts}&apikey=${public_key}&hash=${hash}&nameStartsWith=${query}`);
    const data = await response.json();
    return data.data.results;
}

// Here Function to display superheroes
function displaySuperheroes(superheroes) {
    superContainer.innerHTML = '';
    superheroes.forEach(superhero => {
        const superheroCard = document.createElement('div');
        superheroCard.classList.add('superheroCard');

        const name = document.createElement('h3');
        name.textContent = superhero.name;

        const image = document.createElement('img');
        image.src = `${superhero.thumbnail.path}/standard_xlarge.${superhero.thumbnail.extension}`;
        image.alt = superhero.name;

        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favoriteButton');
        favoriteButton.textContent = 'Add to Favorites';
        favoriteButton.addEventListener('click', () => addToFavorites(superhero));

        //Here append elements
        superheroCard.appendChild(name);
        superheroCard.appendChild(image);
        superheroCard.appendChild(favoriteButton);
        superContainer.appendChild(superheroCard);
    });
}

// Here Function to add superhero to favorites
function addToFavorites(superhero) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(superhero);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Superhero added to favorites!');
}

// Here Event listener for search input
searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (query.length > 0) {
        const superheroes = await getSuperheroes(query);
        displaySuperheroes(superheroes);
    } else {
        superContainer.innerHTML = '';
    }
});
