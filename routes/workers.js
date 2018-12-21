var con = require('../connection.js');
var express = require('express')
var api = express.Router();

api.get('/workers', function (req, res) {
    con.query('select * from workers', function (err, rows) {
        if (err)
            throw err
        else
            res.send('{"data":' + JSON.stringify(rows) + '}');
    })
});

api.post('/workers/:b', function (req, res) {
    let worker = req.body || null;
    if (worker != null && req.params.b != null || undefined) {
        if (worker.first_name != null || "" || undefined && worker.last_name != null || "" || undefined) {
            if (typeof worker.first_name == "string" && typeof worker.last_name == "string") {
                if (req.params.b == 0 && typeof worker.id != "number") {
                    con.query(`update workers set first_name = '${worker.first_name}', last_name = '${worker.last_name}' where _id = ${worker.id}`, function (err) {
                        if (err)
                            throw err
                        else
                            res.send({ message: 'Empleado Registrado Correctamente' })
                    });
                } else if (req.params.b == 1) {
                    con.query(`insert into workers values(null,'${worker.first_name}','${worker.last_name}')`, function (err) {
                        if (err)
                            throw err
                        else
                            res.send({ message: 'Empleado Registrado Correctamente' });
                    });
                }
            }
        }
    }

})

api.put('/workers/:id', function (req, res) {
    if (req.params.id != undefined || null)
        con.query(`delete from workers where _id = ${req.params.id}`, function (err) {
            if (err)
                throw err
            else
                res.send({ message: 'Empleado Eliminado Correctamente' });
        });
});

module.exports = api;