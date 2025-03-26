let params = new URLSearchParams(document.location.search);
let id = params.get('id'); 
console.log(id);

let episodeData = {
    'url': `https://rickandmortyapi.com/api/episode/${id}` 
};

const boxCharacter = document.querySelector('.localDetails__cards');
const boxTitle = document.querySelector('.localDetails__content-desc');
const boxTitleName = document.querySelector('.localDetails__content');
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
    await renderingInfo();
}

async function renderingInfo() {
    try {

        let response = await fetch(episodeData.url);
        let episode = await response.json();
        
        renderEpisodeName(episode);
        
        renderEpisodeInfo(episode);
        
        await renderCharacters(episode.characters);
    } catch(e) {
        console.log(e);
    }
}

function renderEpisodeName(episode) {
    let date = `<h2>${episode.name}</h2>`;

    boxTitleName.insertAdjacentHTML('afterbegin', date); 
}

function renderEpisodeInfo(episode) {
    let info = {
        episode: episode.episode,
        air_date: episode.air_date
    };
    
    let date = '';
    for(let key in info) {
        date += `
            <div class="localDetails-opt">
                <p>${key}</p>
                <p>${info[key]}</p>
            </div>
        `;
    }

    boxTitle.insertAdjacentHTML('beforeend', date); 
}

async function renderCharacters(characters) {
    let date = '';
    try {
        for(let i = 0; i < characters.length; i++) {
            let response = await fetch(characters[i]);
            let character = await response.json();
            
            date += `
                <a href='characterDetails.html?id=${character.id}' class="cards__content" style="background: url(${character.image}) no-repeat center;">
                    <div class="cards__text">
                        <h2>${character.name}</h2>
                        <p>${character.species}</p>
                    </div>
                </ф>  
            `;
        }

        boxCharacter.insertAdjacentHTML('beforeend', date); 
    } catch(e) {
        console.log(e);
    }
}