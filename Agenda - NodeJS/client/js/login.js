$(document).ready(function () {
    let id = localStorage.getItem('id');
    let email = localStorage.getItem('email');
    let nombre = localStorage.getItem('nombre');
    
    if (id != null && email != null && nombre != null) {
        console.log("Ya estas logueado para ingresar a la url solicitada.");
        window.location.href = "/main.html";
    }
});