var express = require('express')
var api = express.Router();
var path=require('path');
api.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/production/index.html'));
});
api.get('/report',function(req,res){
    res.sendFile(path.join(__dirname, '../client/production/report.html'))
});

api.get('/client',function(req,res){
    res.sendFile(path.join(__dirname, '../client/production/client.html'))
});

api.get('/parts',function(req,res){
    res.sendFile(path.join(__dirname, '../client/production/parts.html'))
});

api.get('/reportslog/:report',function(req,res){
    res.sendFile(path.join(__dirname, '../client/production/ReportsLogs.html'))
});
api.get('/operators',function(req,res){
    res.sendFile(path.join(__dirname, '../client/production/workers.html'))
});
module.exports = api;