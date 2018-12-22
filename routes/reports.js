var con = require('../connection.js');
var express = require('express')
var api = express.Router();

api.get('/TableReports', function (req, res) {
    try {
        con.query(`select r._id id, c.name customer, date_format(r.start_date, '%d/%m/%Y') s_date, date_format(r.finish_date, '%d/%m/%Y') f_date, status status from reports r inner join customers c on c._id = r.fk_customer`, function (err, rows) {
            if (err) throw err
            else
                res.send('{"data":' + JSON.stringify(rows) + '}');
        });
    } catch (e) {

    }
});

api.post('/register_report', function (req, res) {
    let form = req.body;
    con.query(`insert into reports values(null,'${form.ServiceCode}','${form.invoice}',${form.part},${form.inspection},${form.rework},${form.sampling},${form.partialRework},${form.client}, str_to_date('${form.fecha_inicio}', '%d/%m/%Y'), str_to_date('${form.fecha_fin}', '%d/%m/%Y'), 'OPEN')`, function (err) {
        if (err) throw err
        else
            res.send({ message: "Reporte Registrado" });
    });
});

api.post('/deleteReport/:id', function (req, res) {
    let id = req.params.id;
    con.query(`delete from reports where _id  = ${id}`, function (err) {
        if (err) throw err
        else
            res.send({ message: "Reporte Eliminado Correctamente" });
    });
});

api.post('/insertLogs', function (req, res) {
    let form = req.body;
    let sql = `insert into logs values(null,${form.report},str_to_date('${form.act_date}', '%d/%m/%Y'),${form.part},'${form.color}','${form.lot_number}','${form.serial_number}',${form.pcs},${form.qty_boxes},${form.ok_pieces},${form.pending_pieces},${form.hours_invested},${form.ng_1},${form.ng_2},${form.ng_3},${form.ng_4},${form.ng_5},${form.ng_6},${form.ng_7},${form.ng_8},${form.select_worker})`;
    con.query(sql, function (err) {
        if (err)
            throw err
        else
            res.send({ message: "Registro Exitoso" });
    });
});

api.get('/getReportLogs/:report', function (req, res) {
    let report = req.params.report
    let sql = `select _id, act_date, (select part_number from parts where _id = l.fk_part) part_number,(select name from parts where _id = l.fk_part) part_name, color, lot_number,serial_number,pcs,boxes_qty, ok_pcs, pending_pcs, ng_1,ng_2,ng_3,ng_4,ng_5,ng_6, ok_pcs+pending_pcs+ng_1+ng_2+ng_3+ng_4+ng_5+ng_6+ng_7+ng_8 total,ng_7,ng_8, work_hours from logs l where fk_report = ${report}`;

    con.query(sql, function (err, rows) {
        if (err)
            throw err
        else
            res.send('{"data":' + JSON.stringify(rows) + '}');
    });
});


//Consultas para Clientes
//Piezas NG y errores de cliente
api.get('/getngparts', function (req, res) {
    //Recibir Token hasheado
    con.query(`select p.name part_name, sum(ng_1) ng1, sum(ng_2) ng2, sum(ng_3) ng3, sum(ng_4) ng4, sum(ng_5) ng5, sum(ng_6) ng6, sum(ng_7) ng7, sum(ng_8) ng8 from logs join (select * from reports where fk_customer = 1) r on fk_report = r._id join parts p on r.fk_part = p._id group by date_format(act_date, '%m-%Y'), p.name;`, function (err, rows) {
        if (err) throw err
        else
            res.send(rows);
    });
});

//Piezas NG y OK ordenadas por fecha de cliente
api.get('/getokandngparts', function (req, res) {
    //Recibir Token hasheado
    con.query(`select p.name part_name, sum(ok_pcs) ok,sum(ng_1 + ng_2 + ng_3 + ng_4 + ng_5 + ng_6 + ng_7 + ng_8) ng, sum(pending_pcs) pending from logs join (select * from reports where fk_customer = 1) r on fk_report = r._id join parts p on r.fk_part = p._id group by p.name;`, function (err, data) {
        if (err) throw err
        else
            res.send(data);
    });
});

//Piezas Inspeccionadas por empleado
api.get('/pcsperworker', function (req, res) {
    con.query(`select workers.first_name, sum(ok_pcs + ng_1 + ng_2 + ng_3 + ng_4 + ng_5 + ng_6 + ng_7 + ng_8 + pending_pcs) total from logs join workers on logs.fk_worker = workers._id group by workers.first_name;`, function (err, data) {
        if(err) throw err
        else
            res.send(data);
    });

})

module.exports = api;