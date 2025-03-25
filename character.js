let title = localStorage.getItem('titleDate')
let objTitle = JSON.parse(title);
console.log(objTitle);

let data = localStorage.getItem('characterData')
let objData = JSON.parse(data);

let episodes = localStorage.getItem('episodeData')
let objEpisodes = JSON.parse(episodes).episode;

const boxCharacter = document.querySelector('.informayin__details-left')
const boxEpisodes = document.querySelector('.informayin__details-right')
const boxTitle = document.querySelector('.coverDetails__content')

main();

async function main() {
    await insertData();
}
async function insertData() {
    await renderingInfo();
    await renderEpisodes()
    await renderTitle()
}

async function renderTitle(){
    let date = ''

        date += `
                    <img src="${objTitle.image}" alt="cover">
                    <p>${objTitle.name}z</p>
   
        `
    
       
    boxTitle.insertAdjacentHTML('beforeend', date); 
}

async function renderingInfo(){
    let date = ''
    let key;
    for(key in objData){
        date += `
                <div class="informayin__details-box">
                    <h3>${key}</h3>
                    <p>${objData[key]}</p>
                </div>
               
        `
    }
       
    boxCharacter.insertAdjacentHTML('beforeend', date); 
}
async function renderEpisodes(){
    let date = ''
    try{
        for(let i = 0; i < objEpisodes.length; i++ ){
            let response = await fetch(objEpisodes[i]);
            let responseJson = await response.json();
            console.log(i);
            date += `
                    <div class="informayin__details-box">
                        <h3>${responseJson.episode}</h3>
                        <p>${responseJson.name}</p>
                        <p>${responseJson.air_date}</p>
                    </div>    
            `
            
        }
        boxEpisodes.insertAdjacentHTML('beforeend', date); 
    } catch(e){
        console.log(e);
    }
    
       
   
}