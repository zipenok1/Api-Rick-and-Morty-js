let data = {
    'url': 'https://rickandmortyapi.com/api/character/?'
};

const container = document.querySelector('.cards');
const button = document.querySelector('.add-cards'); 
let counter = 0; 

main();

async function main() {
    await insertData();
    addingCards();
    valueStatus();
    selectStatus();
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

function getFeachUpdate(url) { 
    fetch(url)
    .then(res => res.json())
    .then((date) => setCharacter(date));
}

async function selectStatus(){
    const selectSearch = document.querySelectorAll('select')
    for(let i = 0; i <= selectSearch.length; i++){
        selectSearch[i].addEventListener('change', async function(){
            const valueSelect = this.value.toLowerCase()
            const selectName = this.innerText.split('\n')[0].toLowerCase()
            console.log(valueSelect, selectName);
            if(valueSelect == selectName){
                data.url = data.url.replace(new RegExp(`${selectName}=[^&]+&`), '');
            }
            else if(data.url.includes(selectName)) {
                data.url = data.url.replace(new RegExp(`${selectName}=[^&]+&`), `${selectName}=${valueSelect}&`);
            } 
            else{
                 data.url += `${selectName}=${valueSelect}&`
            }

           
            console.log(data.url);
            await getData()
            container.innerHTML = '';
            if (data?.characters?.length > 0) {
                let cards = '';
                data.characters.forEach(character => {
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
            } else{
                data.url = 'https://rickandmortyapi.com/api/character/?'
            }
            if (valueSelect){
                button.style.display = 'none';
            }
            } )
    }
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
                    <div class="cards__content" style="background: url(${character.image}) no-repeat center;">
                        <div class="cards__text">
                            <h2>${character.name}</h2>
                            <p>${character.species}</p>
                        </div>
                    </div>
                `;
            }); 
            container.insertAdjacentHTML('afterbegin', cards);
        } else{
            data.url = 'https://rickandmortyapi.com/api/character/?'
        }
        if (getValue){
            button.style.display = 'none';
        }
    }) 
}
  