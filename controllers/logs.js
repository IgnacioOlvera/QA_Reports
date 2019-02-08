var Log = require('../models/log');
//Consulta de Registros
function getLogs(req, res) {
    if (req.params.report) {
        let report = req.params.report
        Log.find({ "report": report }, { "values": 1 }, function (err, logs) {
            if (err) {
                res.status(500).send({ message: "Error al Obtener Registros" })
            } else {
                res.status(200).send({ data: logs })
            }
        });
    }
}
//Registrar Log
function SaveLog(req, res) {
    let info = req.body.data;
    Log.insertMany(info, function (err) {
        if (err) {
            res.status(500).send({ message: "Error en el Registro" })
        } else {
            res.status(200).send({ message: "Registro Exitoso" });
        }
    });
}
//Actualizar Registro
function UpdateLog(req, res) {
    let id = req.params.id;
    let info = req.body;
    
    Log.findByIdAndUpdate(id, info, function (err) {
        if (err) {
            res.status(500).send({ message: "Error al Actualizar el Registro" })
        } else {
            res.status(200).send({ message: "Actualización de Registro Exitosa" })
        }
    })
}
//Eliminar Registro
function DeleteLog(req, res) {
    let id = req.params.id;
    Log.findByIdAndRemove(id, function (err) {
        if (err) {
            res.status(500).send({ message: "Error al Borrar el Registro" })
        } else {
            res.status(200).send({ message: "Eliminación de Registro Exitosa" })
        }
    })
}


module.exports = {
    SaveLog,
    getLogs,
    UpdateLog,
    DeleteLog
}