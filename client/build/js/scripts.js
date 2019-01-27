$('#vinetas').html(`<ul class="nav side-menu"> <li> <a href='/report'> <i class="fa fa-home"></i> Inicio </a> </li><li> <a href='/client'> <i class="fa fa-industry"></i> Clientes </a> </li><li> <a href='/parts'> <i class="fa fa-wrench"></i> Partes </a> </li><li> <a href='/types'> <i class="fa fa-puzzle-piece"></i> Reports Models </a> </li></ul> `);

function initParts() {
    let modales = "", select = "";

    $.ajax({
        url: "/customers",
        type: 'GET',
        success: function (result) {
            let clientes = result.data
            clientes.forEach(cliente => {
                select += `<option value="${cliente._id}"> ${cliente.name}</option>`
            });
            $('#clients').append(select)
            $('#clients').on('change', function () {
                $('#partes tbody tr').hide();
                $('#partes tbody').find(` [data-cliente = '${$(this).val()}']`).show();
            });
            $('#selec_cliente').append(select);

        },
        failure: function (result) {
            $.notify("Ha ocurrido un Error");
        },
        error: function (result) {
            $.notify("Ha ocurrido un Error");
        }
    });

    let TablaPartes = $('#partes').DataTable({//Inicializar tabla de clientes.
        'ajax': {
            'url': '/part',
            'type': 'GET'
        },
        columns: [
            { data: '_id' },
            { data: 'name' },
            { data: 'number' },
            { data: '_id' }
        ], "createdRow": function (row, data) {
            $(row).attr("data-cliente", data.customer[0]._id);
            modales += `<div style="display:none" id="modal-${data._id}" class="modal fade  in" tabindex="-1" role="dialog" aria-hidden="true"
            style="display: block; padding-right: 15px;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Información de Parte</h4>
                    </div>
                    <div class="modal-body">
                        <form id="info-parte-${data._id}" class="form-horizontal form-label-left">
                            <div class="col-md-12">
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Nombre de la Parte
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" value="${data.name}" name="name" id="nombre-${data._id}" class="form-control col-md-7 col-xs-12"
                                            placeholder="Nombre de la Parte" />
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Número de Parte
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" name="number" value="${data.number}"  id="part_number-${data._id}" class="form-control col-md-7 col-xs-12"
                                            placeholder="Número de Parte" />
                                    </div>
                                </div>
                               
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Cliente
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control col-md-7 col-xs-12" name="customer" id="selec_cliente_${data._id}">
                                        <option value="${data.customer[0]._id}" selected>${data.customer[0].name}</option>
                                        ${select}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="editar-${data._id}" data-target="${data._id}" type="button" class="btn btn-primary editar">Guardar Cambios</button>
                    </div>  
                </div>
            </div>
        </div>`;

            $(row).attr("data-parte", data._id);

            let op = $(row).children()[2];
            $(op).html(`<button type="button" class="btn btn-primary" data-toggle="modal" title="Editar" data-target="#modal-${data._id}"><span class="fa fa-edit"></span></button><button data-target="${data._id}" type="button" title="Eliminar" class="btn btn-danger eliminar"><span class="fa fa-times"></span></button>`);

        }, "columnDefs": [
            {
                "targets": [0],
                "visible": false
            }
        ], "bPaginate": false, "searching": false, "ordering": false,
    }).draw();

    TablaPartes.on('draw', function () {
        $('#modales').html("");
        $('#modales').html(modales);
        modales = "";
        $('.editar').on('click', function () {
            let parte = $(this).data("target");
            let form = $(`#info-parte-${parte}`).serializeObject();
            form.id_parte = parte;
            if (form.name !== undefined && form.customer !== undefined && typeof form.name === "string" && typeof form.customer === "string") {
                $.ajax({
                    url: `/part/${parte}`,
                    type: 'PUT',
                    dataType: "json",
                    data: form,
                    success: function (result) {
                        $(`#modal-${parte}`).modal('toggle');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $.notify(result.message, 'success');
                        TablaPartes.ajax.reload().draw();
                    },
                    failure: function (result) {
                        $.notify("Ha ocurrido un Error");
                    },
                    error: function (result) {
                        $.notify("Ha ocurrido un Error");
                    }
                });
            } else {
                alert("Faltan Campos");
            }

        });
        $('.eliminar').on('click', async function () {
            $.ajax({
                url: "/part" + $(this).data("target"),
                type: 'PUT',
                success: function () {
                    $.notify("Parte Eliminada Correctamente");
                    TablaPartes.ajax.reload().draw();
                },
                failure: function () {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        });
    });



    $('#registroParte').on('click', function () {
        let form = $('#RegistrarParteForm').serializeObject();
        if (form.name !== undefined && form.customer !== undefined && typeof form.name === "string" && typeof form.customer === "string") {
            $.ajax({
                url: "/part",
                type: 'POST',
                dataType: "json",
                data: form,
                success: function (result) {
                    TablaPartes.ajax.reload().draw()
                    $.notify(result.message, 'success');
                    $(`#AgregarParteModal`).modal('toggle');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        } else {
            $.notify("Ha ocurrido un Error");;
        }

    });
}
function initClient() {
    let modales = "";
    let TablaClientes = $('#ClientesInfo').DataTable({
        ajax: {
            type: 'GET',
            url: '/customers',
            async: 'false'
        },
        columns: [
            {
                data: '_id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'name' },
            { data: 'rfc' },
            { data: 'password' },
            { data: '_id' }
        ],
        "createdRow": function (row, data) {
            modales += (`<div style="display:none" id="modal-${data._id}" class="modal fade  in" tabindex="-1" role="dialog"
            aria-hidden="true" style="display: block; padding-right: 15px;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Información de Cliente</h4>
                    </div>
                    <div class="modal-body">
                        <form id="info-cliente-${data._id}" class="form-horizontal form-label-left">
                            
                            <div class="item form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                    Nombre del cliente
                                    <span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" name="name" value="${data.name}" id="cliente_nombre_${data._id}" class="form-control col-md-7 col-xs-12"
                                        placeholder="Nombre del Cliente" />
                                </div>
                            </div>
                            <div class="item form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                    RFC
                                    <span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" value="${data.rfc}" name="rfc" id="rfc_${data._id}" class="form-control col-md-7 col-xs-12"
                                        placeholder="RFC" />
                                </div>
                            </div>                                
                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="editar_cliente_form_${data._id}" type="button" class="btn btn-primary actualizarCliente" data-target="${data._id}">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>`);
            $(row).attr("data-customer", data._id);
            let op = $(row).children()[4];
            $(op).html(`<button type="button" class="btn btn-primary editar" data-toggle="modal" title="Editar" data-target="#modal-${data._id}"><span class="fa fa-edit"></span></button><button data-target="${data._id}" type="button" title="Eliminar" class="btn btn-danger eliminar"><span class="fa fa-times"></span></button>`);
            $('#modales').html(modales);
        },
        "searching": false, "bPaginate": false, "ordering": false
    }).draw();

    TablaClientes.on('draw', function () {
        $('.actualizarCliente').on('click', function () {
            let cliente = $(this).data("target");
            let form = $(`#info-cliente-${cliente}`).serializeObject();
            form.id_cliente = cliente;
            if (form.name !== undefined && form.rfc !== undefined && typeof form.name === "string" && typeof form.rfc === "string") {
                $.ajax({
                    url: `/customer/${cliente}`,
                    type: 'PUT',
                    dataType: "json",
                    data: form,
                    success: function (result) {
                        $(`#modal-${cliente}`).modal('toggle');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $.notify(result.message, 'success');
                        TablaClientes.ajax.reload().draw();

                    },
                    failure: function (result) {
                        $.notify(result.message);
                    },
                    error: function (result) {
                        $.notify(result.message);
                    }
                });
            } else {
                alert("Faltan Campos");
            }

        });
        $('.eliminar').on('click', function () {
            let customer = $(this).data("target");
            $.ajax({
                url: `/customer/${customer}`,
                type: 'DELETE',
                success: function (result) {
                    $.notify(result.message, 'success');
                    TablaClientes.ajax.reload().draw();
                },
                failure: function (result) {
                    $.notify(result.message);
                },
                error: function (result) {
                    $.notify(result.message);
                }
            });
        });
    });

    $('#registroCliente').on('click', function () {
        let form = $('#RegistrarClienteForm').serializeObject();
        if (form.name !== undefined && form.rfc !== undefined && typeof form.name === "string" && typeof form.rfc === "string") {
            $.ajax({
                url: "/customer",
                type: 'POST',
                dataType: "json",
                data: form,
                success: function (result) {
                    TablaClientes.ajax.reload().draw();
                    $.notify(result.message, 'success');
                    $("#AgregarClienteModal").modal('toggle');
                },
                failure: function (result) {
                    $.notify(result.message);
                },
                error: function (result) {
                    $.notify(result.message);
                }
            });
        } else {
            alert("Faltan Campos");
        }
    });

}
function initReports() {
    $('.logs').hide();
    $('#reports').hide();

    var report = 0;
    let client = 0;
    let idReport = 0;
    let modal = "";
    $("#fecha_inicio").daterangepicker({
        singleDatePicker: !0,
        singleClasses: "picker_4",
        locale: {
            format: 'DD/MM/YYYY'
        },
        startDate: moment(),
    });
    $("#fecha_master").daterangepicker({
        singleDatePicker: !0,
        singleClasses: "picker_4",
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $("#fecha_master").on('change', function () {
        $($(`#registros${report}`).find('thead [name="act_date"]')).data('default', `${$(this).val()}`);
        $(`#registros${report} tbody [name = 'act_date']`).val($(this).val());
    });
    $('#reportes').hide();
    let tabla_reportes = $('#tablareportes').DataTable({
        columns: [
            {
                data: '_id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'ServiceName' },
            { data: '_id' }
        ], "createdRow": function (row, data) {
            modal += `<div style="display:none" id="InfoReporteModal-${data._id}" class="modal fade in" tabindex="-1" role="dialog"
            aria-hidden="true" style="display: block; padding-right: 15px;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="modal-label-${data._id}">Información de Reporte</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <form id="InfoReporteForm-${data._id}" class="form-horizontal form-label-left">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name Of Service</label>
                                        <input type="text" value="${data.ServiceName}" class="form-control" id="codeService" name="ServiceCode"
                                            placeholder="Enter Service Name">
                                    </div>
                                    <div class="form-group">
                                        <label>Invoice Number</label>
                                        <input type="text" value="${data.invoice}" class="form-control" id="invoice" name="invoice" placeholder="Enter Invoice Number">
                                    </div>
                                   
                                    
                                    
                                </div>
                                <div class="col-md-6">

                                    <div class="form-group">
                                        <label>Lot Number QMC</label>
                                        <input type="text" value="${data.LotNumber}" class="form-control" id="numberQMC" name="LotNumberQMC"
                                            placeholder="Enter Lot Number for QMC">
                                    </div>                                                             
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary editar"  data-form="#InfoReporteForm-${data._id}" data-id="${data._id}">Guardar</button>
                    </div>
                </div>
            </div>
        </div>`

            let op = $(row).children()[2];
            $(op).html(`<button type="button" class="btn btn-primary insertar" data-type="${data.type}" data-id="${data._id}" title="Subir Información"><span class="fa fa-arrow-up"></span></button><button type="button" class="btn btn-warning " data-toggle="modal"  title="Editar" data-target="#InfoReporteModal-${data._id}"><span class="fa fa-edit"></span></button><button data-target="${data._id}" type="button" title="Eliminar" class="btn btn-danger eliminar"><span class="fa fa-times"></span></button><button type="button" class="btn btn-success " data-toggle="modal"  title="Notificar" data-target="#SendEmailModal"><span class="fa fa-bell"></span></button>`);
        }, 'searching': false
    });
    $.ajax({
        url: "/type",
        type: 'GET',
        success: function (result) {
            let select = "<option value='0'>Seleccionar Modelo...</option>";
            let models = result.data;

            models.forEach(model => {
                select += `<option value="${model._id}">${model.name}</option>`;
            });
            $('#selectType').html(select);
        },
        failure: function (result) {
            $.notify(result.message);
        },
        error: function (result) {
            $.notify(result.message);
        }
    });
    $.ajax({
        url: "/customers",
        type: 'GET',
        success: function (result) {
            let botones = "";
            let select = "<option value='0'>Seleccionar Cliente...</option>";
            let clientes = result.data;

            clientes.forEach(cliente => {
                botones += `<a data-customer="${cliente._id}" class="btn btn-danger btn-lg btn-block btn-huge cliente">Reportes
                ${cliente.name}</a>`;
                select += `<option value="${cliente._id}">${cliente.name}</option>`;
            });
            $('#clientes').html(botones);
            $('#selectCustomer').html(select);
            $('.cliente').on('click', function () {
                $('.tipo').hide();
                let cliente = $(this).data('customer');
                client = cliente;
                let tipos = $(document).find(`[data-owner='${cliente}']`);
                tipos.show();
            });
        },
        failure: function (result) {
            $.notify(result.message);
        },
        error: function (result) {
            $.notify(result.message);
        }
    });
    $.ajax({
        url: "/type",
        type: 'GET',
        success: function (result) {
            let botones = "";
            let reportes = result.data;
            reportes.forEach(reporte => {
                botones += `<a data-type="${reporte._id}" data-owner="${reporte.customer[0]._id}" class="btn btn-primary btn-lg btn-block btn-huge tipo">${reporte.name}</a>`;
            });

            $('#tipos').html(botones);
            $('.tipo').hide();
            $('.tipo').on('click', function () {
                let tipo = '/report/' + $(this).data("type");
                report = $(this).data("type");
                $('#reportes').show();
                tabla_reportes.ajax.url(tipo).load();
            });
        },
        failure: function (result) {
            $.notify("Ha ocurrido un Error");
        },
        error: function (result) {
            $.notify("Ha ocurrido un Error");
        }
    });

    $('#registroReporte').on('click', function () {
        if (report != 0 && client != 0) {
            let form = $('#RegistrarReporteForm').serializeObject();
            form.type = report;
            form.customer = client;
            $.ajax({
                url: "/report",
                type: 'POST',
                data: form,
                dataType: "json",
                success: function (result) {
                    $("#AgregarReporteModal").modal('toggle');
                    $.notify(result.message, "success");
                    tabla_reportes.ajax.reload().draw();

                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        } else {
            $.notify("Reporte y/o cliente no seleccionados");
        }
    });
    let options = "";
    tabla_reportes.on('draw', function () {
        $('#modales').html("");
        $('#modales').html(modal);
        modal = "";
        $('.eliminar').on('click', function () {
            let b = $(this).data('target');
            $.confirm({
                title: 'Eliminar Reporte',
                content: '¿Desea eliminar el reporte?',
                type: 'red',
                closeIcon: true,
                closeIconClass: 'fa fa-close',
                backgroundDismiss: true,
                escapeKey: true,
                closeAnimation: 'left',
                buttons: {
                    confirmar: function () {
                        $.ajax({
                            url: `/report/${b}`,
                            type: 'DELETE',
                            success: function (result) {
                                $.notify(result.message, 'success');
                                tabla_reportes.ajax.reload().draw();
                            },
                            failure: function (result) {
                                $.notify(result.message);
                            },
                            error: function (result) {
                                $.notify(result.message);
                            }
                        });
                    },
                    cancelar: function () {
                        $.alert('Acción Cancelada');
                    }
                }
            });

        });
        $('.editar').on('click', function () {
            let form = $($(this).data('form')).serializeObject();           
            $.ajax({
                url: "/report/" + $(this).data('id'),
                type: 'PUT',
                dataType: 'json',
                data: form,
                success: function (result) {
                    $(`#InfoReporteModal-${form.id}`).modal('toggle');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    tabla_reportes.ajax.reload().draw();
                    $.notify("Reporte Actualizado Correctamente");
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        });

        $('.insertar').on('click', function () {
            options = ``;
            $(`#selectreport`).hide(50);
            $(`#reports`).show();
            $(`#report${$(this).data('type')}`).show(50);
            idReport = $(this).data('id');
            arrayTables[report - 1].ajax.url(`/getReportLogs/${report}/${idReport}`).load();
            $.ajax({
                url: "/getparts/1",
                type: 'GET',
                success: function (result) {
                    let data = JSON.parse(result).data;
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        if (element.fk_customer == client) {
                            options += `<option value='${element.part_number}'>${element.part_number}</option>`
                        }
                    }
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");;
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        });

    });
    $('#hours').on('change', function () {
        $('#calculated').html(eval($(this).val()))//estará lanzando error
    });
    $('#return').on('click', function () {
        $(`#selectreport`).show(50);
        $(`#reports`).hide();
        $(`.logs`).hide();
    });

    $('#addLog').on('click', function () {
        let fn = $(`#registros${report}`).find('th');
        let data = "";
        for (let index = 0; index < fn.length; index++) {
            if ($(fn[index]).attr('name') == "part_number") {
                data += `"${$(fn[index]).attr('name')}":"<select name='${$(fn[index]).attr('name')}' style='background:transparent; border: none'>${options}</select>",`;
            } else {
                data += `"${$(fn[index]).attr('name')}":"<input name='${$(fn[index]).attr('name')}' type='${$(fn[index]).data('type')}' value='${$(fn[index]).data('default')}' style='background:transparent; border: none'/>",`;
            }

        }
        let newnode = arrayTables[report - 1].row.add(JSON.parse("{" + data.slice(0, -1) + "}")).draw().node();
        $(newnode).addClass('new');
        $(newnode).css({ 'background-color': 'gray', 'color': 'black' });
    });




    $('#enviarCorreo').on('click', function () {
        let form = $('#InfoCorreo').serializeObject();
        for (let index = 0; index < form.emails.split(',').length; index++) {
            const element = form.emails.split(',')[index];
            console.log(element);
            if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(`${element}`) == false) {
                $.confirm({
                    title: 'Error',
                    content: 'Ocurrió un Error, al verificar ' + element + ' que las direcciones de correo estén serparados por una , (coma)',
                    type: 'red',
                    typeAnimated: true,
                    closeIcon: true,
                    closeIconClass: 'fa fa-close',
                    backgroundDismiss: true,
                    escapeKey: true,
                    closeAnimation: 'left'
                });
                return

            }

        }
        $.ajax({
            url: "/sendNotification",
            type: 'POST',
            dataType: 'json',
            data: form,
            success: function (result) {
                $('#enviarCorreo').closest('.modal-content').find('.modal-body').find('input, textarea').val('');
                $(`#SendEmailModal`).modal('toggle');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $.confirm({
                    title: 'Notifiación Exitosa',
                    content: 'La notificación ha sido enviada exitosamente',
                    type: 'green',
                    typeAnimated: true,
                    closeIcon: true,
                    closeIconClass: 'fa fa-close',
                    backgroundDismiss: true,
                    escapeKey: true,
                    closeAnimation: 'left'
                })
            },
            failure: function (result) {
                $.confirm({
                    title: 'Error',
                    content: 'Ocurrió un Error, al verificar que las direcciones de correo estén serparados por una , (coma)',
                    type: 'red',
                    typeAnimated: true,
                    closeIcon: true,
                    closeIconClass: 'fa fa-close',
                    backgroundDismiss: true,
                    escapeKey: true,
                    closeAnimation: 'left'
                });
            },
            error: function (result) {
                $.confirm({
                    title: 'Error',
                    content: 'Ocurrió un Error, verifica que las direcciones de correo estén serparados por una , (coma)',
                    type: 'red',
                    typeAnimated: true,
                    closeIcon: true,
                    closeIconClass: 'fa fa-close',
                    backgroundDismiss: true,
                    escapeKey: true,
                    closeAnimation: 'left'
                });
            }
        });
    });

    $('.logs').on('contextmenu', 'tr', function () {
        let identifier = $(this).data('id');
        $.confirm({
            title: 'Eliminar Reporte',
            content: '¿Desea eliminar el reporte?',
            type: 'red',
            closeIcon: true,
            closeIconClass: 'fa fa-close',
            backgroundDismiss: true,
            escapeKey: true,
            closeAnimation: 'left',
            buttons: {
                confirmar: function () {
                    $.ajax({
                        url: `/deleteLog/${identifier}`,
                        type: 'GET',
                        success: function (result) {
                            $.notify(result.message, 'success');
                            arrayTables[report - 1].ajax.reload().draw();
                        },
                        failure: function (result) {
                            $.notify("Ha ocurrido un Error");;
                        },
                        error: function (result) {
                            $.notify("Ha ocurrido un Error");
                        }
                    });
                },
                cancelar: function () {
                    $.alert('Acción Cancelada');
                }
            }
        });
    });

    $('#submit').on('click', function () {
        let newRows = $(`#registros${report}`).find('.new');
        if (newRows.length != 0) {
            let data = {
                report: report,
                client: client,
                people: `${$('#employees').val()}`,
                date: `${$('#fecha_master').val()}`,
                shift: `${$('#shift').val()}`,
                hours: `${eval($('#hours').val())}`,
                idReport: idReport,
                logs: function () {
                    let d = "[";
                    for (let index = 0; index < newRows.length; index++) {
                        let cols = $(newRows[index]).find('input, select');
                        let log = `{`;
                        for (let index = 0; index < cols.length; index++) {
                            let field = cols[index];
                            log += `"${field.name}": "${$(field).val()}",`
                        }
                        log = log.slice(0, -1) + '},';
                        d += log;
                    }
                    return d.slice(0, -1) + '' + "]";
                }
            }
            if (data.people != "" && data.shift != "" || 0 && data.hours != 0 && data.date != "00/00/0000") {
                $.ajax({
                    url: "/insertlogs",
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    success: function (result) {
                        arrayTables[report - 1].ajax.reload().draw();
                        $.notify(result.message, 'success');
                    },
                    failure: function (result) {
                        $.notify("Ha ocurrido un Error");
                    },
                    error: function (result) {
                        $.notify("Ha ocurrido un Error");
                    }
                });
            } else {
                $.dialog({
                    title: 'Error',
                    closeIcon: true,
                    closeIconClass: 'fa fa-close',
                    backgroundDismiss: true,
                    escapeKey: true,
                    closeAnimation: 'left',
                    type: 'red',
                    content: 'Faltan Campos Obligatorios por proporcionar'
                });
            }

        }

    });
    //Tablas
    let arrayTables = [];
    let registros1 = $('#registros1').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: `mfg_date` },
            { data: 'lot_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'ng4' },
            { data: 'ng5' },
            { data: 'ng6' },
            { data: 'ng7' },
            { data: 'total_pcs' },
            { data: 'ng8' },
            { data: 'ng9' },
            { data: 'hours' },
            { data: 'employees' }

        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    let registros2 = $('#registros2').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none; width:${td.width()}px">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');//OK
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: `act_date` },
            { data: `part_number` },
            { data: `mfg_date` },
            { data: 'lot_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'ng4' },
            { data: 'ng5' },
            { data: 'ng6' },
            { data: 'ng7' },
            { data: 'ng8' },
            { data: 'ng9' },
            { data: 'ng10' },
            { data: 'ng11' },
            { data: 'ng12' },
            { data: 'ng13' },
            { data: 'ng14' },
            { data: 'ng15' },
            { data: 'ng16' },
            { data: 'ng17' },
            { data: 'ng18' },
            { data: 'total_pcs' },
            { data: 'hours' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true

    });
    let registros3 = $('#registros3').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: `mfg_date` },
            { data: 'lot_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'ng4' },
            { data: 'ng5' },
            { data: 'ng6' },
            { data: 'ng7' },
            { data: 'ng8' },
            { data: 'ng9' },
            { data: 'ng10' },
            { data: 'ng11' },
            { data: 'ng12' },
            { data: 'ng13' },
            { data: 'total_pcs' },
            { data: 'hours' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    let registros4 = $('#registros4').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: `mfg_date` },
            { data: 'lot_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'ng4' },
            { data: 'ng5' },
            { data: 'ng6' },
            { data: 'ng7' },
            { data: 'ng8' },
            { data: 'ng9' },
            { data: 'ng10' },
            { data: 'ng11' },
            { data: 'ng12' },
            { data: 'ng13' },
            { data: 'ng14' },
            { data: 'ng15' },
            { data: 'total_pcs' },
            { data: 'hours' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    let registros5 = $('#registros5').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: `inspection` },
            { data: 'program' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'total_pcs' },
            { data: 'hours' },
            { data: 'shift' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    let registros6 = $('#registros6').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: `inspection` },
            { data: 'program' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'ng4' },
            { data: 'total_pcs' },
            { data: 'hours' },
            { data: 'shift' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    let registros7 = $('#registros7').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: 'program' },
            { data: 'mfg_date' },
            { data: 'batch_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'reempaque' },
            { data: 'reempaque' },
            { data: 'hours' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    let registros8 = $('#registros8').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: `mfg_date` },
            { data: 'lot_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'ng4' },
            { data: 'ng5' },
            { data: 'ng6' },
            { data: 'total_pcs' },
            { data: 'ng7' },
            { data: 'ng8' },
            { data: 'hours' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    let registros9 = $('#registros9').on('key-focus', function (e, datatable, cell) {
        if ($(cell.node()).find('input').length != 0) {
            $($(cell.node()).find('input')[0]).focus();
        }
    }).on('dblclick', 'td', function () {
        let td = $(this)
        if (!td.hasClass('toEdit')) {
            let value = td.html()
            td.html(`<input value="${value}" style="background-color:transparent; border:none; font-size:13px; box-shadow:none;">`);
            td.addClass('toEdit');
        }
    }).on('key-blur', function (e, datatable, cell) {
        let td = $(cell.node());
        if (td.hasClass('toEdit')) {
            let id = td.closest('tr').data('id');
            let name = $($(td).closest('table').find('th')[$(td).index()]).attr('name');
            let type = $($(td).closest('table').find('th')[$(td).index()]).data('type');
            let value = td.find('input').val();
            td.removeClass('toEdit');
            td.html(value)
            let data = { log: id, name: name, value: value, type: type };
            $.ajax({
                url: "/editLog",
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (result) {
                    arrayTables[report - 1].ajax.reload().draw();
                    $.notify(result.message, 'success');
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        }
    }).on('key', function (e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            let td = $(cell.node());
            let nrow = td.closest('tbody').find('tr')[td.closest('tr').index() + 1]
            let ntd = $(nrow).find('td')[td.index()];
            $(ntd).trigger('click');
        }
    }).DataTable({
        keys: true,
        'createdRow': function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'act_date' },
            { data: `part_number` },
            { data: `mfg_date` },
            { data: 'lot_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng1' },
            { data: 'ng2' },
            { data: 'ng3' },
            { data: 'ng4' },
            { data: 'ng5' },
            { data: 'ng6' },
            { data: 'total_pcs' },
            { data: 'ng7' },
            { data: 'ng8' },
            { data: 'hours' },
            { data: 'employees' }
        ],
        "ordering": false, "searching": false, "paging": false, dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save as Excel'
            }
        ], 'scrollX': true
    });
    arrayTables.push(registros1);
    arrayTables.push(registros2);
    arrayTables.push(registros3);
    arrayTables.push(registros4);
    arrayTables.push(registros5);
    arrayTables.push(registros6);
    arrayTables.push(registros7);
    arrayTables.push(registros8);
    arrayTables.push(registros9);
}
function initTypes() {
    let modales = "";
    let select = "";
    $.ajax({
        url: "/customers",
        type: 'GET',
        success: function (result) {
            select = "<option value='0'>Seleccionar Cliente...</option>";
            let clientes = result.data;

            clientes.forEach(cliente => {
                select += `<option value="${cliente._id}">${cliente.name}</option>`;
            });
            $('#selectCustomer').html(select);
        },
        failure: function (result) {
            $.notify(result.message);
        },
        error: function (result) {
            $.notify(result.message);
        }
    });
    let TypesTable = $('#types').DataTable({
        ajax: {
            url: '/type',
            type: 'GET'
        },
        columns: [
            {
                data: '_id',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'name' },
            { data: 'customer[0].name' },
            { data: '_id' }
        ],
        "createdRow": function (row, data) {
            let attrs = "";
            for (let index = 0; index < data.attributes.length; index++) {
                const attr = data.attributes[index];

                attrs += ` <div class="row"> <form class="attr"> <div class="col-md-6"> <div class="item form-group"> <label class="control-label"> Nombre: <span class="required">*</span> </label> <input class="form-control" value="${attr.name}" name="name" /> </div> </div> <div class="col-md-5"> <div class="item form-group"> <label class="control-label"> Tipo de Dato <span class="required">*</span> </label> <select class="form-control" name="dataType" id="DataType"> <option value="${attr.dataType}">${attr.dataType}</option><option value="text">Texto</option> <option value="date">Fecha</option> <option value="number">Número</option> </select> </div> </div> <div class="col-md-1"> <div class="item form-group"> <button type="button" style="background-color:transparent; border:none;" onclick="$(this).parent().parent().parent().parent().remove()" data-toggle="modal" title="Editar"><span class="fa fa-close"></span></button> </div> </div> </form> </div>`
            }
            modales += `<div style="display:none" id="EditarModeloModal-${data._id}" class="modal fade  in" tabindex="-1" role="dialog" aria-hidden="true" style="display: block; padding-right: 15px;"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal"> <span aria-hidden="true">×</span> </button> <h4 class="modal-title" id="myModalLabel">Registro de Modelos de Reporte</h4> </div> <div class="modal-body"><div class="row"> <form id="EditarModeloForm-${data._id}" class="form-horizontal form-label-left"> <div class="item form-group"> <label class="control-label col-md-3 col-sm-3 col-xs-12"> Nombre del Modelo <span class="required">*</span> </label> <div class="col-md-6 col-sm-6 col-xs-12"> <input value="${data.name}" type="text" name="name" id="ModeloNombre-${data._id}" class="form-control col-md-7 col-xs-12" placeholder="Nombre del Modelo" /> </div> </div> <div class="item form-group"> <label class="control-label col-md-3 col-sm-3 col-xs-12"> Número de Parte <span class="required">*</span> </label> <div class="col-md-6 col-sm-6 col-xs-12"> <select class="form-control" name="customer" id="ModelCustomer-${data.id}"> <option value="${data.customer[0]._id}">${data.customer[0].name}</option>${select} </select> </div> </div> </form> <div class="pull-right"> <button data-target="#attrs-${data._id}" type="button" class="btn btn-danger addAttr" id="AddAttr-${data._id}"> <span class="fa fa-plus"></span> Agregar Atributo </button> </div> <div class="item form-group"> <label class="control-label col-md-3 col-sm-3 col-xs-12"> <h3>Atributos</h3></label> <div id="attrs-${data._id}" class="col-md-12"> ${attrs} </div> </div> </div></div> <div class="modal-footer"> <button type="button" data-target="${data._id}" class="btn btn-primary EditarModelo">Guardar</button> </div> </div> </div> </div>`;
            let op = $(row).children()[3];
            $(op).html(`<button type="button" class="btn btn-primary editar" data-toggle="modal" title="Editar" data-target="#EditarModeloModal-${data._id}"><span class="fa fa-edit"></span></button><button data-target="${data._id}" type="button" title="Eliminar" class="btn btn-danger eliminar"><span class="fa fa-times"></span></button>`);
        }
    }).draw();
    TypesTable.on('draw', function () {
        $('#modales').html("");
        $('#modales').html(modales);
        modales = "";

        $('.addAttr').on('click', function () {
            $($(this).data('target')).append(`<div class="row">
            <form class="attr">
                <div class="col-md-6">
                    <div class="item form-group">
                        <label class="control-label">
                            Nombre:
                            <span class="required">*</span>
                        </label>
                        <input class="form-control" name="name" />
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="item form-group">
                        <label class="control-label">
                            Tipo de Dato
                            <span class="required">*</span>
                        </label>
                        <select class="form-control" name="dataType" id="DataType">
                            <option value="">Selecciona...</option>
                            <option value="text">Texto</option>
                            <option value="date">Fecha</option>
                            <option value="number">Número</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="item form-group">
                        <button type="button" style="background-color:transparent; border:none;" onclick="$(this).parent().parent().parent().parent().remove()"
                            data-toggle="modal" title="Editar"><span class="fa fa-close"></span></button>
        
                    </div>
                </div>
            </form>
        </div>`);
        });

        $('.eliminar').on('click', function () {
            let id = $(this).data("target");
            $.ajax({
                url: `/type/${id}`,
                type: 'DELETE',
                success: function (result) {
                    $.notify(result.message, 'success');
                    TypesTable.ajax.reload().draw();
                },
                failure: function (result) {
                    $.notify(result.message);
                },
                error: function (result) {
                    $.notify(result.message);
                }
            });
        });

        $('.EditarModelo').on('click', function () {
            let info = $(`#EditarModeloForm-${$(this).data("target")}`).serializeObject();
            let attrs = $(this).parent().parent().find('.attr');
            info.attributes = [];
            for (let index = 0; index < attrs.length; index++) {
                const attr = $(attrs[index]).serializeObject();
                attr.alias = attr.name.replace(/\s/g, "");
                attr.default = "";
                info.attributes.push(attr);

            }
            $.ajax({
                url: `/type/${$(this).data('target')}`,
                method: 'PUT',
                dataType: 'json',
                data: info,
                success: function (result) {
                    $(`#EditarModeloModal-${$(this).data('target')}`).modal('toggle');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $.notify(result.message, 'success');
                    TypesTable.ajax.reload().draw();
                },
                failure: function (result) {
                    $.notify(result.message);
                },
                error: function (result) {
                    $.notify(result.message);
                }
            });
        });
    })
    $.ajax({
        url: `/customers`,
        type: 'GET',
        success: function (result) {
            let selection = ``;
            let customers = result.data;
            for (let index = 0; index < customers.length; index++) {
                const customer = customers[index];
                selection += `<option value="${customer._id}">${customer.name}</option>`
            }
            $('#ModelCustomer').html(selection);
            selector = selection;
        },
        failure: function (result) {
            $.notify(result.message);
        },
        error: function (result) {
            $.notify(result.message);
        }
    });
    $('#AddAttr').on('click', function () {
        $('#attr').append(`
        <div class="row">
    <form class="attr">
        <div class="col-md-6">
            <div class="item form-group">
                <label class="control-label">
                    Nombre:
                    <span class="required">*</span>
                </label>
                <input class="form-control" name="name" />
            </div>
        </div>
        <div class="col-md-5">
            <div class="item form-group">
                <label class="control-label">
                    Tipo de Dato
                    <span class="required">*</span>
                </label>
                <select class="form-control" name="dataType" id="DataType">
                    <option value="">Selecciona...</option>
                    <option value="text">Texto</option>
                    <option value="date">Fecha</option>
                    <option value="number">Número</option>
                </select>
            </div>
        </div>
        <div class="col-md-1">
            <div class="item form-group">
                <button type="button" style="background-color:transparent; border:none;'" onclick="$(this).parent().parent().parent().parent().remove()"
                    data-toggle="modal" title="Editar"><span class="fa fa-close"></span></button>

            </div>
        </div>
    </form>
</div>`);
    });
    $('#registrarModelo').on('click', function () {
        let data = $('#RegistrarModeloForm').serializeObject();
        data.attributes = [];
        let attrs = $(this).parent().parent().find('.modal-body').find('.attr')
        for (let index = 0; index < attrs.length; index++) {
            const attr = $(attrs[index]).serializeObject();
            data.attributes.push({
                name: attr.name,
                alias: attr.name.replace(/\s/g, ""),
                dataType: attr.dataType,
                default: "",
            })
        }

        $.ajax({
            url: `/type`,
            dataType: 'json',
            data: data,
            type: 'POST',
            success: function (result) {
                $.notify(result.message, 'success');
                $('#AgregarModeloModal').modal('toggle');
                TypesTable.ajax.reload().draw();
            },
            failure: function (result) {
                $.notify(result.message);
            },
            error: function (result) {
                $.notify(result.message);
            }
        });
    });
}
(function ($) {//Función para transformar las formas en json
    $.fn.serializeObject = function () {

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push": /^$/,
                "fixed": /^\d+$/,
                "named": /^[a-zA-Z0-9_]+$/
            };


        this.build = function (base, key, value) {
            base[key] = value;
            return base;
        };

        this.push_counter = function (key) {
            if (push_counters[key] === undefined) {
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function () {

            // skip invalid keys
            if (!patterns.validate.test(this.name)) {
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while ((k = keys.pop()) !== undefined) {

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if (k.match(patterns.push)) {
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if (k.match(patterns.fixed)) {
                    merge = self.build([], k, merge);
                }

                // named
                else if (k.match(patterns.named)) {
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);