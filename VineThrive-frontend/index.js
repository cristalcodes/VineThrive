const BASE_URL = 'http://localhost:3000'
const PLANT_URL = `${BASE_URL}/plants`
const STAGES_URL = `${BASE_URL}/stages`


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
            let stages = new Stage(plant.stages)
            stages.renderStages();
        })
        
        main.append()
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

    function getStage() {
        fetch(STAGES_URL)
        .then(resp => resp.json())
        .then(data => {
        
            let main = document.querySelector('#main')
            main.innerHTML ='';
            data.forEach(stage => {
                let newStage= new Stage(stage);
                newStage.renderStage();
                });

            clearStageForm();
        })  
    }
    class Stage {
        constructor(stages) {
            this.id = stages.id
            this.name = stages.name
            this.reached = stages.reached
            this.notes = stages.notes
            this.plant_id = stages.plant_id
        }

        renderStages() {
            //console.log(this.seed)
            let stageDiv = document.createElement('div');
            stageDiv.classList.add("stages-container");
            //stageDiv.appendChild('#main')
            if(typeof this.name !== 'undefined'){
                let p1 = document.createElement('p');
                let p1txt = document.createTextNode(this.name);
           
                p1.appendChild(p1txt);
                stageDiv.appendChild(p1);
            }

            if(typeof this.reached!== 'undefined'){
                let p2 = document.createElement('p');
                let p2txt = document.createTextNode(this.name);
                p2.appendChild(p2txt);
                stageDiv.appendChild(p2);
            }

            if(typeof this.notes!== 'undefined'){
                let p3 = document.createElement('p');
                let p3txt = document.createTextNode(this.notes);
                p3.appendChild(p3txt);
                stageDiv.appendChild(p3);
            }

            let stageButton = document.createElement("button");
            let stageButtonTxt = document.createTextNode('Add Stage');
            stageButton.appendChild(stageButtonTxt);

            stageButton.addEventListener('click', (e) => {
                displayStageForm(e, this.plant_id);
            });
            document.getElementById("main").appendChild(stageButton);
            document.getElementById("main").appendChild(stageDiv);
        }
    }

    function displayStageForm(event, plant_id){
        event.preventDefault();
        let stageFormDiv = document.createElement("div");
        stageFormDiv.id = "stage-form";
        document.getElementById('main').appendChild(stageFormDiv);

        let html = `
        <form onsubmit="updateStage(); return false;">
        <input id="plant_id" name="plant_id" type="hidden" value="${plant_id}">
            <p>Seed Stage <input type="checkbox" id="seed" value="seed" name="seed_value"/>
            <p>Small Stage <input type="checkbox" id="seed" value="small" name="small_value"/>
            <p>Large Stage <input type="checkbox" id="seed" value="large" name="large_value"/>
            <br>
            <br>
            <label> Notes: </label>
            <textarea id="textarea" name="notes" ></textarea></p>
        <input type="submit" value="Update Stage">
        </form>
        `
        stageFormDiv.innerHTML = html
    
        stageFormDiv.addEventListener('submit', updateStage);

    }

    function updateStage() {
        //event.preventDefault()
        let inputStage = {
            "plant_id": event.target.plant_id.value,
            "name": event.target.seed_value.value,
            "reached": event.target.small_value.value,
            "notes": event.target.notes.value
        }
        fetch(STAGES_URL,{
            method: "PATCH",
            body: JSON.stringify(inputStage),
            headers: {
                'Content-Type': 'application/json' ,
                'Accept': 'application/json'
            }
        })
        .then(resp => {
            console.log(resp);
        })
        .then(stage => {
            let newStage = new Stage(stage);
            newStage.renderStages();
            clearStageForm()
        })
    }

    function clearStageForm(){
        let stageFormDiv = document.getElementById("stage-form")
        stageFormDiv.innerHTML = ''
    }