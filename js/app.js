

const cursosContent=document.querySelector("#cursos-content");
const ulmenudesplegable=document.querySelector("#menu-cursos-ul");

document.addEventListener('DOMContentLoaded',()=>{
    getCursos();
    MenuDesplegable();
});


  const cursosApi=[
    {
        id: 1,
        nombre:"Lenguaje",
        descripcion:"Este curso desarrolla habilidades comunicativas como la lectura, escritura, comprensión auditiva y el habla. ",
        bgcolor:"card-leng"
    },
    {
        id: 2,
        nombre:"Matemáticas",
        descripcion:"Un curso de matemáticas es una materia que estudia las relaciones entre cantidades, magnitudes, propiedades y operaciones lógicas.",
        bgcolor:"card-mat"
    },
    {
        id: 3,
        nombre:"Historia",
        descripcion:"El objetivo de estos cursos es comprender la historia como ciencia social y analizar los cambios que ha experimentado la sociedad a lo largo del tiempo.",
        bgcolor:"card-hist"
    },
   
    {
        id: 5,
        nombre:"Física",
        descripcion:"Un curso de física es una materia que estudia la ciencia natural que se encarga de analizar el funcionamiento de los componentes fundamentales del universo.",
        bgcolor:"card-cie"
    },
    {
        id: 4,
        nombre:"Geografía",
        descripcion:"Un curso de geografía es una materia de estudio que enseña sobre la ciencia que analiza los fenómenos físicos, biológicos y humanos de la Tierra.",
        bgcolor:"card-hist"
    },
    {
        id: 6,
        nombre:"Biología",
        descripcion:"Es una formación académica que estudia los seres vivos desde diferentes perspectivas, como su estructura, función, diversidad, origen, evolución, e interrelaciones.",
        bgcolor:"card-cie"
    },
    {
        id: 7,
        nombre:"Economía",
        descripcion:"Es una formación que enseña los conceptos básicos de la economía y cómo se pueden aplicar en la realidad",
        bgcolor:"card-hist"
    },
    {
        id: 8,
        nombre:"Literatura",
        descripcion:"Es un programa de estudios que se centra en el estudio de las obras literarias, sus géneros, técnicas, recursos y figuras retóricas",
        bgcolor:"card-leng"
    }


];


function getCursos(){

let cadena='';
    for(let i=0;i<cursosApi.length;i++){

    

   let urlCurso=`cursos.html?idCurso=${cursosApi[i].id}`;


        cadena+=`<div class="card ${cursosApi[i].bgcolor}" style="width: 320px">
                       
                          <div class="card-body">
                            <h5 class="card-title title-curso-card">${cursosApi[i].nombre}</h5>
                            <p class="card-text desripction-card">${cursosApi[i].descripcion}</p>
                            <div class="btn-content">
                            <a href="${urlCurso}" class="btn btn-secondary">Chatting con IA !!</a>
                            </div>
                          </div>
                        </div>`;
    }
    if(cursosContent){
    cursosContent.innerHTML=cadena;
    }
}

function MenuDesplegable(){

    let cadena='';
    
    for(let i=0;i<cursosApi.length;i++){
        let urlCurso=`cursos.html?idCurso=${cursosApi[i].id}`;
        cadena+=` <li><a href="${urlCurso}">${cursosApi[i].nombre} con IA</a></li>`;
    }
    if(ulmenudesplegable){
        ulmenudesplegable.innerHTML=cadena;
    }
}

const title2=document.querySelector('.title-info2');
const contentMejoras=document.querySelector(".content-mejoras");
const cardVentajas=document.querySelector(".content-ventajas");
const mensajeChat=document.querySelector(".mensaje-empezarchatgpt");
const listcoursos=document.querySelector(".list-courses");

const observer=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
        console.log("Ya esta visible titulo 2");
        title2.classList.add("animate__animated","animate__fadeInDown");
    }
});
const observer2= new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
        contentMejoras.classList.add("animate__animated","animate__zoomInDown");
    }
    // if(!entries[0].isIntersecting){
    //     contentMejoras.classList.remove("animate__animated","animate__zoomInDown");
    // }
});

const observer3= new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
        cardVentajas.classList.add("animate__animated","animate__zoomInUp");
    }
});

const observer4= new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
        mensajeChat.classList.add("animate__animated","animate__zoomInUp");
    }
});
const observer5= new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
        listcoursos.classList.add("animate__animated","animate__bounceInUp");
    }
});

observer.observe(title2);
observer2.observe(contentMejoras);
observer3.observe(cardVentajas);
observer4.observe(mensajeChat);
observer5.observe(listcoursos);
/*cursos js */

