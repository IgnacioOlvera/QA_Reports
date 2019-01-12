$('#vinetas').html(`<ul class="nav side-menu"> <li> <a href='/home'> <i class="fa fa-home"></i> Inicio </a> </li> <li> <a href='/report'> <i class="fa fa-list-ul"></i> Reportes </a> </li><li> <a href='/client'> <i class="fa fa-industry"></i> Clientes </a> </li><li> <a href='/parts'> <i class="fa fa-wrench"></i> Partes </a> </li><li> <a href='/operators'> <i class="fa fa-users"></i> Empleados </a> </li></ul> `);

$('#logout').on('click', function () {
    localStorage.clear();
    window.location.replace("/login");
});
// function initInicio() {
//     // $.ajax({
//     //     url: "/pcsperworker",
//     //     type: 'GET',
//     //     success: function (data) {
//     //         // based on prepared DOM, initialize echarts instance
//     //         let workers_graph = echarts.init(document.getElementById('inspected_parts_by_worker'));
//     //         // specify chart configuration item and data
//     //         let workers = [], total = [], values = [];
//     //         for (let index = 0; index < data.length; index++) {
//     //             const record = data[index];
//     //             workers.push(record.first_name)
//     //             values.push({
//     //                 name: record.first_name,
//     //                 type: 'bar',
//     //                 data: [record.total],
//     //                 label: {
//     //                     show: true,
//     //                     position: 'inside',
//     //                     fontStyle: 'italic'
//     //                 }
//     //             });
//     //         }
//     //         let workers_option = {
//     //             title: {
//     //                 text: 'Número de Partes Inspeccionadas por Operario'
//     //             }, tooltip: {
//     //                 trigger: 'axis'
//     //             },
//     //             toolbox: {
//     //                 feature: {
//     //                     dataView: {
//     //                         show: true, readOnly: false,
//     //                         title: "Ver Info",
//     //                         lang: [
//     //                             "Información en Texto Plano",
//     //                             "Cerrar",
//     //                             "Actualizar"
//     //                         ]
//     //                     },
//     //                     magicType: { show: true, type: 'line' },
//     //                     saveAsImage: { show: true, title: "Descargar Imágen" }
//     //                 }
//     //             },
//     //             legend: {
//     //                 data: workers
//     //             },
//     //             xAxis: [
//     //                 {
//     //                     type: 'category',
//     //                     data: ['Total de Partes Inspeccionadas'],
//     //                     axisPointer: {
//     //                         type: 'shadow'
//     //                     }
//     //                 }
//     //             ],
//     //             yAxis: [
//     //                 {
//     //                     type: 'value',
//     //                     name: 'Cantidad'
//     //                 }
//     //             ],
//     //             series: values
//     //         };
//     //         // use configuration item and data specified to show chart
//     //         workers_graph.setOption(workers_option);
//     //     },
//     //     failure: function (result) {
//     //         $.notify("Ha ocurrido un Error");
//     //     },
//     //     error: function (result) {
//     //         $.notify("Ha ocurrido un Error");
//     //     }
//     // });
//     // $.ajax({
//     //     url: "/getokandngparts",
//     //     type: 'GET',
//     //     success: function (data) {
//     //         // based on prepared DOM, initialize echarts instance
//     //         let ok_graph = echarts.init(document.getElementById('ok_graph'));
//     //         // specify chart configuration item and data
//     //         let ok = [], ng = [], pending = [], partes = [];
//     //         for (let index = 0; index < data.length; index++) {
//     //             const record = data[index];
//     //             if (partes.indexOf(record.part_name) == -1) {
//     //                 partes.push(record.part_name);
//     //             }
//     //             ok.push(record.ok);
//     //             ng.push(record.ng);
//     //             pending.push(record.pending);
//     //         }
//     //         let ok_option = {
//     //             title: {
//     //                 text: 'Partes con Defectos'
//     //             }, tooltip: {
//     //                 trigger: 'axis'
//     //             },
//     //             toolbox: {
//     //                 feature: {
//     //                     dataView: {
//     //                         show: true, readOnly: false,
//     //                         title: "Ver Info",
//     //                         lang: [
//     //                             "Información en Texto Plano",
//     //                             "Cerrar",
//     //                             "Actualizar"
//     //                         ]
//     //                     },
//     //                     magicType: { show: true, type: 'line' },
//     //                     saveAsImage: { show: true, title: "Descargar Imágen" }
//     //                 }
//     //             },
//     //             legend: {
//     //                 data: ['OK', 'NG', 'Pending']
//     //             },
//     //             xAxis: [
//     //                 {
//     //                     type: 'category',
//     //                     data: partes,
//     //                     axisPointer: {
//     //                         type: 'shadow'
//     //                     }
//     //                 }
//     //             ],
//     //             yAxis: [
//     //                 {
//     //                     type: 'value',
//     //                     name: 'Cantidad'
//     //                 }
//     //             ],
//     //             series: [
//     //                 {
//     //                     name: 'OK',
//     //                     type: 'bar',
//     //                     data: ok,
//     //                     label: {
//     //                         show: true,
//     //                         position: 'inside',
//     //                         fontStyle: 'italic'
//     //                     }
//     //                 }, {
//     //                     name: 'NG',
//     //                     type: 'bar',
//     //                     data: ng,
//     //                     label: {
//     //                         show: true,
//     //                         position: 'inside',
//     //                         fontStyle: 'italic'
//     //                     }
//     //                 }, {
//     //                     name: 'Pending',
//     //                     type: 'bar',
//     //                     data: pending,
//     //                     label: {
//     //                         show: true,
//     //                         position: 'inside',
//     //                         fontStyle: 'italic'
//     //                     }
//     //                 }
//     //             ]
//     //         };
//     //         // use configuration item and data specified to show chart
//     //         ok_graph.setOption(ok_option);
//     //     },
//     //     failure: function (result) {
//     //         $.notify("Ha ocurrido un Error");
//     //     },
//     //     error: function (result) {
//     //         $.notify("Ha ocurrido un Error");
//     //     }
//     // });
//     $.ajax({
//         url: "/getngparts",
//         type: 'GET',
//         success: function (data) {
//             // based on prepared DOM, initialize echarts instance
//             let ng_graph = echarts.init(document.getElementById('ng_graph'));
//             // specify chart configuration item and data
//             let ng1 = [], ng2 = [], ng3 = [], ng4 = [], ng5 = [], ng6 = [], ng7 = [], ng8 = [], partes = [];
//             for (let index = 0; index < data.length; index++) {
//                 const record = data[index];
//                 if (partes.indexOf(record.part_name) == -1) {
//                     partes.push(record.part_name);
//                 }
//                 ng1.push(record.ng1);
//                 ng2.push(record.ng2);
//                 ng3.push(record.ng3);
//                 ng4.push(record.ng4);
//                 ng5.push(record.ng5);
//                 ng6.push(record.ng6);
//                 ng7.push(record.ng7);
//                 ng8.push(record.ng8);

//             }
//             let ng_option = {
//                 title: {
//                     text: 'Partes con Defectos'
//                 }, tooltip: {
//                     trigger: 'axis'
//                 },
//                 toolbox: {
//                     feature: {
//                         dataView: {
//                             show: true, readOnly: false,
//                             title: "Ver Info",
//                             lang: [
//                                 "Información en Texto Plano",
//                                 "Cerrar",
//                                 "Actualizar"
//                             ]
//                         },
//                         magicType: { show: true, type: 'line' },
//                         saveAsImage: { show: true, title: "Descargar Imágen" }
//                     }
//                 },
//                 legend: {
//                     data: ['NG1', 'NG2', 'NG3', 'NG4', 'NG5', 'NG6', 'NG7', 'NG8',]
//                 },
//                 xAxis: [
//                     {
//                         type: 'category',
//                         data: partes,
//                         axisPointer: {
//                             type: 'shadow'
//                         }
//                     }
//                 ],
//                 yAxis: [
//                     {
//                         type: 'value',
//                         name: 'Cantidad'
//                     }
//                 ],
//                 series: [
//                     {
//                         name: 'NG1',
//                         type: 'bar',
//                         data: ng1,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }, {
//                         name: 'NG2',
//                         type: 'bar',
//                         data: ng2,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }, {
//                         name: 'NG3',
//                         type: 'bar',
//                         data: ng3,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }, {
//                         name: 'NG4',
//                         type: 'bar',
//                         data: ng4,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }, {
//                         name: 'NG5',
//                         type: 'bar',
//                         data: ng5,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }, {
//                         name: 'NG6',
//                         type: 'bar',
//                         data: ng6,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }, {
//                         name: 'NG7',
//                         type: 'bar',
//                         data: ng7,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }, {
//                         name: 'NG8',
//                         type: 'bar',
//                         data: ng8,
//                         label: {
//                             show: true,
//                             position: 'inside',
//                             fontStyle: 'italic'
//                         }
//                     }
//                 ]
//             };
//             // use configuration item and data specified to show chart
//             ng_graph.setOption(ng_option);
//         },
//         failure: function (result) {
//             $.notify("Ha ocurrido un Error");
//         },
//         error: function (result) {
//             $.notify("Ha ocurrido un Error");
//         }
//     });
// }
function initWorkers() {
    $('#registroEmpleado').on('click', function () {
        let form = $('#RegistrarEmpleadoForm').serializeObject();
        $.ajax({
            url: "/workers/1",
            type: 'POST',
            data: form,
            dataType: 'json',
            success: function (result) {
                $(`#AgregarEmpleadoModal`).modal('toggle');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $.notify("Empleado Registrado Correctamente");
                TablaEmpleados.ajax.reload().draw();
            },
            failure: function (result) {
                $.notify("Ha ocurrido un Error");
            },
            error: function (result) {
                $.notify("Ha ocurrido un Error");
            }
        });

    });

    let TablaEmpleados = $('#empleados').DataTable({//Inicializar tabla de clientes.
        'ajax': {
            'url': '/workers',
            'type': 'GET'
        },
        columns: [
            { data: '_id' },
            { data: 'first_name' },
            { data: 'last_name' },
            { data: '_id' }
        ], "createdRow": function (row, data) {
            modales += `<div style="display:none" id="EditarEmpleadoModal-${data._id}" class="modal fade  in" tabindex="-1" role="dialog"
            aria-hidden="true" style="display: block; padding-right: 15px;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Editar Empleado</h4>
                    </div>
                    <div class="modal-body">
                        <form id="EditarEmpleadoForm-${data._id}" class="form-horizontal form-label-left">
                            <div class="col-md-12">
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Nombre
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" name="first_name" value="${data.first_name}" id="first_name-${data._id}" class="form-control col-md-7 col-xs-12"
                                            placeholder="Nombre de Empleado" />
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Apellido
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" name="last_name" value="${data.last_name}" id="last_name-${data._id}" class="form-control col-md-7 col-xs-12"
                                            placeholder="Apellido" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="editar" data-target="${data._id}" type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>`;
            $(row).attr("data-parte", data._id);

            let op = $(row).children()[2];
            $(op).html(`<button type="button" class="btn btn-primary" data-toggle="modal" title="Editar" data-target="#EditarEmpleadoModal-${data._id}"><span class="fa fa-edit"></span></button><button data-target="${data._id}" type="button" title="Eliminar" class="btn btn-danger eliminar"><span class="fa fa-times"></span></button>`);
            $('#modales').html(modales);
        }, "columnDefs": [
            {
                "targets": [0],
                "visible": false
            }
        ], "bPaginate": false, "searching": false, "ordering": false,
    }).draw();

    TablaEmpleados.on('draw', function () {
        $('.editar').on('click', function () {
            let id = $(this).data("target");
            let form = $(`#EditarEmpleadoForm-${id}`).serializeObject();
            form.id = id;
            $.ajax({
                url: "/workers/0",
                type: 'POST',
                dataType: 'json',
                data: form,
                success: function (result) {
                    $(`#EditarEmpleadoModal-${id}`).modal('toggle');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $.notify("Empleado Editado Correctamente");
                    TablaEmpleados.ajax.reload().draw();
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        });

        $('.eliminar').on('click', function () {
            let id = $(this).data("target");
            $.ajax({
                url: `/workers/${id}`,
                type: 'PUT',
                success: function (result) {
                    $('#modales').html("");
                    $.notify("Empleado Eliminado Correctamente");
                    TablaEmpleados.ajax.reload().draw();
                },
                failure: function (result) {
                    $.notify("Ha ocurrido un Error");
                },
                error: function (result) {
                    $.notify("Ha ocurrido un Error");
                }
            });
        });
    });



}
function initParts() {
    let modales = "", select = "";

    $.ajax({
        url: "/clients",
        type: 'GET',
        success: function (result) {
            let clientes = JSON.parse(result).data;
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
            'url': '/getparts',
            'type': 'GET'
        },
        columns: [
            { data: '_id' },
            { data: 'name' },
            { data: 'description' },
            { data: '_id' }
        ], "createdRow": function (row, data) {
            $(row).attr("data-cliente", data.fk_customer);
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
                                        <input type="text" value="${data.name}" name="nombre" id="nombre-${data._id}" class="form-control col-md-7 col-xs-12"
                                            placeholder="Nombre de la Parte" />
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Número de Parte
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" name="part_number" value="${data.part_number}"  id="part_number-${data._id}" class="form-control col-md-7 col-xs-12"
                                            placeholder="Número de Parte" />
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Descripción
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" name="descripcion" value="${data.description}"  id="descripcion-${data._id}" class="form-control col-md-7 col-xs-12"
                                            placeholder="Descripción" />
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Cliente
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control col-md-7 col-xs-12" name="cliente" id="selec_cliente_${data._id}">
                                        <option value="${data.fk_customer}" selected>${data.client}</option>
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
            $('#modales').html(modales);
        }, "columnDefs": [
            {
                "targets": [0],
                "visible": false
            }
        ], "bPaginate": false, "searching": false, "ordering": false,
    }).draw();

    TablaPartes.on('draw', function () {
        $('.editar').on('click', function () {
            let parte = $(this).data("target");
            let form = $(`#info-parte-${parte}`).serializeObject();
            form.id_parte = parte;
            if (form.nombre !== undefined && form.descripcion !== undefined && form.cliente !== undefined && typeof form.nombre === "string" && typeof form.descripcion === "string" && typeof form.cliente === "string") {
                $.ajax({
                    url: "/parts/0",
                    type: 'POST',
                    dataType: "json",
                    data: form,
                    success: function (result) {
                        $(`#modal-${parte}`).modal('toggle');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $.notify("Parte Editada Correctamente");
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
                url: "/part/" + $(this).data("target"),
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
        if (form.nombre !== undefined && form.descripcion !== undefined && form.cliente !== undefined && typeof form.nombre === "string" && typeof form.descripcion === "string" && typeof form.cliente === "string") {
            $.ajax({
                url: "/parts/1",
                type: 'POST',
                dataType: "json",
                data: form,
                success: function (result) {
                    TablaPartes.ajax.reload().draw()
                    $.notify("Parte Registrada Correctamente");
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
            url: '/clients',
            async: 'false'
        },
        columns: [
            { data: '_id' },
            { data: 'name' },
            { data: 'rfc' },
            { data: 'pass' },
            { data: 'hashed_pass' },
            { data: 'type' },
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
                            <div class="col-md-12">
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Nombre del cliente
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" name="nombre" value="${data.name}" id="cliente_nombre_${data._id}" class="form-control col-md-7 col-xs-12"
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
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">
                                        Tipo de Cliente
                                        <span class="required">*</span>
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control col-md-7 col-xs-12" name="nat" id="cliente_nat_${data._id}">
                                            <option value="${data.type}" selected>Selección...</option>
                                            <option value="0">Proveedor</option>
                                            <option value="1">Cliente</option>
                                            <option value="2">Cliente/Proveedor</option>
                                        </select>
                                    </div>
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
            let op = $(row).children()[5];
            $(op).html(`<button type="button" class="btn btn-primary editar" data-toggle="modal" title="Editar" data-target="#modal-${data._id}"><span class="fa fa-edit"></span></button><button data-target="${data._id}" type="button" title="Eliminar" class="btn btn-danger eliminar"><span class="fa fa-times"></span></button>`);
            $('#modales').html(modales);
        },
        "columnDefs": [
            {
                "targets": [0],
                "visible": false
            }
        ],
        "searching": false, "bPaginate": false, "ordering": false
    }).draw();

    TablaClientes.on('draw', function () {
        $('.actualizarCliente').on('click', function () {
            let cliente = $(this).data("target");
            let form = $(`#info-cliente-${cliente}`).serializeObject();
            form.id_cliente = cliente;
            if (form.nombre !== undefined && form.rfc !== undefined && form.nat !== undefined && typeof form.nombre === "string" && typeof form.rfc === "string" && typeof form.nat === "string" && form.rfc.length >= 12) {
                $.ajax({
                    url: "/client/0",
                    type: 'POST',
                    dataType: "json",
                    data: form,
                    success: function (result) {
                        $(`#modal-${cliente}`).modal('toggle');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $.notify("Cliente Actualizado Correctamente");
                        TablaClientes.ajax.reload().draw();

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
        $('.eliminar').on('click', function () {
            $.ajax({
                url: "/client/" + $(this).data("target"),
                type: 'PUT',
                success: function () {
                    $.notify("Cliente Eliminado Correctamente");
                    TablaClientes.ajax.reload().draw();
                },
                failure: function () {
                    $.notify("Ha ocurrido un Error");
                },
                error: function () {
                    $.notify("Ha ocurrido un Error");
                }
            });
        });
    });

    $('#registroCliente').on('click', function () {
        let form = $('#RegistrarClienteForm').serializeObject();
        if (form.nombre !== undefined && form.rfc !== undefined && form.nat !== undefined && typeof form.nombre === "string" && typeof form.rfc === "string" && typeof form.nat === "string" && form.rfc.length >= 12) {
            $.ajax({
                url: "/client/1",
                type: 'POST',
                dataType: "json",
                data: form,
                success: function (result) {
                    TablaClientes.ajax.reload().draw();
                    $.notify("Cliente Registrado Correctamente");
                    $("#AgregarClienteModal").modal('toggle');
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
            { data: 'ServiceCode' },
            { data: `s_date` },
            { data: 'id' }
        ], "createdRow": function (row, data) {
            modal += `<div style="display:none" id="InfoReporteModal-${data.id}" class="modal fade in" tabindex="-1" role="dialog"
            aria-hidden="true" style="display: block; padding-right: 15px;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="modal-label-${data.id}">Información de Reporte</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <form id="InfoReporteForm-${data.id}" class="form-horizontal form-label-left">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name Of Service</label>
                                        <input type="text" value="${data.ServiceCode}" class="form-control" id="codeService" name="ServiceCode"
                                            placeholder="Enter Service Name">
                                    </div>
                                    <div class="form-group">
                                        <label>Invoice Number</label>
                                        <input type="text" value="${data.invoice}" class="form-control" id="invoice" name="invoice" placeholder="Enter Invoice Number">
                                    </div>
                                    <div class="form-group">
                                        <label>Inspection Percentage</label>
                                        <input type="number" class="form-control activity" id="insecPortcentage" value="${data.inspection}" name="inspection"
                                            placeholder="Enter Inspection Percentage">
                                    </div>
                                    <div class="form-group">
                                        <label>Rework Percentage</label>
                                        <input type="number" class="form-control activity" id="reworkPercentage" value="${data.rework}" name="rework"
                                            placeholder="Enter Rework Percentage">
                                    </div>
                                    <div class="form-group">
                                        <label>Sampling Percentage</label>
                                        <input type="number" value="${data.sampling}" class="form-control activity" id="samplingPercentage" name="sampling"
                                            placeholder="Enter Supplier's Name">
                                    </div>
                                    <div class="form-group">
                                        <label>Partial Rework Percentage</label>
                                        <input type="number" class="form-control activity" id="partialRework" value="${data.partialRework}" name="partialRework"
                                            placeholder="Enter Partial Rework Percentage">
                                    </div>
                                </div>
                                <div class="col-md-6">

                                    <div class="form-group">
                                        <label>Lot Number QMC</label>
                                        <input type="text" value="${data.lot_number}" class="form-control" id="numberQMC" name="LotNumberQMC"
                                            placeholder="Enter Lot Number for QMC">
                                    </div>
                                    <div class="form-group">
                                        <label>Start Date</label>
                                        <input type=text name='fecha_inicio' value="${data.fecha_inicio}" placeholder="Fecha de Ingreso" class="form-control"
                                            id="fecha_inicio" aria-describedby="inputSuccess2Status">
                                    </div>
                                    <div class="form-group">
                                        <label>End Date</label>
                                        <input type=text name='fecha_fin' placeholder="Fecha de Ingreso" value="${data.fecha_fin}" class="form-control"
                                            id="fecha_fin" aria-describedby="inputSuccess2Status">
                                    </div>
                                    <div class="form-group">
                                        <label>Service Status</label>
                                        <div id="status" class="form-control"></div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary editar"  data-form="#InfoReporteForm-${data.id}" data-id="${data.id}">Guardar</button>
                    </div>
                </div>
            </div>
        </div>`

            let op = $(row).children()[2];
            $(op).html(`<button type="button" class="btn btn-primary insertar" data-type="${data.type}" data-id="${data.id}" title="Subir Información"><span class="fa fa-arrow-up"></span></button><button type="button" class="btn btn-warning " data-toggle="modal"  title="Editar" data-target="#InfoReporteModal-${data.id}"><span class="fa fa-edit"></span></button><button data-target="${data.id}" type="button" title="Eliminar" class="btn btn-danger eliminar"><span class="fa fa-times"></span></button>`);
        }, 'searching': false
    });

    $.ajax({
        url: "/clients",
        type: 'GET',
        success: function (result) {
            let botones = "";
            let select = "<option value='0'>Seleccionar Cliente...</option>";
            let clientes = JSON.parse(result).data;

            clientes.forEach(cliente => {
                botones += `<a data-customer="${cliente._id}" class="btn btn-danger btn-lg btn-block btn-huge cliente">Reportes
                ${cliente.name}</a>`;

                select += `<option value="${cliente._id}">${cliente.name}</option>`

            });
            $('#clientes').html(botones);
            $('#selec_cliente').html(select);
            $('.cliente').on('click', function () {
                $('.tipo').hide();
                let cliente = $(this).data('customer');
                client = cliente;
                let tipos = $(document).find(`[data-owner='${cliente}']`);
                tipos.show();
            });
        },
        failure: function (result) {
            $.notify("Ha ocurrido un Error");
        },
        error: function (result) {
            $.notify("Ha ocurrido un Error");
        }
    });
    $.ajax({
        url: "/getReports",
        type: 'GET',
        success: function (result) {
            let botones = "";
            let reportes = JSON.parse(result).data;
            reportes.forEach(reporte => {
                botones += `<a data-type="${reporte._id}" data-owner="${reporte.customer}" class="btn btn-primary btn-lg btn-block btn-huge tipo">${reporte.type}</a>`;
            });

            $('#tipos').html(botones);
            $('.tipo').hide();
            $('.tipo').on('click', function () {
                let tipo = '/getReportByType/' + $(this).data("type");
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
            form.client = client;
            form.report = report;
            $.ajax({
                url: "/register_report",
                type: 'POST',
                data: form,
                dataType: "json",
                success: function (result) {
                    $("#AgregarReporteModal").modal('toggle');
                    $.notify("Reporte Registrado Correctamente", "success");
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
        $('#modales').html(modal);
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
                            url: `/deleteReport/${b}`,
                            type: 'POST',
                            success: function (result) {
                                $.notify("Reporte Eliminado Correctamente");
                                tabla_reportes.ajax.reload().draw();
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
        $('.editar').on('click', function () {
            let form = $($(this).data('form')).serializeObject();
            form.id = $(this).data('id');
            $.ajax({
                url: "/edit_report",
                type: 'POST',
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
                data += `"${$(fn[index]).attr('name')}":"<select class='form-control' name='${$(fn[index]).attr('name')}' style='background:transparent; border: none'>${options}</select>",`;
            } else {
                data += `"${$(fn[index]).attr('name')}":"<input name='${$(fn[index]).attr('name')}' type='${$(fn[index]).data('type')}' value='${$(fn[index]).data('default')}' style='background:transparent; border: none'/>",`;
            }

        }
        let newnode = arrayTables[report - 1].row.add(JSON.parse("{" + data.slice(0, -1) + "}")).draw().node();
        $(newnode).addClass('new');
        $(newnode).css({'background-color':'gray','color':'black'});
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
        }

    });
    //Tablas
    let arrayTables = [];
    let registros1 = $('#registros1').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, keys: true
    });
    let registros2 = $('#registros2').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        keys: true,
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, "paging": false, keys: true,

    });
    let registros3 = $('#registros3').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, keys: true
    });
    let registros4 = $('#registros4').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, keys: true
    });
    let registros5 = $('#registros5').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, keys: true
    });
    let registros6 = $('#registros6').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, keys: true
    });
    let registros7 = $('#registros7').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, keys: true
    });
    let registros8 = $('#registros8').on('key-focus', function (e, datatable, cell) {
        if ($('.focus').find('input').length != 0) {
            $($('.focus').find('input')[0]).focus();
        }
    }).DataTable({
        columns: [
            {
                data: 'act_date',
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
        "ordering": false, "searching": false, keys: true
    });
    arrayTables.push(registros1);
    arrayTables.push(registros2);
    arrayTables.push(registros3);
    arrayTables.push(registros4);
    arrayTables.push(registros5);
    arrayTables.push(registros6);
    arrayTables.push(registros7);
    arrayTables.push(registros8);
}
function initRerportsLog() {
    let report = window.location.pathname.split("/")[2];

    $.ajax({

        url: "/workers",
        type: 'GET',
        success: function (result) {
            let select = "";
            let workers = JSON.parse(result).data;
            for (let index = 0; index < workers.length; index++) {
                const worker = workers[index];
                select += `<option value="${worker._id}"> ${worker.first_name} ${worker.last_name}</option>`

            }
            $('#select_worker').append(select);
        },
        failure: function (result) {
            $.notify("Ha ocurrido un Error");
        },
        error: function (result) {
            $.notify("Ha ocurrido un Error");
        }
    });

    $.ajax({
        url: "/clients",
        type: 'GET',
        success: function (result) {
            let clientes = JSON.parse(result).data;
            let select = "";
            clientes.forEach(cliente => {
                select += `<option value="${cliente._id}"> ${cliente.name}</option>`
            });
            $('#cliente').append(select);

        },
        failure: function (result) {
            $.notify("Ha ocurrido un Error");
        },
        error: function (result) {
            $.notify("Ha ocurrido un Error");
        }
    });
    $.ajax({
        url: "/getparts/1",
        type: 'GET',
        success: function (result) {
            let parts = JSON.parse(result).data;
            let select = "";
            parts.forEach(part => {
                select += `<option value="${part._id}"> ${part.name}</option>`
            });
            $('#select_part').append(select);

        },
        failure: function (result) {
            $.notify("Ha ocurrido un Error");
        },
        error: function (result) {
            $.notify("Ha ocurrido un Error");
        }
    });
    let registros1 = $('#logs').DataTable({
        'ajax': {
            url: `/getReportLogs/${report}`,
            type: 'GET'
        },
        columns: [
            { data: 'act_date' },
            { data: `part_number` },
            { data: `mfg_date` },
            { data: 'lot_number' },
            { data: 'serial_number' },
            { data: 'box_pcs' },
            { data: 'boxes_qty' },
            { data: 'ok_pcs' },
            { data: 'pending_pcs' },
            { data: 'ng_1' },
            { data: 'ng_2' },
            { data: 'ng_3' },
            { data: 'ng_4' },
            { data: 'ng_5' },
            { data: 'ng_6' },
            { data: 'ng_7' },
            { data: 'total' },
            { data: 'ng_8' },
            { data: 'ng_9' },
            { data: 'work_hours' }

        ],
        "ordering": false, "searching": false
    });

    $('#act_date').daterangepicker({
        singleDatePicker: !0,
        singleClasses: "picker_4",
        locale: {
            format: 'DD/MM/YYYY'
        },
        startDate: moment(),
    });

    $('#addLog').on('click', function () {
        let form = $('#log').serializeObject();
        form.report = report;
    });
    $('#logs tbody').on('dblclick', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $(this).css('background-color', "#F9F9F9");
        }
        else {
            registros.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $(this).css('background-color', "#acbad4");
        }
    });

    $('#logs tbody tr').on('click', 'td', function () {

    });
}
function initLogin() {
    $('#login').on('click', async function () {
        let data = {
            correo: $("#usuario").val(),
            pass: $("#pass").val()
        }
        if (data.correo != "" && data.pass != "") {
            let options = {
                method: 'post',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }
            let pet = await fetch('/log', options);
            let res = await pet.json();
            if (res.status == 200) {
                setCookie("authorization", res.token);
                localStorage.setItem("lvl", res.lvl);
                if (res.lvl == 3) {
                    window.location.replace("/qc");
                } else {
                    window.location.replace("/inicio");
                }
            } else {
                $.notify(res.message);
            }
        } else {
            $.notify('Falta Ingresar Usuario y/o Contraseña');
        }
    });
    $(document).on('keydown', function (e) {
        if (e.keyCode == 13) {
            $('#login').trigger("click");
        }
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
function init_daterangepicker() {
    if ("undefined" != typeof $.fn.daterangepicker) {
        var a = function (a, b, c) {
            $("#reportrange span").html(a.format("DD/MMMM/YYYY") + " - " + b.format("DD/MMMM/YYYY"))
        }
            , b = {
                startDate: moment(),
                showDropdowns: !0,
                showWeekNumbers: !0,
                timePicker: !1,
                timePickerIncrement: 1,
                timePicker12Hour: !0,
                ranges: {
                    Hoy: [moment(), moment()],
                    Ayer: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                    "Últimos 7 días": [moment().subtract(6, "days"), moment()],
                    "Últimos 30 días": [moment().subtract(29, "days"), moment()],
                    "Este Mes": [moment().startOf("month"), moment().endOf("month")],
                    "Mes Pasado": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
                },
                opens: "left",
                buttonClasses: ["btn btn-default"],
                applyClass: "btn-small btn-primary",
                cancelClass: "btn-small",
                format: "MM/DD/YYYY",
                separator: " a ",
                locale: {
                    applyLabel: "Terminar",
                    cancelLabel: "Limpiar",
                    fromLabel: "Desde",
                    toLabel: "Hasta",
                    customRangeLabel: "Personalizar",
                    daysOfWeek: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
                    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    firstDay: 1
                }
            };
        $("#reportrange span").html(moment().subtract(29, "days").format("DD/MMMM/YYYY") + " - " + moment().format("DD/MMMM/YYYY")),
            $("#reportrange").daterangepicker(b, a),
            $("#reportrange").on("show.daterangepicker", function () {

            }),
            $("#reportrange").on("hide.daterangepicker", function () {

            }),
            $("#reportrange").on("apply.daterangepicker", async function (a, b) {
                let fecha_inicio = b.startDate.format("DD/MM/YYYY");
                let fecha_final = b.endDate.format("DD/MM/YYYY");
                let data = {};

                if (fecha_inicio == fecha_final) {
                    data.fecha = b.startDate.format("DD/MM/YYYY")

                } else {
                    data.fecha_inicio = b.startDate.format("DD/MM/YYYY");
                    data.fecha_final = b.endDate.format("DD/MM/YYYY");
                }
                let url = "/movimientosFecha"
                let options = {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json", authorization: getCookie("authorization") }
                }

                let pet = await fetch(url, options);
                let movimientos = await pet.json();
                $('#MovimientosInfo tbody tr').hide();
                movimientos.forEach(movimiento => {
                    $(`[data-id="${movimiento.id_movimiento}"]`).show();
                });
                mov.page.len(-1).draw();

            }),
            $("#reportrange").on("cancel.daterangepicker", function (a, b) {

            }),
            $("#options1").click(function () {
                $("#reportrange").data("daterangepicker").setOptions(b, a)
            }),
            $("#options2").click(function () {
                $("#reportrange").data("daterangepicker").setOptions(optionSet2, a)
            }),
            $("#destroy").click(function () {
                $("#reportrange").data("daterangepicker").remove()
            })
    }
}
