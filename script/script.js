let data = {
    'url': 'https://rickandmortyapi.com/api/character/?'
};

const container = document.querySelector('.cards');
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
}

async function insertCards() {
    
    const arrCharacters = data.characters.slice(counter, counter + 8);
    let cards = '';
    
    arrCharacters.forEach(character => {
        cards += `
            <a href='characterDetails.html?id=${character.id}' onClick=addLocalStorage class="cards__content" style="background: url(${character.image}) no-repeat center;">
                <div class="cards__text">
                    <h2>${character.name}</h2>
                    <p>${character.species}</p>
                </div>
            </a>
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

            counter = 0;
            const arrCharacters = data.characters.slice(counter, counter + 8);
          
            if (arrCharacters?.length > 0) {
               
                let cards = '';
                arrCharacters.forEach(character => {
                    cards += `
                        <a href='characterDetails.html?id=${character.id}' class="cards__content" style="background: url(${character.image}) no-repeat center;">
                            <div class="cards__text">
                                <h2>${character.name}</h2>
                                <p>${character.species}</p>
                            </div>
                        </a>
                    `;
                }); 
                container.insertAdjacentHTML('afterbegin', cards);
  
            } else{
                data.url = 'https://rickandmortyapi.com/api/character/?'
            }

            counter += arrCharacters.length; 

            if (counter >= data.characters.length) {
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

        counter = 0;
        const arrCharacters = data.characters.slice(counter, counter + 8);

        if (arrCharacters?.length > 0) {
            let cards = '';
            arrCharacters.forEach(character => {
                cards += `
                    <a href='characterDetails.html?id=${character.id}' class="cards__content" style="background: url(${character.image}) no-repeat center;">
                        <div class="cards__text">
                            <h2>${character.name}</h2>
                            <p>${character.species}</p>
                        </div>
                    </a>
                `;
            }); 
            container.insertAdjacentHTML('afterbegin', cards);
 
        } else{
            data.url = 'https://rickandmortyapi.com/api/character/?'
            button.style.display = 'inline-block'
        }
        counter += arrCharacters.length; 

            if (counter >= data.characters.length) {
                button.style.display = 'none';
            } else{
                button.style.display = 'inline-block'
            }
    }) 
}
  