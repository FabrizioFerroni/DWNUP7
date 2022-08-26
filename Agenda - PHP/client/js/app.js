class EventsManager {
  constructor() {
    this.obtenerDataInicial()
  }


  obtenerDataInicial() {
    let url = '../server/getEvents.php'
    $.ajax({
      url: url,
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      type: 'GET',
      success: (data) => {
        if (data.msg == "OK") {
          this.poblarCalendario(data.eventos)
        } else {
          Swal.fire({
            title: 'Genial',
            text: data.msg,
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
          })
          // window.location.href = 'index';
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

  poblarCalendario(eventos) {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var now = month + '/' + day + '/' + year;

    $('.calendario').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,basicDay'
      },
      locale: 'es',
      defaultDate: now,
      navLinks: true,
      editable: true,
      eventLimit: true,
      droppable: true,
      dragRevertDuration: 0,
      timeFormat: 'HH:mm',
      eventDrop: (event) => {
        this.actualizarEvento(event)
      },
      events: eventos,
      eventDragStart: (event, jsEvent) => {
        $('.delete-btn').find('img').attr('src', "img/trash-open.png");
        $('.delete-btn').css('background-color', '#a70f19')
      },
      eventDragStop: (event, jsEvent) => {
        var trashEl = $('.delete-btn');
        var ofs = trashEl.offset();
        var x1 = ofs.left;
        var x2 = ofs.left + trashEl.outerWidth(true);
        var y1 = ofs.top;
        var y2 = ofs.top + trashEl.outerHeight(true);
        if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
          jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
          this.eliminarEvento(event, jsEvent)
          $('.calendario').fullCalendar('removeEvents', event.id);
        }

      }
    })
  }

  anadirEvento() {

    if (!document.getElementById('allDay').checked) {
      if ($('#titulo').val() != "" && $('#start_date').val() != "" && $('#start_hour').val() != "" && $('#end_hour').val() != "" && $('#end_date').val() != "") {
        var form_data = new FormData();
        form_data.append('titulo', $('#titulo').val())
        form_data.append('start_date', $('#start_date').val())
        form_data.append('allDay', 0);
        form_data.append('end_date', $('#end_date').val())
        form_data.append('end_hour', $('#end_hour').val())
        form_data.append('start_hour', $('#start_hour').val())

        $.ajax({
          url: '../server/new_event.php',
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          data: form_data,
          type: 'POST',
          success: (data) => {
            if (data.msg == "OK") {
              Swal.fire({
                title: 'Evento creado',
                text: data.msg2,
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
                  $('#titulo').val('');
                  $('#start_date').val('');
                  $('#end_date').val('');
                  $('#end_hour').val('');
                  $('#start_hour').val('');
                }
              });
              if (document.getElementById('allDay').checked) {
                $('.calendario').fullCalendar('renderEvent', {
                  title: $('#titulo').val(),
                  start: $('#start_date').val(),
                  allDay: true
                })
              } else {
                $('.calendario').fullCalendar('renderEvent', {
                  title: $('#titulo').val(),
                  start: $('#start_date').val() + " " + $('#start_hour').val(),
                  allDay: false,
                  end: $('#end_date').val() + " " + $('#end_hour').val()
                })
              }
            } else {
              Swal.fire({
                title: 'Oops... Hubo un error',
                text: data.msg,
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
          },
          error: function (data) {
            Swal.fire({
              title: 'Oops... Hubo un error',
              text: data.msg,
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
      } else {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Tienes que rellenar los campos',
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
    } else {
      if ($('#titulo').val() != "" && $('#start_date').val() != "" && $('#start_hour').val() != "") {
        var form_data = new FormData();
        form_data.append('titulo', $('#titulo').val())
        form_data.append('start_date', $('#start_date').val())
        form_data.append('allDay', 1);
        form_data.append('end_date', "")
        form_data.append('end_hour', "")
        form_data.append('start_hour', "")
        $.ajax({
          url: '../server/new_event.php',
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          data: form_data,
          type: 'POST',
          success: (data) => {
            if (data.msg == "OK") {
              Swal.fire({
                title: 'Evento creado',
                text: data.msg2,
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
                  $('#titulo').val('');
                  $('#start_date').val('');
                  $('#end_date').val('');
                  $('#end_hour').val('');
                  $('#start_hour').val('');
                 document.querySelector("#allDay").checked = false;
                }
              });
              if (document.getElementById('allDay').checked) {
                $('.calendario').fullCalendar('renderEvent', {
                  title: $('#titulo').val(),
                  start: $('#start_date').val(),
                  allDay: true
                })
              } else {
                $('.calendario').fullCalendar('renderEvent', {
                  title: $('#titulo').val(),
                  start: $('#start_date').val() + " " + $('#start_hour').val(),
                  allDay: false,
                  end: $('#end_date').val() + " " + $('#end_hour').val()
                })
              }
            } else {
              Swal.fire({
                title: 'Oops... Hubo un error',
                text: data.msg,
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
          },
          error: function (data) {
            Swal.fire({
              title: 'Oops... Hubo un error',
              text: data.msg,
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
      } else {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Tienes que rellenar los campos',
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
    }

  }

  eliminarEvento(event, jsEvent) {
    var form_data = new FormData()
    form_data.append('id', event.id)
    $.ajax({
      url: '../server/delete_event.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: (data) => {
        if (data.msg == "OK") {
          Swal.fire({
            title: 'Genial',
            text: data.msg2,
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
          })
        } else {
          Swal.fire({
            title: 'Oops... Hubo un error',
            text: data.msg,
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
      },
      error: function () {
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
    $('.delete-btn').find('img').attr('src', "img/trash.png");
    $('.delete-btn').css('background-color', '#8B0913')
  }

  actualizarEvento(evento) {
    let id = evento.id,
      start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
      end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
      form_data = new FormData(),
      start_date,
      end_date,
      start_hour,
      end_hour

    start_date = start.substr(0, 10)
    end_date = end.substr(0, 10)
    start_hour = start.substr(11, 8)
    end_hour = end.substr(11, 8)


    form_data.append('id', id)
    form_data.append('start_date', start_date)
    form_data.append('end_date', end_date)
    form_data.append('start_hour', start_hour)
    form_data.append('end_hour', end_hour)

    $.ajax({
      url: '../server/update_event.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: (data) => {
        if (data.msg == "OK") {
          Swal.fire({
            title: 'Genial',
            text: data.msg2,
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
          })
        } else {
          Swal.fire({
            title: 'Oops... Hubo un error',
            text: data.msg,
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
      },
      error: function () {
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

$(function () {
  initForm();
  var e = new EventsManager();
  $('form').submit(function (event) {
    event.preventDefault()
    e.anadirEvento()
  })
});

function initForm() {
  $('#start_date, #titulo, #end_date').val('');
  $('#start_date, #end_date').datepicker({
    dateFormat: "yy-mm-dd"
  });
  $('.timepicker').timepicker({
    timeFormat: 'HH:mm',
    interval: 30,
    minTime: '5',
    maxTime: '23:30',
    defaultTime: '8',
    startTime: '5:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
  $('#allDay').on('change', function () {
    if (this.checked) {
      $('.timepicker, #end_date').attr("disabled", "disabled")
    } else {
      $('.timepicker, #end_date').removeAttr("disabled")
    }
  })

}
