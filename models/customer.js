let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var CustomerSchema = Schema({
    name : String,
    password : String,
    rfc : String
});

module.exports = mongoose.model('Customer', CustomerSchema);