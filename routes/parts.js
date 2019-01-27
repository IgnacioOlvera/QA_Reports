var con = require('../connection.js');
var express = require('express')
var api = express.Router();
var PartController = require('../controllers/parts')
//Backend con Mongo
api.post('/part', PartController.SavePart);
api.put('/part/:id',PartController.UpdatePart);
api.delete('/part/:id',PartController.DeletePart);
api.get('/part/:id?',PartController.getParts);

//Backend con MySQL
api.post('/parts/:b', function (req, res) {
    let parte = req.body;
    let b = req.params.b;//Bandera para decidir si es actualización o inserción

    if (parte != null || parte !== undefined && (b == 0 || b == 1)) {
        let id_parte = parte.id_parte || null,
            descripcion = parte.descripcion || null,
            nombre = parte.nombre || null,
            cliente = parte.cliente || null,
            numero = parte.part_number || null;
        if (nombre != null && descripcion != null && cliente != null && numero != null) {
            try {
                if (b == 0)//Actualización de parte
                    con.query(`update parts set name='${nombre}', part_number='${numero}',description='${descripcion}',fk_customer=${cliente} where _id=${id_parte}`, function (err) {
                        if (err) throw err//res.send({ message: 'Ocurrió un error', status: "500" });
                        else
                            res.status(200).send({ message: 'Parte editada correctamente', status: "200" })
                    });
                else if (b == 1)
                    //Inserción de parte
                    if (typeof descripcion === "string" && typeof nombre === "string" && typeof cliente === "string" && typeof numero === "string")
                        con.query(`insert into parts values(null,'${numero}','${nombre}','${descripcion}',${cliente})`, function (err) {
                            if (err) console.log(err)
                            else
                                res.status(200).send({ message: 'Parte insertada correctamente', status: "200" })
                        });

            } catch (ex) {
                res.redirect('/error');
            }
        } else {
            res.send({ message: 'Falta Proporcionar Datos Obligatorios y/o Válidos', status: "500" });
        }
    } else {
        res.send({ message: 'Ocurrió un error', status: "500" });
    }
});
api.get('/getparts/:variant?', function (req, res) {
    let sql = 'select p.*, c.name client,c._id idClient from parts p join customers c on c._id=p.fk_customer;';
    // let sql='select * from parts';
    try {
        if (req.params.variant == 1) {
            con.query('select * from parts', function (err, rows) {
                if (err) throw err
                else {

                    res.send('{"data":' + JSON.stringify(rows) + '}');
                }
            });
        } else {
            con.query(sql, function (err, rows) {
                if (err) throw err
                else {

                    res.send({ data: rows });
                }
            });
        }
    } catch (e) {

    }
});
//Eliminar parte
api.put('/part/:id', function (req, res) {
    if (req.params.id != null) {
        let id = req.params.id;
        try {
            con.query(`delete from parts where _id=${id}`, function (err) {
                if (err) res.status(200).send({ message: 'Ocurrió un error o no se econtró la parte', status: '500' })
                else
                    res.status(200).send({ message: 'Parte eliminada correctamente!', status: '200' })
            });
        } catch (ex) {
            res.redirect('/error');
        }

    }
});


module.exports = api;