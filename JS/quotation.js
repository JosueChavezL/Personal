let btnQuote = document.getElementById("btnQuote");
let btnPrint = document.getElementById("btnPrint");
let flag; // Para validacion general


let campoName = document.getElementById("inputName");
let campoApellido = document.getElementById("inputLastName");  
let campoHours = document.getElementById("inputHours");

window.addEventListener("load", function(){
    btnPrint.classList.add("disabled");
    document.getElementById("inputName").focus();
})


btnQuote.addEventListener("click", function (e){
    e.preventDefault();

    flag = true;    

    let name = document.getElementById("inputName").value;
    let lastName = document.getElementById("inputLastName").value;
  
    let hours = parseInt( document.getElementById("inputHours").value);
    let rate = 250;   

    let extrasIndex = document.getElementById("inputExtras");//Leemos el select
    

    let changes = parseFloat(document.getElementById("inputChanges").value);//Lee el porcentaje de cambios

    let cardText = document.getElementById("cardText");
    let cardText2 = document.getElementById("cardText2");
    let cardCost = document.getElementById("cardCost");
    let cardTitle = document.getElementById("cardTitle");
    let checkIVA = document.getElementById("checkIVA").checked;//Lee el estado del checkbox
   
    
      
    let fixedCost = 150 ;//Se define porcentaje de gastos fijos, x por cada 8 hrs

    
  
    changes = (isNaN(changes)?0:changes); //Si el usuario no solicita % de cambios entonces se queda en ceros
    
    if(name.length < 3 || name.length > 30 || !isNaN(name)){
        campoName.classList.remove("is-valid");
        campoName.classList.add("is-invalid");
        flag=false;

    }else{
        campoName.classList.remove("is-invalid");
        campoName.classList.add("is-valid");

    }//Validar campo nombre

    if(lastName.length < 3 || lastName.length > 60 || !isNaN(lastName)){
        campoApellido.classList.remove("is-valid");
        campoApellido.classList.add("is-invalid");
        flag=false;

    }else{
        campoApellido.classList.remove("is-invalid");
        campoApellido.classList.add("is-valid");

    }//Validar campo Apellido
    
    if (isNaN(hours) || hours == 0){
        campoHours.classList.remove("is-valid");
        campoHours.classList.add("is-invalid");
        flag=false;
    }
    else{
        campoHours.classList.remove("is-invalid");
        campoHours.classList.add("is-valid");
    }

    if(extrasIndex.selectedIndex == -1){
        extrasIndex.classList.remove("is-valid");
        extrasIndex.classList.add("is-invalid");
        flag=false;
    }else{
        extrasIndex.classList.remove("is-invalid");
        extrasIndex.classList.add("is-valid");

    }//valida que al menos 1 elemento esté seleccionado.
    
    if (flag){
    
    cardTitle.innerHTML = `Dear ${name} ${lastName}`;
    cardText.innerHTML = `</br>Thank you for using this quote tool!</br>Please find below your requirements for this quotation:<br/> ${getRequirements(extrasIndex, hours, rate, changes)}`;
    cardCost.innerHTML = "<strong> Total: $" + quote(hours,rate,checkIVA, extrasIndex, changes, fixedCost).toFixed(2) + " mxn </strong>";
    cardText2.innerHTML = `</br>Feel free to use this tool as many times as you want, if there's any question, don't hesitate to send it to me using "Contact" page form, and I will reply asap.`;
    btnPrint.classList.remove("disabled");

    }else{

    cardTitle.innerHTML = "";
    cardText.innerHTML = "";
    cardText2.innerHTML = "";
    cardCost.innerHTML = "";
    btnPrint.classList.add("disabled");

    }


});

btnPrint.addEventListener("click", function (e){
    e.preventDefault;
    window.print();
})

const getRequirements = (ex, h, r, changes) => {
    let str = `<br> <ul class="list-group col-4">`;
    str += `<li class="list-group-item list-group-item-action"> + ${h} hours x $${r} per hour </li>`;
    str += `<li class="list-group-item list-group-item-action"> + ${changes}% changes </li>`;
    
    for (let i = 1; i < ex.options.length; i++) {
        console.log(ex.options[i].selected)
        
    if (ex.options[i].selected){
        str += `<li class="list-group-item list-group-item-action"> + ${ex.options[i].text} </li>`;
    }
    }
    str += `<li class="list-group-item list-group-item-action"> + Fixed Costs </li>`;
str += `<ul/>`
return str;
 }

function quote (h, r, iva, ex, p, fc){
    p/=100; //p = p /100
    let costPerJourney = (h*fc)/8
    let result=(h*r)*(1+p);
    let i = 0;    
            do{                
                console.log(ex.options[i].selected)                
                if (ex.options[i].selected){
                    result += parseFloat(ex.options[i].value)
                }
            i++;
            } while(i < ex.options.length) 
            result += costPerJourney;//Agregando los costos fijos por cada 8 hrs
            if (iva) {
            result *=1.16;    
            }
    
            return result;
}//Funcion pero con ciclo do while

