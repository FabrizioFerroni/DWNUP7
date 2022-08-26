class EventManager {
    constructor() {
        this.urlBase = "/eventos"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
        this.mostrar_nombre()
    }

    obtenerDataInicial() {
        const id = localStorage.getItem('id');

        let url = this.urlBase + "/obtener_eventos/" + id
        $.get(url, (response) => {
            if (response == "logout") {
                this.redireccionarAcceso()
            } else {
                this.inicializarCalendario(response)
            }
        })
    }

    eliminarEvento(evento) {
        let eventId = evento._id
        swal.fire({
            title: '¿Estas seguro que quieres eliminar esto?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8B0913',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borralo!',
            cancelButtonText: 'Cancelar',
            customClass: {
                cancelButton: 'outnone',
                confirmButton: 'outnone',
            }
        }).then((result) => {
            this.obtenerDataInicial();
            if (result.isConfirmed) {
                $.post('eventos/eliminar_evento?_id=' + evento._id, { id: eventId }, (response) => {
                    if (response == "logout") {
                        this.redireccionarAcceso()
                    } else {
                        $('.calendario').fullCalendar('removeEvents', eventId)
                        Swal.fire({
                            title: 'Evento eliminado',
                            text: response,
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
                                window.location.href = '/main.html'
                            }
                        });
                    }
                })
            } else {
                window.location.href = 'main.html';
            }
        })
    }

    guardarEvento() {
        const id = localStorage.getItem('id');

        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let start = $('#start_date').val(),
                title = $('#titulo').val(),
                end = '',
                start_hour = '',
                end_hour = '',
                allDay;
            allDay = 1

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
                allDay = 0
            }
            let url = this.urlBase + "/insertar_evento/" + id;
            if (title != "" && start != "") {
                if (allDay == 1) {
                    var ev = {
                        title: title,
                        start: start,
                        allDay: allDay
                    }
                } else {
                    var ev = {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    }
                }
                $.post(url, ev, (response) => {
                    Swal.fire({
                        title: 'Evento creado',
                        text: response,
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
                            window.location.href = '/main.html'
                        }
                    });
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                Swal.fire({
                    title: 'Datos incompletos',
                    text: 'Complete los campos obligatorios para el evento',
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
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
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

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: Date.now(),
            locale: 'es',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event, jsEvent) => {
                $('.delete').find('img').attr('src', "../img/delete.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event, jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                    this.eliminarEvento(event)
                    $('.calendario').fullCalendar('removeEvents', event.id);
                }
            }
        })
    }

    actualizarEvento(evento) {
        if (evento.end === null) {
            var start = moment(evento.start).format('YYYY-MM-DD'),
                url = '/eventos/actualizar_evento?_id=' + evento._id
        } else {
            var start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
                end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
                url = '/eventos/actualizar_evento?_id=' + evento._id
        }

        var data = {
            _id: evento._id,
            start: start,
            end: end
        }
        $.post(url, data, (response) => {
            Swal.fire({
                title: 'Evento actualizado',
                text: response,
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
        })
    }

    mostrar_nombre() {
        let nombre = localStorage.getItem('nombre');
        let add = document.getElementById("agenda")
        let title = document.getElementById("title")
        add.innerHTML += nombre
        title.innerHTML += nombre
    }


    redireccionarAcceso() {
        var url = "/usuarios/logout";
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('nombre');
        $.post(url, (response) => {
            window.location.href = "/index.html";
        })
    }
}



const Manager = new EventManager()

