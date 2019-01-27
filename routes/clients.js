var con = require('../connection.js');
var express = require('express');
var api = express.Router();
var bcrypt = require('bcryptjs');
var CustomerController = require('../controllers/customers');
//Backend con MongoDB
api.post('/customer', CustomerController.SaveCustomer);
api.put('/customer/:id',CustomerController.UpdateCustomer);
api.delete('/customer/:id',CustomerController.DeleteCustomer);
api.get('/customers/:id?',CustomerController.getCustomers);


//Bakend con MySQL
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&/()=?¡][{}-_|°*+",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

api.get('/clients', function (req, res) {
    let sql = "select * from customers";
    try {
        con.query(sql, function (err, rows) {
            if (err) throw err
            else {
                res.send('{"data":' + JSON.stringify(rows) + '}');
            }
        });
    } catch (e) {
        res.send({ message: 'Ocurrió un Error', status: "500" });
    }

});

api.put('/client/:id', function (req, res) {
    con.query(`delete from customers where _id=${req.params.id}`, function (err) {
        if (err) throw err
        else
            res.send({ message: 'Registro Eliminado Correctamente' });
    });
});

api.post('/client/:b', function (req, res) {
    let cliente = req.body;
    let sql = "";
    let b = req.params.b;//Bandera para identificar si es actualización o inserción
    if (cliente != null && (b == 0 || b == 1)) {
        let id_cliente = cliente.id_cliente || null,
            nombre = cliente.nombre || null,
            rfc = (cliente.rfc.trim() == "") ? null : `'${cliente.rfc}'`,
            nat = cliente.nat;
        if (nombre != null && rfc != null, nat != null && typeof nombre === "string" && typeof rfc === "string" && typeof nat === "string") {
            //Actuazlición de cliente
            if (b == 0) {
                sql = `update customers set name='${nombre}',rfc=${rfc},type='${nat}' where _id=${id_cliente}`;
                try {
                    con.query(sql, function (err) {
                        if (err) throw err
                        else
                            res.status(200).send({ message: 'Cliente Editado Correctamente', status: "200" })
                    });
                }
                catch (ex) {
                    res.redirect('/error');
                }
            }
            else if (b == 1) {//Inserción de Cliente
                let salt = bcrypt.genSaltSync(10);
                let pass = generatePassword();
                let hashed_pass = bcrypt.hashSync(pass, salt);
                sql = `insert into customers values(null,'${nombre}',${rfc},'${pass}','${hashed_pass}','${nat}')`;
                try {
                    con.query(sql, function (err) {
                        if (err) throw err//res.send({ message: 'Ocurrió un error SQL', status: "500" });
                        else {
                            res.status(200).send({ message: 'Cliente Registrado Correctamente', status: "200" })
                        }
                    });
                } catch (ex) {
                    res.redirect('/error');
                }
            }
        } else {
            res.send({ message: 'Falta Proporcionar Datos Obligatorios', status: "500" });
        }
    } else {
        res.send({ message: 'Ocurrió un error', status: "500" });
    }
});

module.exports = api;