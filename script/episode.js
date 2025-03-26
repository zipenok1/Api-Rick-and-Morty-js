let data = {
    'url': 'https://rickandmortyapi.com/api/episode/?'
};

const container = document.querySelector('.episode__content');
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
}

async function insertData() {
    await getData();
    await insertCards();
}

async function getData() {
    let response = await fetch(data.url);
    let responseJson = await response.json();
    data.episodes = responseJson.results; 
    console.log(data.episodes);
}

async function insertCards() {
    const arrEpisodes = data.episodes.slice(counter, counter + 8);
    let cards = '';
    
    arrEpisodes.forEach(episode => {
        cards += `
            <a href='episodesDetails.html?id=${episode.id}' class="locations__cards">
                <h3>${episode.name}</h3>
                <p>${episode.air_date}</p>
                <p>${episode.episode}</p>
            </a>
        `;
    });

    container.insertAdjacentHTML('beforeend', cards); 
    counter += arrEpisodes.length; 

    if (counter >= data.episodes.length) {
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
        
        await getData()
        container.innerHTML = '';
        counter = 0
        const arrEpisodes = data.episodes.slice(counter, counter + 8);
        if (arrEpisodes?.length > 0) {
            let cards = '';
            arrEpisodes.forEach(episode => {
                cards += `
                    <a href='episodesDetails.html?id=${episode.id}' class="locations__cards">
                        <h3>${episode.name}</h3>
                        <p>${episode.air_date}</p>
                        <p>${episode.episode}</p>
                    </a>
                `;
            }); 
            container.insertAdjacentHTML('afterbegin', cards);
        } else {
            data.url = 'https://rickandmortyapi.com/api/episode/?'
            button.style.display = 'inline-block'
        }
        counter += arrEpisodes.length; 

            if (counter >= data.episodes.length) {
                button.style.display = 'none';
            } else{
                button.style.display = 'inline-block'
            }
    }) 
}