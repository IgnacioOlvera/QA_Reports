var bcrypt = require('bcryptjs');
var Customer = require('../models/customer');//modelo de customer

//Backend con MongoDB
//Obtener Clientes
function getCustomers(req, res) {
    if (req.params.id) {
        let id = req.params.id;
        Customer.findById(id, function (err, customer) {
            if (err) {
                res.status(500).send({ mesage: 'Error al buscar Cliente' });
            } else {
                res.status(200).send({ customer })
            }
        });
    } else {
        Customer.find().sort('name').exec(function (err, customers) {
            if (err) {
                res.status(500).send({ message: 'Error al Clientes' });
            } else {
                res.status(200).send({ data: customers })
            }
        })
    }
}

/* 
    Faltan Validaciones de campos en todos los métodos.
*/
//Registrar Nuevo Cliente
function SaveCustomer(req, res) {
    let customer = new Customer();
    let info = req.body;
    customer.name = info.name;
    customer.password = generatePassword();
    customer.hpassword = bcrypt.hashSync(customer.password, bcrypt.genSaltSync(10));
    customer.user = info.rfc.trim();
    customer.save(customer, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error en el Registro' });
        } else {
            res.status(200).send({ message: 'Cliente Registrado Correctamente' })
        }
    });
}
//Acutalizar Cliente
function UpdateCustomer(req, res) {
    let customerId = req.params.id;
    let info = req.body;

    Customer.findByIdAndUpdate(customerId, info, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar Cliente' });
        } else {
            res.status(200).send({ message: 'Cliente Actualizado Correctamente' })
        }
    });
}
//Eliminar Cliente
function DeleteCustomer(req, res) {
    let customerId = req.params.id;
    Customer.findByIdAndRemove(customerId, function (err) {
        if (err) {
            res.status(500).send({ message: 'Error al Eliminar Cliente' });
        } else {
            res.status(200).send({ message: 'Cliente Eliminado Correctamente' })
        }
    });
}


//Función para generar contraseñas
function generatePassword() {
    var length = 10,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&/()=?¡][{}-_|°*+",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

//Exportar Funciones
module.exports = {
    SaveCustomer,
    UpdateCustomer,
    DeleteCustomer,
    getCustomers
}