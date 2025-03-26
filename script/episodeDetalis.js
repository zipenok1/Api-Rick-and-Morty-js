let title = localStorage.getItem('titleEpi')
let objTitle = JSON.parse(title);

let titleName = localStorage.getItem('titleNameEpi')
let objName = JSON.parse(titleName);

let character = localStorage.getItem('charactersEpi')
let objRharacter = JSON.parse(character).characters;
console.log(objRharacter);

const boxCharacter = document.querySelector('.localDetails__cards')
const boxTitle = document.querySelector('.localDetails__content-desc')
const boxTitleName = document.querySelector('.localDetails__content')

main();

async function main() {
    await insertData();
}
async function insertData() {
    await renderRharacter()
    await renderTitle()
    await renderTitleName()
}

async function renderTitleName(){
    let date = ''

        date += `
               <h2>${objName.name}</h2>
        `
        
    boxTitleName.insertAdjacentHTML('afterbegin', date); 
}

async function renderTitle(){
    let date = ''
    let key;
    for(key in objTitle){
        date += `
                <div class="localDetails-opt">
                        <p>${key}</p>
                        <p>${objTitle[key]}</p>
                    </div>
                           
        `
    } 
    boxTitle.insertAdjacentHTML('beforeend', date); 
}

async function renderRharacter(){
    let date = ''
    try{
        for(let i = 0; i < objRharacter.length; i++ ){
            let response = await fetch(objRharacter[i]);
            let responseJson = await response.json();
            console.log(responseJson);
            console.log(i);
            date += `
                    <div class="cards__content" style="background: url(${responseJson.image}) no-repeat center;">
                        <div class="cards__text">
                            <h2>${responseJson.name}</h2>
                            <p>${responseJson.species}</p>
                        </div>
                    </div>  
            `
        }
        boxCharacter.insertAdjacentHTML('beforeend', date); 
    } catch(e){
        console.log(e);
    }
}