var Part = require('../models/part');
var mongoose = require('mongoose').Types;
//Obtener partes
function getParts(req, res) {
    if (req.params.id) {
        let id = req.params.id;
        Part.findById(id, function (err, part) {

            if (err) {
                res.status(500).send({ message: 'Error al Obtener Parte' })
            } else {
                res.status(200).send({ data: part })
            }
        });
    } else {
        Part.aggregate([{ $lookup: { from: "customers", localField: "customer", foreignField: "_id", as: "customer" } }]).exec(function (err, parts) {
            if (err) {
                res.status(500).send({ message: 'Error al Obtener Partes' })
            } else {
                res.status(200).send({ data: parts })
            }
        });
    }
}


/* 
    Faltan Validaciones
*/

//Registrar Parte
function SavePart(req, res) {
    let part = new Part();
    let info = req.body;
    part.name = info.name;
    part.number = info.number;
    part.customer = info.customer;

    part.save(part, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error en el Registro' });
        } else {
            res.status(200).send({ message: 'Parte Registrada Correctamente' })
        }
    });
}
//Actualizar Parte
function UpdatePart(req, res) {
    let partId = req.params.id;
    let info = req.body;

    Part.findByIdAndUpdate(partId, info, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Actualizar Parte' })
        } else {
            res.status(200).send({ message: 'Parte Actualizada Correctamente' })
        }
    })
}

//Eliminar Parte
function DeletePart(req, res) {
    let id = req.params.id;
    Part.findByIdAndRemove(id, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Borrar Parte' })
        } else {
            res.status(200).send({ message: 'Parte Eliminada Correctamente' })
        }
    })
}

module.exports = {
    SavePart,
    UpdatePart,
    DeletePart,
    getParts
}