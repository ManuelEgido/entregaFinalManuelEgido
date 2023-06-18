const BASE_URL = "https://rickandmortyapi.com/api/";
const CHARACTERS_URLS = "character/?page=";

const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");

let nextPage;
let prevPage;

function listarPersonajes(pagina, respuesta_lista) {
    let url = BASE_URL + CHARACTERS_URLS + pagina;
    const lista_personajes = fetch(url);
    lista_personajes
        .then(api_response => api_response.json())
        .then((api_data) => {
            respuesta_lista(api_data);
            console.log(api_data);
        })
}

function traducirStatus(status){
    if (status === 'Alive'){
        return 'Vivo';
    }
    if (status === "Dead"){
        return 'Muerto';
    }
    return 'No se sabe';
}

function popularGrilla(api_data) {
    const seccionPersonajes = document.getElementById("seccionPersonajes");
    seccionPersonajes.textContent ='';
    api_data.results.forEach(personaje => {
        const divPersonaje = document.createElement("div");
        divPersonaje.classList.add("personajeBox");
        divPersonaje.innerHTML = `
            <img src="${personaje.image}"/>
            <h2>Nombre: ${personaje.name}</h2>
            <h3>Estado: ${traducirStatus(personaje.status)}</h3>
        `;
        seccionPersonajes.append(divPersonaje);
    });
}

function haveNextPage(api_data){
    let nextString = api_data.info.next;
    if (nextString === null){
        nextPage = null;
    } else {
        let partes = nextString.split('=');
        nextPage = partes[1];
    }
}

function havePrevPage(api_data){
    let prevString = api_data.info.prev;
    if (prevString === null){
        prevPage = null;
    } else {
        let partes = prevString.split('=');
        prevPage = partes[1];
    }
}

function cargarContenido(pagina){
    let numPag = pagina?pagina:1;
    listarPersonajes(numPag,(api_data) => {
        popularGrilla(api_data);
        haveNextPage(api_data);
        havePrevPage(api_data);
    });
    
}

prevBtn.addEventListener("click", (e)=>{
    cargarContenido(prevPage);
});

nextBtn.addEventListener("click", (e) =>{
    cargarContenido(nextPage);
});

cargarContenido();