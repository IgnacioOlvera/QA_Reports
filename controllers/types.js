var mongoose = require('mongoose').Types;
var Type = require('../models/type');
//Obtener Tipos de reporte
function getTypes(req, res) {
    if (req.params.id) {
        let id = req.params.id;
        Type.aggregate([{ $match: { _id: mongoose.ObjectId(id) } }, { $lookup: { from: "customers", localField: "customer", foreignField: "_id", as: "customer" } }]).exec(function (err, type) {
            if (err) {
                res.status(500).send({ message: "Error al Obtener Registros" })
            } else {
                res.status(200).send({ data: type })
            }
        });
    } else {
        Type.aggregate([{ $lookup: { from: "customers", localField: "customer", foreignField: "_id", as: "customer" } }]).exec(function (err, types) {
            if (err) {
                res.status(500).send({ message: "Error al Obtener Registros" })
            } else {
                res.status(200).send({ data: types })
            }
        });
    }
}
/*
    Faltan Validaciones
*/
//Registrar Tipo de Reporte
function SaveType(req, res) {
    let type = new Type();
    let info = req.body;
    type.name = info.name;
    type.customer = info.customer;
    type.attributes = info.attributes;
    type.save(type, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Registrar Reporte' });
        } else {
            res.status(200).send({ message: 'Reporte Registrado Correctamente' });
        }
    })
}

//Actualizar Tipo de Reporte
function UpdateType(req, res) {
    let id = req.params.id;
    let info = req.body;
    Type.findByIdAndUpdate(id, info, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Actializar Reporte' });
        } else {
            res.status(200).send({ message: 'Reporte Actualizado Correctamente' });
        }
    })
}

//Eliminar Tipo de Reporte
function DeleteType(req, res) {
    let id = req.params.id;

    Type.findByIdAndRemove(id, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Borrar Reporte' });
        } else {
            res.status(200).send({ message: 'Reporte Eliminado Correctamente' })
        }
    });
}


module.exports = {
    SaveType,
    DeleteType,
    UpdateType,
    getTypes
}