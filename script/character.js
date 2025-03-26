let params = new URLSearchParams(document.location.search);
let id = params.get('id'); // Получаем ID из URL
console.log(id);

let charact = {
    'url': `https://rickandmortyapi.com/api/character/${id}` // Исправленный URL для одного персонажа
};

const boxCharacter = document.querySelector('.informayin__details-left');
const boxEpisodes = document.querySelector('.informayin__details-right');
const boxTitle = document.querySelector('.coverDetails__content');
const burger = document.querySelector('#burger-checkbox');
const navbar = document.querySelector('#navbar');

burger.addEventListener('click', () => {
    if(navbar.classList.contains('activ')){
        navbar.classList.remove('activ')
    } else{
        navbar.classList.add('activ')
    }
})

main();

async function main() {
    await insertData();
}

async function insertData() {
    await renderingData();
}

async function renderingData() {
    try {
        
        let response = await fetch(charact.url);
        let character = await response.json();
        console.log(character);
       
        renderTitle(character);

        renderInfo(character);
   
        await renderEpisodes(character.episode);

    } catch(e) {
        console.log(e);
    }
}

function renderTitle(character) {
    let date = `
        <img src="${character.image}" alt="cover">
        <p>${character.name}</p>
    `;
    boxTitle.insertAdjacentHTML('beforeend', date); 
}

function renderInfo(character) {
    let info = {
        gender: character.gender,
        status: character.status,
        species: character.species,
        origin: character.origin.name,
        type: character.type || 'unknown',
        location: character.location.name
    };   
    let date = '';
    for(let key in info) {
        date += `
            <div class="informayin__details-box">
                <h3>${key}</h3>
                <p>${info[key]}</p>
            </div>          
        `;
    }
    boxCharacter.insertAdjacentHTML('beforeend', date); 
}

async function renderEpisodes(episodes) {
    let date = '';
    try {
        for(let i = 0; i < episodes.length; i++) {
            let response = await fetch(episodes[i]);
            let episode = await response.json();
            
            date += `
                <div class="informayin__details-box">
                    <a href='episodesDetails.html?id=${episode.id}'>
                        <h3>${episode.episode}</h3>
                        <p>${episode.name}</p>
                        <p>${episode.air_date}</p>
                    </a>  
                </div>    
            `;
        }
        boxEpisodes.insertAdjacentHTML('beforeend', date); 
    } catch(e) {
        console.log(e);
    }
}