let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var LogSchema = Schema({
    ActivityDate: String,
    employees: String,
    hours: String,
    report: {
        type: Schema.ObjectId,
        ref: 'Report'
    },
    values: []
});

module.exports = mongoose.model('Log', LogSchema);