$(function () {
  var l = new Login();
})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent() {
    $('form').submit((event) => {
      event.preventDefault()
      this.sendForm()
    })
  }

  sendForm() {
    let form_data = new FormData();
    form_data.append('username', $('#user').val())
    form_data.append('password', $('#password').val())

    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: function (php_response) {
        if (php_response.msg == "OK") {
          Swal.fire({
            title: 'Éxito',
            text: "Te has logueado con éxito",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#8B0913',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
              cancelButton: 'outnone',
              confirmButton: 'outnone',
            }
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/client/'
            }
          });

          // window.location.href = 'main.html';
        } else {
          // alert(php_response.msg);
          Swal.fire({
            // title: 'Oops... Hubo un error',
            title: php_response.msg,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#8B0913',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
              cancelButton: 'outnone',
              confirmButton: 'outnone',
            }
          })
        }
      },
      error: function (data) {
        Swal.fire({
          title: 'Oops... Hubo un error',
          text: "Error en la comunicación con el servidor",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#8B0913',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          customClass: {
            cancelButton: 'outnone',
            confirmButton: 'outnone',
          }
        })
      }
    })
  }
}
