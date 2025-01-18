
document.addEventListener("DOMContentLoaded",()=>{
    ObtenerDatosCursos();
    cargarStorageChat();
    localStorage.setItem("Prueba-ia","esta es una de local storage!!");

});


const cursoText=document.querySelector(".curso-nombre");
const contentTab=document.querySelector("#nav-tabContent-cursos");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idcurso = urlParams.get('idCurso')
console.log(idcurso);

const btnEnviarMensajeAI=document.querySelector("#enviar-consulta");
const urlAPI='http://webapitest.aprendiendoconia-chatgpt.com/';
const textConsultaAPI=document.querySelector("#pregunta");
const chatContent=document.querySelector("#chatAI-content");
const limpiarChat=document.querySelector("#btn-limpar-chat");
const divAlert=document.querySelector("#idalert-file");

const dataCurso= (idcurso)?cursosApi.filter((x)=>{
    return   x.id==idcurso;
  })[0]: '';
const keyStorage=(idcurso)?idcurso+"-chat":"";
const getElementosStorage= (localStorage.getItem(keyStorage))?  JSON.parse(localStorage.getItem(keyStorage)): [];

function ObtenerDatosCursos(){


    if(cursoText){
        if(isNaN(idcurso)){      
            cursoText.textContent="Curso no encontrado";
            textConsultaAPI.disabled=true;
            btnEnviarMensajeAI.disabled=true;
            limpiarChat.disabled=true;
          return;
        }
        if(!cursosApi.some(x=>x.id==idcurso)){       
            cursoText.textContent="Curso no encontrado";
            textConsultaAPI.disabled=true;
            btnEnviarMensajeAI.disabled=true;
            limpiarChat.disabled=true;
            return;
        }
        cursoText.textContent=dataCurso.nombre;
     
    }

    
}

btnEnviarMensajeAI.addEventListener('click',()=>{
    enviarConsultaAPI();
});
let arrayStorageChat= getElementosStorage;
async function enviarConsultaAPI(){
   
    textConsultaAPI.style="border:1px solid #dee2e6";
    if(textConsultaAPI.value==""){
        textConsultaAPI.style="border:1px solid red";
        alert("Falta completar el campo en rojo");
        return;
    }
    let objbody={
        mensajeOpenIA: textConsultaAPI.value
    };
    let urlConsultaAPI=`${urlAPI}consultarAI`;
    const urlPost= new  Request(urlConsultaAPI);
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objbody)
    };
    try{
        const chatPersonContent=document.createElement('div');
        let cadenaPerson=`<div class="chat-person"><h6>Tú</h6>
                            <p>${textConsultaAPI.value}</p></div>`;
        chatPersonContent.classList.add("chat-person-content");
        chatPersonContent.innerHTML=cadenaPerson;
        chatContent.appendChild(chatPersonContent);
        CrearSpinner();
        cargarScrollChatFinal();
        const spinnerloader= document.querySelector(".loader");
        
        textConsultaAPI.disabled=true;
        btnEnviarMensajeAI.disabled=true;
        const response= await fetch(urlPost,options);
        const data= await response.json();
      
        if(data){
            let resultado= data.resultadoIA.content;
            if(!resultado || resultado==""){
                resultado="No se encontro nada acerca del tema";
                textConsultaAPI.disabled=false;
                btnEnviarMensajeAI.disabled=false;
            }
            console.log("resultado",resultado );
            const chatIA= document.createElement('div');
            let cadenaIA=`<h6>IA</h6>
                        <pre>${resultado}</pre>`;

            chatIA.classList.add("chat-ia");
            chatIA.innerHTML=cadenaIA;
            spinnerloader.remove();
            chatContent.appendChild(chatIA);
            btnEnviarMensajeAI.disabled=false;
            textConsultaAPI.disabled=false;
          
            cargarScrollChatFinal();
            /*local storage */
            
            //let itemStorage=`<div class='chat-person'>${cadenaPerson}</div><div class='chat-ia'>${cadenaIA}</div>`;
            let itemStorage={
                person: textConsultaAPI.value,
                iarespuesta: resultado
            };
            
            arrayStorageChat=[...arrayStorageChat, itemStorage];
            let arrayStringStorge= JSON.stringify(arrayStorageChat);

            if(keyStorage!=""){
                localStorage.setItem(keyStorage,arrayStringStorge);
            }
            textConsultaAPI.value="";
            
        }
    }catch(error){
        console.log("Hubo un error");
    }


}

function cargarStorageChat(){
    console.log("local storga get", getElementosStorage);
   let itemChat= localStorage.getItem(keyStorage);
   
    if(itemChat){
        let itemChatparse=JSON.parse(itemChat);
        let cadena=`<div class="chat-ia">
                                    <h6>IA</h6>
                                    <p>Hola, en que puedo ayudarte ?</p>
                                  </div>`;
     for(let i=0;i<itemChatparse.length;i++){
        cadena+=`<div class="chat-person-content"><div class="chat-person">
                                <h6>Tú</h6>
                                <p>${itemChatparse[i].person}</p>
                    </div></div>
                    <div class="chat-ia">
                            <h6>IA</h6>
                           <pre>${itemChatparse[i].iarespuesta}</pre> 
                    </div>`;
     }
        chatContent.innerHTML=cadena;
        cargarScrollChatFinal();
    }
}

function CrearSpinner(){

    const spinner= document.createElement('span');
    spinner.classList.add("loader");
    chatContent.appendChild(spinner);
}
limpiarChat.addEventListener("click",()=>{
    limpiarChatIA();
});

function limpiarChatIA(){
    chatContent.innerHTML='';
    let cadenaChatInicio=` <div class="chat-ia">
                                    <h6>IA</h6>
                                    <p>Hola, en que puedo ayudarte ?</p>
                                  </div>`
    chatContent.innerHTML=cadenaChatInicio;
    if(keyStorage!=""){
        localStorage.removeItem(keyStorage);
        localStorage.setItem(keyStorage,"");
    }


}

function cargarScrollChatFinal(){
    console.log("scroolheigth",chatContent.scrollHeight);
    let scroollheight= chatContent.scrollHeight;
    chatContent.scrollTop=scroollheight;
}

/*tab ENVIO DE IMAGE */
const fileImage=document.querySelector("#fileImage");
const btnEnviarImage=document.querySelector("#enviar-imageIA");
const txtPreguntaImage=document.querySelector("#text-preguntaImage");
const respuestaIA=document.querySelector("#texto-chatImage");

function encodeImageFileAsURL() {

var filesSelected = fileImage.files;
if (filesSelected.length > 0) {
  var fileToLoad = filesSelected[0];

  var fileReader = new FileReader();

  fileReader.onload = function(fileLoadedEvent) {
    var srcData = fileLoadedEvent.target.result; // <--- data: base64

    var newImage = document.createElement('img');
    newImage.src = srcData;
    newImage.id='imgloadImage';
    document.getElementById("content-imageload").innerHTML = newImage.outerHTML;
    //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
 
  }
  fileReader.readAsDataURL(fileToLoad);

}

}
fileImage.addEventListener("change",(e)=>{
    console.log("imagen cargada...", fileImage.files[0]);
        //validar tipo de dato solo image
    let archivoImage=fileImage.files[0];
   let validacionArchivo= validarTipoArchivo(archivoImage);
   console.log("valkidacion",validacionArchivo);
   if(validacionArchivo){
    console.log("paso validacion", validacionArchivo);
    encodeImageFileAsURL();
   }

});


btnEnviarImage.addEventListener("click",()=>{
    enviarImageAPI();
});

function validarTipoArchivo(archivo){
    const {type,size}= archivo;
    divAlert.innerHTML='';
    txtPreguntaImage.disabled=false;
    btnEnviarImage.disabled=false;
    let tamanioFile= Number(size)/(1024*1024);
    console.log("tamanio",tamanioFile);
    if(!type.includes("jpeg") && !type.includes("png")){
        divAlert.innerHTML=` <div class="alert alert-danger content-alert-image" role="alert">
                                El archivo debe ser con extensión .jpg o .png 
                                </div>`;
        txtPreguntaImage.disabled=true;
        btnEnviarImage.disabled=true;
       return false;
    }

    if(tamanioFile>6){
        divAlert.innerHTML=` <div class="alert alert-danger content-alert-image" role="alert">
        El archivo no puede ser mayor de 6MB
        </div>`;
        txtPreguntaImage.disabled=true;
        btnEnviarImage.disabled=true;
        return false;
    }

    return true;
}



async function enviarImageAPI(){

try{
    var filesSelected = fileImage.files;
    respuestaIA.innerHTML='';
    fileImage.style="border:1px solid #dee2e6";
    txtPreguntaImage.style="border: 1px solid #dee2e6";
    let aux=1;
    if(filesSelected.length<=0 ){
        aux=0;
        fileImage.style="border: 1px solid red";
    }
    if(txtPreguntaImage.value==""){
        aux=0;
        txtPreguntaImage.style="border: 1px solid red";
    }

    if(aux==0){
        alert("Falta completar los campos en rojo");
        return;
    }

    let urlConsultarImage=`${urlAPI}consultarByImage`;

    const urlPostImage= new  Request(urlConsultarImage);
           // preguntaai: txtPreguntaImage.value

    let formbody=new FormData();
    formbody.append("file0",fileImage.files[0]);
    formbody.append("preguntaai",txtPreguntaImage.value);
    const optionsImage = {
        method: "POST",
        body: formbody
    };
    const response= await fetch(urlPostImage,optionsImage);
    const data= await response.json();
    if(data){
        //if(data.estado=="success"){
        //data.resultadoIA.content;
            let resultadoMensaje= data.resultadoIA.content;
           if(resultadoMensaje!=="" && resultadoMensaje){
            respuestaIA.innerHTML=resultadoMensaje;//resultadoMensaje;
           }else{
            respuestaIA.innerHTML="No se encontro nada acerca del tema";
           }
           
       // }
    }
 
}catch(error){

    console.log("Hubo un error");
}


}