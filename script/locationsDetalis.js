let params = new URLSearchParams(document.location.search);
let id = params.get('id'); 
console.log(id);

let locationData = {
    'url': `https://rickandmortyapi.com/api/location/${id}` 
};

const boxCharacter = document.querySelector('.localDetails__cards');
const boxTitle = document.querySelector('.localDetails__content-desc');
const boxTitleName = document.querySelector('.localDetails__content');
const burger = document.querySelector('#burger-checkbox');
const navbar = document.querySelector('#navbar');

const residentsLoader = document.createElement('div');
residentsLoader.innerHTML = `<p>Loading residents...</p>`;

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
        let response = await fetch(locationData.url);
        let location = await response.json();      
        console.log(location.residents);
        renderLocationName(location);
        renderLocationInfo(location);
        await renderResidents(location.residents);
       
    } catch(e) {
        console.log(e);
    }
}

function renderLocationName(location) {
    let date = `<h2>${location.name}</h2>`
    boxTitleName.insertAdjacentHTML('afterbegin', date); 
}

function renderLocationInfo(location) {
    let info = {
        type: location.type,
        dimension: location.dimension
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

async function renderResidents(residents) {
    let date = '';
    try {
        
        residentsLoader.style.display = 'flex';
        residentsLoader.style.fontSize = '30px';
        residentsLoader.style.fontFamily = 'Roboto'
        boxCharacter.innerHTML = '';
        boxCharacter.appendChild(residentsLoader);
        
        for(let i = 0; i < residents.length; i++) {
            let response = await fetch(residents[i]);
            let resident = await response.json();
            
            date += `
                <a href='characterDetails.html?id=${resident.id}' class="cards__content" style="background: url(${resident.image}) no-repeat center;">
                    <div class="cards__text">
                        <h2>${resident.name}</h2>
                        <p>${resident.species}</p>
                    </div>
                </a>  
            `;
        }
        boxCharacter.insertAdjacentHTML('beforeend', date);    
    } catch(e) {
        console.log(e);
    } finally {
        residentsLoader.style.display = 'none';
    }
}