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
        console.log(plants);
        main.innerHTML+= plants.map(plant =>  `
        <li><a href="#" data-id="${plant.id}">${plant.name}</a>
        ${plant.description} - ${plant.price} - ${plant.light} - ${plant.water}
        <button data-id=${plant.id} onclick="removePlant(${plant.id})"; return false;>Delete</button>
        <button data-id=${plant.id} onclick="editPlant(${plant.id})"; return false;>Edit</button>
        </li>
        `).join('')

        attachClickToPlantLinks()
    })
}

function clearForm(){
    let plantFormDiv = document.getElementById("plant-form")
    plantFormDiv.innerHTML = ''
}

// function fetchPlants() {
//     fetch(BASE_URL+'/plants')
//     .then(resp => resp.json())
//     .then(plants => renderPlants(plants));
// }


function attachClickToPlantLinks(){
    let plants = document.querySelectorAll("li a")
    plants.forEach(plant =>{
        plant.addEventListener('click', displayPlant);
    })
}

function displayCreateForm() {
    let plantFormDiv = document.getElementById("plant-form")
    let html = `
        <form onsubmit="createPlant();return false;"></form>
        <label>Name:</label>
        <input type="text" id="name"><br>

        <label>Description:</label>
        <textarea type="text" id="description"></textarea><br>

        <label>Price:</label>
        <input type="text" id="price"><br>

        <label>Light:</label>
        <input type="text" id="light"><br>

        <label>Water</label>
        <input type="text" id="water"><br>

        <input type="submit" value="Create Plant"><br>

    `
    document.getElementById("plant-form").innerHTML = html
}

//add new  plant to database

function createPlant() {
    const plant = {
        "name": document.getElementById('name').value,
        "description": document.getElementById('description').value,
        "price": document.getElementById('price').value,
        "light": document.getElementById('light').value,
        "water": document.getElementById('water').value 
    }
    fetch(BASE_URL+'/plants',{
        method: "POST",
        body: JSON.stringify(plant),
        headers: {
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(plant => {
        document.querySelector('#main').innerHTML += `
        <li><a href="#" data-id="${plant.id}">${plant.name}</a>
        ${plant.description} - ${plant.price} - ${plant.light} - ${plant.water}
         <button data-id=${plant.id} onclick="removePlant(${plant.id})"; return false;>Delete</button>
         <button data-id=${plant.id} onclick="editPlant(${plant.id})"; return false;>Edit</button>
         </li>
        `
        attachClickToPlantLinks()
        clearForm()
    })
}

function displayPlant(e){
    e.preventDefault()
    clearForm()
    let id = this.dataset.id
    let main = document.querySelector('#main')
    main.innerHTML = ""
    fetch(BASE_URL + `/plants/${id}`)
    .then(resp => resp.json())
    .then(plant => {
        main.innerHTML += `
        <h3>${plant.description}</h3> <hr>
        <p>${plant.price} - ${plant.light} - ${plant.water}</p>
        `
    })
}

function removePlant(id){
    clearForm()
    fetch(BASE_URL + `/plants/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
}

function editPlant(id){
    clearForm()
    fetch(BASE_URL + `/plants/${id}`)
    .then(resp => resp.json())
    .then(plant => {
        let plantForm = document.getElementById("plant-form") 
        let html = `
        <form onsubmit="updatePlant(${id});return false;">
        <label>Name:</label>
        <input type="text" id="name" value="${plant.name}"><br>

        <label>Description:</label>
        <textarea type="text" id="description" value="${plant.description}"></textarea><br>

        <label>Price:</label>
        <input type="text" id="price" value="${plant.price}"><br>

        <label>Light:</label>
        <input type="text" id="light" value="${plant.light}"><br>

        <label>Water</label>
        <input type="text" id="water" value="${plant.water}"><br>

        <input type="submit" value="Update Plant"><br>
        </form>
        ` 
       
    plantForm.innerHTML = html
    })
}

function updatePlant(id){
    const plant = {
        "name": document.getElementById('name').value,
        "description": document.getElementById('description').value,
        "price": document.getElementById('price').value,
        "light": document.getElementById('light').value,
        "water": document.getElementById('water').value 
    }
    fetch(BASE_URL + `/plants/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(plant)
    })
    .then(resp => resp.json())
    .then((plant)=> {
            document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement.innerHTML =  `
            <li><a href="#" data-id="${plant.id}">${plant.name}</a>
            ${plant.description} - ${plant.price} - ${plant.light} - ${plant.water}
             <button data-id=${plant.id} onclick="removePlant(${plant.id})"; return false;>Delete</button>
             <button data-id=${plant.id} onclick="editPlant(${plant.id})"; return false;>Edit</button>
             </li>
            `
            attachClickPlantLinks()
            clearForm()
        }
    
    )
}