function verificarExistenciaDeUsuarios() {
    $.ajax({
        url: '/usuarios/buscar_y_verificar_usuarios',
        method: 'GET',
        data: {},
        success: function (response) {
            mensaje = "";
            for (var i = 0; i < response.length; i++) {
                mensaje += '<small>Usuario: ' + response[i].email + ' - Clave: ' + response[i].clave + '</small><br>';
            }
            $('#mensajeUsuarios').innerHTML(mensaje);
        }
    })
}

$('.loginButton').on('click', function (event) {
    var nombreUsuario = $('#user');
    var pass = $('#pass');
    if (nombreUsuario.val() != "" && pass.val() != "") {
        $.ajax({
            url: '/usuarios/obtener_usuario/' + nombreUsuario.val(),
            method: 'GET',
            success: function (usuario) {
                localStorage.setItem('id', usuario[0]._id)
                localStorage.setItem('email', nombreUsuario.val())
                localStorage.setItem('nombre', usuario[0].nombre)
            }
        })
        $.ajax({
            url: '/usuarios/login',
            method: 'POST',
            data: {
                user: nombreUsuario.val(),
                pass: pass.val()
            },
            success: function (response) {
                // mostrarMensaje(response);
                if (response == "OK") {
                    // alert("Te has logueado con éxito")
                    window.location.href = "/main.html";
                } else {
                    alert("Clave incorrecta");
                }
            },
            error: function(error){
                alert(error);
            }
        })
    } else {
        alert("Complete todos los campos");
    }
})

$('#logout').on('click', function (event) {
    var url = "/usuarios/logout";
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
    $.post(url, (response) => {
        window.location.href = "/index.html";
    })
})

function mostrarMensaje(msj) {
    $('#mensajeSesion').innerHTML(msj);
    // $('#mensajeSesion').html(msj);
}