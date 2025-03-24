let data = {
    'url': 'https://rickandmortyapi.com/api/character'
};

const container = document.querySelector('.cards');
const button = document.querySelector('.add-cards'); 
let counter = 0; 

main();

async function main() {
    await insertData();
    addingCards();
    valueStatus()
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
            <div class="cards__content" style="background: url(${character.image}) no-repeat center;">
                <div class="cards__text">
                    <h2>${character.name}</h2>
                    <p>${character.species}</p>
                </div>
            </div>
        `;
    });

    container.insertAdjacentHTML('beforeend', cards); 
    counter += arrCharacters.length; 

    if (counter >= data.characters.length) {
        button.style.display = 'none';
    }
}

function addingCards() {
    button.addEventListener('click', () => {
        insertCards(); 
    });
}

async function valueStatus(){
    const valueSearch = document.querySelector('#search')
    valueSearch.addEventListener('input', function(){
        const getValue = this.value
        const filterCards = data.characters.filter(character => character.name.includes(getValue))
        container.innerHTML = '';
        if (filterCards.length > 0) {
            let cards = '';
            filterCards.forEach(character => {
                cards += `
                    <div class="cards__content" style="background: url(${character.image}) no-repeat center;">
                        <div class="cards__text">
                            <h2>${character.name}</h2>
                            <p>${character.species}</p>
                        </div>
                    </div>
                `;
            });
            container.insertAdjacentHTML('afterbegin', cards);
        } 
        if (getValue){
            button.style.display = 'none';
        }
    })
}
  