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
    data.locations = responseJson.results;
    console.log(data.locations);
}

async function insertCards() {
    
    const arrLocations = data.locations.slice(counter, counter + 8);
    let cards = '';
    
    arrLocations.forEach(locations => {
        cards += `
            <a href='locationDetails.html?id=${locations.id}' class="locations__cards">
                <h3>${locations.name}</h3>
                <p>${locations.type}</p>
            </a>
        `;
    });

    container.insertAdjacentHTML('beforeend', cards); 
    counter += arrLocations.length; 

    if (counter >= data.locations.length) {
        button.style.display = 'none';
    }
}

function addingCards() {
    button.addEventListener('click', () => {
        insertCards(); 
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

            counter = 0;
            const arrLocations = data.locations.slice(counter, counter + 8);

            if (arrLocations?.length > 0) {
                let cards = '';
                arrLocations.forEach(locations => {
                    cards += `
                        <a href='locationDetails.html?id=${locations.id}' class="locations__cards">
                            <h3>${locations.name}</h3>
                            <p>${locations.type}</p>
                        </a>
                    `;
                }); 
                container.insertAdjacentHTML('afterbegin', cards);
            } else{
                data.url = 'https://rickandmortyapi.com/api/location/?'
            }
            counter += arrLocations.length; 

            if (counter >= data.locations.length) {
                button.style.display = 'none';
            } else{
                button.style.display = 'inline-block'
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

        counter = 0;
        const arrLocations = data.locations.slice(counter, counter + 8);

        if (arrLocations?.length > 0) {
            let cards = '';
            arrLocations.forEach(locations => {
                cards += `
                    <a href='locationDetails.html?id=${locations.id}' class="locations__cards">
                        <h3>${locations.name}</h3>
                        <p>${locations.type}</p>
                    </a>
                `;
            }); 
            container.insertAdjacentHTML('afterbegin', cards);

        } else{
            data.url = 'https://rickandmortyapi.com/api/location/?'
            button.style.display = 'inline-block'
        }
        counter += arrLocations.length; 

            if (counter >= data.locations.length) {
                button.style.display = 'none';
            } else{
                button.style.display = 'inline-block'
            }
    }) 
}
  