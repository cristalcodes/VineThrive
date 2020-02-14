window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
});

const BASE_URL = 'http://localhost:3000'

function getPlants(){
    clearForm();
    
    let main = document.querySelector('#main ul')
    main.innerHTML ='';
    fetch(BASE_URL+'/plants')
    .then(resp => resp.json())
    .then(plants => {
        main.innerHTML+= plants.map(plant =>  `
        <li><a href="#" data-id="${plant.id}">${plant.description}</a> 
        - ${plant.price} - ${plant.light} - ${plant.water}

        </li>
        `).join('')

        attachClickToPlantLinks()
    })
}

function clearForm(){
    let plantFormDiv = document.getElementById("plant-form")
    plantFormDiv.innerHTML = ''
}
