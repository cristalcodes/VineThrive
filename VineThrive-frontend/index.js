const BASE_URL = 'http://localhost:3000'
const PLANT_URL = `${BASE_URL}/plants`
const STAGES_URL = 'http://localhost:3000/stages'


    document.addEventListener("DOMContentLoaded", ()=>{
        console.log('Dom content')
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
        let main = document.querySelector('#main');
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute("href", "all_plants")
        a.setAttribute("data-id", this.id)
        a.innerText = this.name
        // let t = document.createTextNode(this.name)
        // a.appendChild(t)

        let p = document.createElement("p");
        
        let removeButton = document.createElement("button");
        removeButton.innerHTML = "Delete"
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit"
    
        li.appendChild(a);
        li.appendChild(p);
        li.appendChild(removeButton);
        li.appendChild(editButton);
        main.appendChild(li);

        removeButton.addEventListener('click', (e) => {
            removePlant(this.id)
          });
      
        editButton.addEventListener('click', (e) => {
          editPlant(this.id)
        });
    }
}
    function getPlants(){
        console.error('originated')
      //  clearForm();
        
        fetch(PLANT_URL)
        .then(resp => resp.json())
        .then((data) => {
        
            let main = document.querySelector('#main')
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
       //let plantFormDiv = document.getElementById("plant-form")
        let html = `
            <form>
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
            </form>
        `
        
        document.getElementById("plant-form").innerHTML = html
        document.querySelector("form").addEventListener('submit', createPlant)
    }

    //add new  plant to database

    function createPlant() {
        event.preventDefault()
        let inputPlant = {
            "name": event.target.name.value,
            "description": event.target.description.value,
            "price": event.target.price.value,
            "light": event.target.light.value,
            "water": event.target.water.value 
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
            clearForm()
        })
    }

    function displayPlant(e){
        e.preventDefault()
        clearForm()
        let plant_id = event.target.dataset.id
        let main = document.querySelector('#main')
        main.innerHTML = ""

        let addButton = document.createElement("button")
        addButton.classList.add('allPlants')
        addButton.innerHTML = "All Plants"
        let navDiv = document.querySelector('#sideNav')
        navDiv.append(addButton)
        addButton.addEventListener('click', getPlants)

    // addButton.addEventListener("click", (event) => mainPlant(event), false)

        fetch(BASE_URL+`/plants/` + plant_id)
        .then(resp => resp.json())
        .then(plant =>  {
            main.innerHTML += `
            <h3>${plant.name}</h3><hr>
            <p><strong>Description: </strong>${plant.description}</p> 
            <p><strong>Price: </strong> ${plant.price}</p>
            <p><strong>Light: </strong>${plant.light}</p>
            <p><strong>Water: </strong> ${plant.water}</p>

         `
         plant.stages = {
            id: '${plant.id}',
            seed: 'Seed',
            small: 'Small',
            large: 'Large',
            plant_id: 'plantId'
        }
        //  if(plant.stages && plant.stages.length){
        //  const stageElements = plant.stages.map(stage =>{
        //     const stageModel = new Stage(stage);
        //     return stageModel.renderStage();
        //  })
        //  main.innerHTML = main.innerHTML + stageElements.join('');
            
        // }

         if(plant.stages && plant.stages){
         const stageElements = new Stage(plant.stages)
         main.innerHTML = main.innerHTML + stageElements.renderStage();
            
        }
        })
    
    }

    function removePlant(id){
        clearForm()
        fetch(PLANT_URL + `/${id}`, {
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
    function updatePlant(id) { 
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
        .then(data => {
            let plant = data 
            document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement.innerHTML =  `
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

    class Stage {
        constructor(stageObj) {
            this.id = stageObj.id
            this.seed = stageObj.seed
            this.small = stageObj.small 
            this.large = stageObj.large
            this.plantId = stageObj.plant_id
        }

        renderStage() {
            // let stagesContainer = document.querySelector('.stage-container')
            // stagesContainer.innerHTML += 
           return  `
            <div class="stage-plant" data-id="${this.id}">
                <div class="stage-container"> 

                <p>${this.seed}   <input type="checkbox" id="seed" value="seed" name="seed_value" />
                <textarea id="textarea" ></textarea></p>
                <p>${this.small}    <input type="checkbox" id="seed" value="small" name="small_value" />
                <textarea id="textarea" ></textarea></p>
                <p>${this.large}    <input type="checkbox" id="seed" value="large" name="large_value" />
                <textarea id="textarea" ></textarea></p>

                </div>
            </div>
            `
        }
    }