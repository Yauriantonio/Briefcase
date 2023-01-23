

const typed = new Typed('.typed', {
    stringsElement: '#txt_cadena', // Id del elemento que contiene cadenas de texto a mostrar
    typeSpeed: 75, // Velocidad en milisegundos para poner una letra
    startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica cuando termina y vuelve a iniciar
    backSpeed: true, // velocidad en mili para borrar una letra
    smartBackspace: true, // Eliminar solo las palabras que sean nuevas en una cadena de trxto
    shuffle: false, // Altera el orden de las palabras. Inconveniente por que luego solo borra las palabras.
    backDelay: 1500, // Tiempo de espera despues de terminar de escribir una letra
    loop: true, //Repetir el array de strings
    loopCount: false, // cantidad deveces a repetir el array . false = infinite
    showCursor: true,// Mostrar cursor palpitando
    cursorChair: '|', // Caracter para el cursor
    contentType: 'html', // 'html' o 'null' para texto sin formato
});

let cja = document.getElementById("subir");
cja.addEventListener("click", function (){
    document.documentElement.scrollTop = 0;
});

window.addEventListener("scroll", function(){
if (document.documentElement.scrollTop > 0) {
    cja.style.display = "flex";    
}else {
    cja.style.display = "none";
}
});


const form = document.getElementById('form_valid');
const imputs = document.querySelectorAll('#form_valid input');
const textare = document.querySelectorAll('#form_valid textarea');

const expressions = {
user: /^[a-zA-ZÀ-ÿ-Z0-9_.+-,¿?!¡@\s]{4,500}$/, // Letras, números, guines bajos y guiones 
names: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras, espacios, pueden llevar acentos.
correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/, // que tenga @ letras, numeros _ .-
phone: /^[a-zA-ZÀ-ÿ-Z0-9_.+-,\s]{4,40}$/, // Letras, espacios, pueden llevar acentos.
}
const fields ={
user:false,
names:false,
correo:false,
phone:false
}
const formValid = (e) => {
switch(e.target.name){
    case "comments":
        validateField(expressions.user, e.target, 'user');
    break;
    case "name":
        validateField(expressions.names, e.target, 'names');
    break;
    case "email":
        validateField(expressions.correo, e.target, 'correo');
    break;
    case "subject":
        validateField(expressions.phone, e.target, 'phone');
    break;
}
}
// Valida los campos
const validateField = (expression, input, field) =>{
    if(expression.test(input.value)){
        document.getElementById(`group_${field}`).classList.remove('group_form_incorrect');
        document.getElementById(`group_${field}`).classList.add('group_form_correct');
        document.querySelector(`#group_${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#group_${field} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group_${field} .form_error`).classList.remove('form_error_active');
        fields[field] = true;
    }else {
        document.getElementById(`group_${field}`).classList.add('group_form_incorrect');
        document.getElementById(`group_${field}`).classList.remove('group_form_correct');
        document.querySelector(`#group_${field} i`).classList.add('fa-times-circle');
        document.querySelector(`#group_${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group_${field} .form_error`).classList.add('form_error_active');
        fields[field] = false;
    }

} 

// Escucha dentro y fuera del form
imputs.forEach((input) => {
    input.addEventListener('keyup', formValid );
    input.addEventListener('blur', formValid );
});

textare.forEach((textarea) => {
    textarea.addEventListener('keyup', formValid );
    textarea.addEventListener('blur', formValid );
});

// Boton 
form.addEventListener('submit', (e) =>{
    

    if(fields.names && fields.correo && fields.phone && fields.user  ){
        // form_valid.reset();

        document.getElementById('form_message').classList.remove('form_message_active');
        document.getElementById('form_great').classList.add('form_great_active');
        setTimeout(() => {
            document.getElementById('form_great').classList.remove('form_great_active');
        }, 5000);

        document.querySelectorAll('.group_form_correct').forEach((icono) => {
            icono.classList.remove('group_form_correct');
        });
        
    }else{
        document.getElementById('form_message').classList.add('form_message_active');
        setTimeout(() => {
            document.getElementById('form_message').classList.remove('form_message_active');
        }, 5000);
        e.preventDefault();
    }
});





