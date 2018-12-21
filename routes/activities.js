var con = require('../connection.js');
var express = require('express')
var api = express.Router();

api.get('/activities', function (req, res) {
    try {
        con.query('select * from activities', function (err, rows) {
            if (err)
                throw err
            else
                res.send(rows);
        });
    } catch (e) {

    }
});

api.post('/activities',function(req,res){

});

module.exports = api;
