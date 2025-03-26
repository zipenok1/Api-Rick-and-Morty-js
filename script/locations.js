let data = {
    'url': 'https://rickandmortyapi.com/api/location/?'
};

const container = document.querySelector('.locations__content-cards');
const button = document.querySelector('.add-cards');
const burger = document.querySelector('#burger-checkbox')
const navbar = document.querySelector('#navbar')

burger.addEventListener('click', () => {
    if(navbar.classList.contains('activ')){
        navbar.classList.remove('activ')
    } else{
        navbar.classList.add('activ')
    }
})

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
            <a href='locationDetails.html' class="locations__cards">
                <h3>${character.name}</h3>
                <p>${character.type}</p>
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
                type: clickedCharacter.type,
                dimension: clickedCharacter.dimension,
            }
            const info = {
                residents: clickedCharacter.residents,
            }
            
            localStorage.setItem('locationsCharacter', JSON.stringify(info)); 
            localStorage.setItem('locationsTitle', JSON.stringify(title)); 
            localStorage.setItem('locationsName', JSON.stringify(titleName)); 
        });
    });
}

async function selectStatus(){
    const selectSearch = document.querySelectorAll('select')
    for(let i = 0; i <= selectSearch.length; i++){
        selectSearch[i].addEventListener('change', async function(){
            const valueSelect = this.value.toLowerCase()
            const selectName = this.innerText.split('\n')[0].toLowerCase()
            if(valueSelect == selectName){
                data.url = data.url.replace(new RegExp(`${selectName}=[^&]+&`), '');
            }
            else if(data.url.includes(selectName)) {
                data.url = data.url.replace(new RegExp(`${selectName}=[^&]+&`), `${selectName}=${valueSelect}&`);
            } 
            else{
                 data.url += `${selectName}=${valueSelect}&`
            }

            await getData()
            container.innerHTML = '';
            if (data?.characters?.length > 0) {
                let cards = '';
                data.characters.forEach(character => {
                    cards += `
                        <a href='locationDetails.html' class="locations__cards">
                            <h3>${character.name}</h3>
                            <p>${character.type}</p>
                        </a>
                    `;
                }); 
                container.insertAdjacentHTML('afterbegin', cards);
                addLocalStorage()
            } else{
                data.url = 'https://rickandmortyapi.com/api/location/?'
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
                    <a href='locationDetails.html' class="locations__cards">
                        <h3>${character.name}</h3>
                        <p>${character.type}</p>
                    </a>
                `;
            }); 
            container.insertAdjacentHTML('afterbegin', cards);
            addLocalStorage()
        } else{
            data.url = 'https://rickandmortyapi.com/api/location/?'
        }
        if (getValue){
            button.style.display = 'none';
        }
    }) 
}
  