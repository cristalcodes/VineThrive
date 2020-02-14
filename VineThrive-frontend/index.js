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

    })
}

