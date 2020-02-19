const BASE_URL = 'http://localhost:3000'
const PLANT_URL = `${BASE_URL}/plants`


    document.addEventListener("DOMContentLoaded", ()=>{
        getPlants();
    })

    function clearForm(){
        let plantFormDiv = document.getElementById("plant-form")
        plantFormDiv.innerHTML = ''
    }
  
  class Plant {
    constructor(plant) {
        this.id = plant.id
        this.name = plant.name 
        this.description = plant.description    
        this.price = plant.price
        this.light = plant.light
        this.water = plant.water
    }

    renderPlant() {
        let main = document.querySelector('#main ul');
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute("href", "all_plants")
        a.setAttribute("data-id", this.id)
        a.innerText = this.name
        // let t = document.createTextNode(this.name)
        // a.appendChild(t)

        let p = document.createElement("p");
        p.innerHTML = `${this.description} - ${this.price} - ${this.light} - ${this.water}`
        
        let removeButton = document.createElement("button");
        let editButton = document.createElement("button");

        removeButton.addEventListener('click', (e) => {
            removeButton(this.id)
          });
      
        editButton.addEventListener('click', (e) => {
          editButton(this.id)
        });
    
        li.appendChild(a);
        li.appendChild(p);
        li.appendChild(removeButton);
        li.appendChild(editButton);
        main.appendChild(li) 

    }
}
    function getPlants(){
        clearForm();
        
        fetch(PLANT_URL)
        .then(resp => resp.json())
        .then((data) => {
        
            let main = document.querySelector('#main ul')
            main.innerHTML ='';
            data.forEach(plant => {
                let newPlant= new Plant(plant);
                newPlant.renderPlant();
                });

            attachClickToPlantLinks()
        })
    }

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
        let inputPlant = {
            "name": document.getElementById('name').value,
            "description": document.getElementById('description').value,
            "price": document.getElementById('price').value,
            "light": document.getElementById('light').value,
            "water": document.getElementById('water').value 
        }
        fetch(PLANT_URL,{
            method: "POST",
            body: JSON.stringify(inputPlant),
            headers: {
                'Content-Type': 'application/json' ,
                'Accept': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(plant => {
            let newPlant = new Plant(plant);
        newPlant.renderPlant();
        
            document.querySelector('#main').innerHTML += `
            <li><a href="all_plants" data-id="${plant.id}">${plant.name}</a>
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
        let plant_id = event.target.dataset.id
        let main = document.querySelector('#main')
        main.innerHTML = ""
        fetch(BASE_URL+`/plants/` + plant_id)
        .then(resp => resp.json())
        .then(plant =>  {
            main.innerHTML += `
            <h3>${plant.name}</h3> <hr>
            <p>${plant.description}</p> <hr>
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

  
