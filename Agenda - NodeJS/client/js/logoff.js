$(document).ready(function () {
    let id = localStorage.getItem('id');
    let email = localStorage.getItem('email');
    let nombre = localStorage.getItem('nombre');
    
    if (id == null && email == null && nombre == null) {
        console.log("No estas logueado para ingresar a la url solicitada.");
        window.location.href = "/index.html";
    }
});