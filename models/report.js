let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var ReportSchema = Schema({
    ServiceName: String,
    LotNumber: String,
    invoice: String,
    activities: {},
    type: { type: Schema.ObjectId, ref: 'Type' },
    act_date: String,
    employees: String,
    shift: String,
    hours: Number
});

module.exports = mongoose.model('Report', ReportSchema);