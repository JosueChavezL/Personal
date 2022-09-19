let btnMsg = document.getElementById("btnMsg");
let campoEmail = document.getElementById("inputEmail");
let campoNombreC = document.getElementById("inputNameC");
let msgArea = document.getElementById("msgArea");

let flagArroba;//Para validacion interna de correo electronico
let flagPunto;//Para validacion interna de correo electronico
let flag1;//para validacion general antes de enviar correo

btnMsg.addEventListener("click", function(e){
e.preventDefault();

flag1 = true;
flagArroba = false;
flagPunto = false;
let asunto = "";

let email = document.getElementById("inputEmail").value;
let nameContact = document.getElementById("inputNameC").value;
let checkUrgency = document.getElementById("checkUrgency");
let msg = document.getElementById("msgArea").value;

if(email.length > 3 && email.length < 80){
      
    for (let i = 0; i < email.length; i++) {

            if(flagArroba == false && email.charCodeAt(i)==64){
                flagArroba=true;
            }
            if(flagPunto == false && email.charCodeAt(i)==46){
                flagPunto=true;
            }  
            if(flagArroba && flagPunto){
                break;
            }  
           
        }          
    
}//valida campo email en busca de @ y un .

if (flagArroba == false || flagPunto == false){

    campoEmail.classList.remove("is-valid");
    campoEmail.classList.add("is-invalid");
    flag1=false;
}
else {
    campoEmail.classList.remove("is-invalid");
    campoEmail.classList.add("is-valid");

}//Validar campo email

if (nameContact.length < 3 || nameContact.length > 80 || !isNaN(nameContact)){

    campoNombreC.classList.remove("is-valid");
    campoNombreC.classList.add("is-invalid");
    flag1=false;
}else{
    campoNombreC.classList.remove("is-invalid");
    campoNombreC.classList.add("is-valid");

}//Validar nombre del usuario

if(msg.length < 5 || msg.length > 500){
    msgArea.classList.remove("is-valid");
    msgArea.classList.add("is-invalid");
    flag1=false;
}else{
    msgArea.classList.remove("is-invalid");
    msgArea.classList.add("is-valid");
}//Validar area de mensaje.

if (flag1){

    if (checkUrgency.checked){
        asunto = "URGENTE - Nueva pregunta Formulario Contacto";
       }else {
        asunto = "Nueva pregunta Formulario Contacto";
       }
       let cuerpoCorreo = "El cliente: " + nameContact + " con correo: " + email + " envía el siguiente mensaje: " + msg; 
     Email.send({
        Host : "smtp.elasticemail.com",
        Username : "hola.drlomito@gmail.com",
        Password : "D2688BAD0F83F061575A92C02049DCD40FEE",
        To : "hola.drlomito@gmail.com",
        From : "hola.drlomito@gmail.com",
        Subject : asunto,
        Body : cuerpoCorreo
    }).then(
      message => alert("Correo enviado con éxito")
    );
}//Enviar correo


});//add event listener boton send
