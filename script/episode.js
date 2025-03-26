let data = {
    'url': 'https://rickandmortyapi.com/api/episode/?'
};

const container = document.querySelector('.episode__content');
const button = document.querySelector('.add-cards'); 
let counter = 0; 

main();

async function main() {
    await insertData();
    addingCards();
    valueStatus();
}
async function insertData() {
    await getData();
    await insertCards();
}
async function getData() {
    let response = await fetch(data.url);
    let responseJson = await response.json();
    data.characters = responseJson.results;
    console.log(data.characters);
}

async function insertCards() {
    
    const arrCharacters = data.characters.slice(counter, counter + 8);
    let cards = '';
    
    arrCharacters.forEach(character => {
        cards += `
            <a href='episodesDetails.html' class="locations__cards">
                <h3>${character.name}</h3>
                <p>${character.air_date}</p>
                <p>${character.episode}</p>
            </a>
        `;
    });

    container.insertAdjacentHTML('beforeend', cards); 
    counter += arrCharacters.length; 

    addLocalStorage()

    if (counter >= data.characters.length) {
        button.style.display = 'none';
    }
}

function addingCards() {
    button.addEventListener('click', () => {
        insertCards(); 
    });
}

function getFeachUpdate(url) { 
    fetch(url)
    .then(res => res.json())
    .then((date) => setCharacter(date));
}

function addLocalStorage() {
    const cardsClick = document.querySelectorAll('.locations__cards');
    cardsClick.forEach((detals, i) => {
        detals.addEventListener('click', function() {
            console.log('привет');
            const clickedCharacter = data.characters[i];
            const titleName = {
                name: clickedCharacter.name,
            }
            const title ={
                episode: clickedCharacter.episode,
                air_date: clickedCharacter.air_date,
            }
            const info = {
                characters: clickedCharacter.characters,
            }
            localStorage.setItem('titleNameEpi', JSON.stringify(titleName)); 
            localStorage.setItem('titleEpi', JSON.stringify(title)); 
            localStorage.setItem('charactersEpi', JSON.stringify(info)); 
        });
    });
}

async function valueStatus(){
    const valueSearch = document.querySelector('#search')

    valueSearch.addEventListener('input', async function(){
        const getValue = this.value

        if(getValue.length <= 0){
            data.url = data.url.replace(/name=[^&]+&/, '');
        }
        else if(data.url.includes(`name`)) {
            data.url = data.url.replace(/name=[^&]+&/, `name=${getValue}&`);
        } 
        else{
            data.url += `name=${getValue}&`
        }
        console.log(data.url);
        await getData()
        container.innerHTML = '';
        if (data?.characters?.length > 0) {
            let cards = '';
            data.characters.forEach(character => {
                cards += `
                    <a href='episodesDetails.html'  class="locations__cards">
                        <h3>${character.name}</h3>
                        <p>${character.air_date}</p>
                        <p>${character.episode}</p>
                    </a>
                `;
            }); 
            container.insertAdjacentHTML('afterbegin', cards);
            addLocalStorage()
        } else{
            data.url = 'https://rickandmortyapi.com/api/episode/?'
        }
        if (getValue){
            button.style.display = 'none';
        }
    }) 
}
  