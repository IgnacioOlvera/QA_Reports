var express = require('express')
var api = express.Router();
var path = require('path');
api.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/production/report.html'));
});
api.get('/report', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/production/report.html'))
});

api.get('/client', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/production/client.html'))
});

api.get('/parts', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/production/parts.html'))
});

api.get('/types', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/production/types.html'))
});
module.exports = api;