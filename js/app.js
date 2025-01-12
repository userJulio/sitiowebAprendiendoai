

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
                            <a href="${urlCurso}" class="btn btn-secondary">Empieza ya !!</a>
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
        cadena+=` <li><a href="${urlCurso}">${cursosApi[i].nombre}</a></li>`;
    }
    if(ulmenudesplegable){
        ulmenudesplegable.innerHTML=cadena;
    }
}



/*cursos js */

