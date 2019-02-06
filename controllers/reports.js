var Report = require('../models/report');

function getReportsByType(req, res) {
    if (req.params.type) {
        let type = req.params.type;
        Report.find({ type: type }, function (err, reports) {
            if (err) {
                res.status(500).send({ message: 'Error al Obtener el Reportes' })
            } else {
                res.status(200).send({ data: reports });
            }
        })
    }
}


/*
    Faltan Validaciones
*/
//Registar Reporte
function SaveReport(req, res) {
    let report = new Report();
    let info = req.body;
    console.log(info);
    report.ServiceName = info.ServiceName;
    report.LotNumber = info.LotNumber;
    report.invoice = info.invoice;
    report.activities = info.activities;
    report.type = info.type;
    report.act_date = info.act_date;
    report.employees = info.employees;
    report.shift = info.shift;
    report.hours = eval(info.hours);



    report.save(report, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Registrar el Reporte' })
        } else {
            res.status(200).send({ message: 'Reporte Registrado Correctamente' });
        }
    });
}
//Actualizar Reporte
function UpdateReport(req, res) {
    let id = req.params.id;
    let info = req.body;

    Report.findByIdAndUpdate(id, info, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Actualizar el Reporte' })
        } else {
            res.status(200).send({ message: 'Reporte Actualizado Correctamente' });
        }
    });
}
//Eliminar Reporte
function DeleteReport(req, res) {
    let id = req.params.id;
    Report.findByIdAndRemove(id, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Eliminar el Reporte' })
        } else {
            res.status(200).send({ message: 'Reporte Eliminado Correctamente' });
        }
    });
}

module.exports = {
    SaveReport,
    UpdateReport,
    DeleteReport,
    getReportsByType
}