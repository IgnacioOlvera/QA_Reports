var con = require('../connection.js');
var express = require('express');
var nodemailer = require('nodemailer');
var api = express.Router();

api.get('/getReports', function (req, res) {
    try {
        con.query('select _id, fk_customer customer, type from report_type', function (err, rows) {
            if (err) throw err
            else
                res.send('{"data":' + JSON.stringify(rows) + '}');
        });
    } catch (e) {

    }
});

api.get('/getReportByType/:type', function (req, res) {
    try {
        let type = req.params.type;
        con.query(`select r._id id, week(r.start_date) s_date, fk_type type, serviceName ServiceCode, invoice, job_inspection inspection, job_rework rework, job_sampling sampling,job_partial_rework partialRework, date_format(start_date, '%d/%m/%Y') fecha_inicio, date_format(finish_date, '%d/%m/%Y') fecha_fin, status, lot_number from reports r where r.fk_type=${type}`, function (err, rows) {
            if (err) throw err
            else
                res.send('{"data":' + JSON.stringify(rows) + '}');
        });
    } catch (e) {

    }
});

api.post('/register_report', function (req, res) {
    let form = req.body; 0
    con.query(`insert into reports values(null,'${form.ServiceCode}','${form.LotNumberQMC}','${form.invoice}',${form.inspection},${form.rework},${form.sampling},${form.partialRework},${form.client}, str_to_date('${form.fecha_inicio}', '%d/%m/%Y'), str_to_date('${form.fecha_inicio}', '%d/%m/%Y'), 'OPEN',${form.report})`, function (err) {
        if (err) throw err
        else
            res.send({ message: "Reporte Registrado" });
    });
});

api.post('/edit_report', function (req, res) {
    let form = req.body;
    con.query(`update reports set serviceName = '${form.ServiceCode}', lot_number = '${form.LotNumberQMC}',invoice = '${form.invoice}', job_inspection = ${form.inspection}, job_rework = ${form.rework}, job_sampling = ${form.sampling}, job_partial_rework = ${form.partialRework},start_date = str_to_date('${form.fecha_inicio}', '%d/%m/%Y'),finish_date = str_to_date('${form.fecha_fin}', '%d/%m/%Y') where _id = ${form.id}`, function (err) {
        if (err) throw err
        else res.send({ message: 'Reporte Actualizado Correctamente' });
    });
});


api.post('/deleteReport/:id', function (req, res) {
    let id = req.params.id;
    con.query(`delete from reports where _id  = ${id}`, function (err) {
        if (err) throw err
        else
            res.status(200).send({ message: "Reporte Eliminado Correctamente" });
    });
});

api.get('/deleteLog/:id', function (req, res) {
    let id = req.params.id;
    con.query(`delete from inspectionreports_logs where _id = ${id}`, function (err) {
        if (err) throw err
        else res.send({ message: 'Registro eliminado correctamente.' })
    });
});

api.get('/getReportLogs/:report/:idReport', function (req, res) {
    let report = req.params.report;
    let idReport = req.params.idReport;
    let sql = "";
    if (report == 1) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, date_format(mfg_date, '%d/%m/%Y')                     mfg_date, lot_number, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3, ng4, ng5, ng6, ng7, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10 + ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, ng8, ng9, hours,employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 2) {
        sql = `select _id id, date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, date_format(mfg_date, '%d/%m/%Y')                     mfg_date, lot_number, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3, ng4, ng5, ng6, ng7,ng8, ng9,ng10,ng11,ng12,ng13,ng14,ng15,ng16,ng17,ng18, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10+ ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, hours,employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 3) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, date_format(mfg_date, '%d/%m/%Y')                     mfg_date, lot_number, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3, ng4, ng5, ng6, ng7,ng8, ng9,ng10,ng11,ng12,ng13, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10+ ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, hours,employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 4) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, date_format(mfg_date, '%d/%m/%Y')                     mfg_date, lot_number, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3, ng4, ng5, ng6, ng7,ng8, ng9,ng10,ng11,ng12,ng13,ng14,ng15, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10+ ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, hours, employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 8) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, date_format(mfg_date, '%d/%m/%Y')                     mfg_date, lot_number, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3, ng4, ng5, ng6, ng7,ng8, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10+ ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, hours,employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 5) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, inspection, program, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10+ ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, hours,shift, employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 6) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, inspection, program, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3,ng4, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10+ ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, hours,shift, employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 7) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, program,mfg_date, batch_number,serial_number, box_pcs, boxes_qty, ok_pcs, reempaque,hours, employees total_pcs, hours,shift, employees from inspectionreports_logs r where fk_report=${idReport};`;
    } else if (report == 9) {
        sql = `select _id id,date_format(act_date, '%d/%m/%Y')                act_date, (select part_number from parts where _id = r.fk_part) part_number, date_format(mfg_date, '%d/%m/%Y')                     mfg_date, lot_number, serial_number, box_pcs, boxes_qty, ok_pcs, pending_pcs, ng1, ng2, ng3, ng4, ng5, ng6, ng7,ng8, ng1 + ng2 + ng3 + ng4 + ng5 + ng6 + ng7 + ng8 + ng9 + ng10+ ng11 + ng12 + ng13 + ng14 + ng15 + ng16+ ng17 + ng18 total_pcs, hours,employees from inspectionreports_logs r where fk_report=${idReport};`;
    }


    con.query(sql, function (err, rows) {
        if (err)
            throw err
        else {
            res.send('{"data":' + JSON.stringify(rows) + '}');
        }
    });
});

//insertar registros
api.post('/insertlogs', function (req, res) {
    let data = req.body;
    data.logs = JSON.parse(data.logs);
    let inserts = "";
    if (data.report == 1 || data.report == 2 || data.report == 3 || data.report == 4 || data.report == 8 || data.report == 5 || data.report == 6 || data.report == 7) {
        for (let index = 0; index < data.logs.length; index++) {
            let log = data.logs[index];
            inserts += `(null, ${data.idReport},str_to_date(${(data.date) ? "'" + data.date + "'" : null},'%d/%m/%Y'),(select _id from parts where part_number = '${log.part_number || null}'),str_to_date(${(log.mfg_date) ? "'" + log.mfg_date + "'" : null},'%Y-%m-%d'),${(log.lot_number) ? "'" + log.lot_number + "'" : null},${(log.serial_number) ? "'" + log.serial_number + "'" : null},${log.box_pcs},${log.boxes_qty},${log.ng1 || 0},${log.ng2 || 0},${log.ng3 || 0},${log.ng4 || 0},${log.ng5 || 0},${log.ng6 || 0},${log.ng7 || 0},${log.ng8 || 0},${log.ng9 || 0},${log.ng10 || 0},${log.ng11 || 0},${log.ng12 || 0},${log.ng13 || 0},${log.ng14 || 0},${log.ng15 || 0},${log.ng16 || 0},${log.ng17 || 0},${log.ng18 || 0},${log.ok_pcs},${log.pending_pcs || null},${data.hours},${(log.color) ? "'" + log.color + "'" : null},${log.inspection || null},${data.shift || null},${(log.program) ? "'" + log.program + "'" : null},${(data.people) ? "'" + data.people + "'" : null},${(log.reempaque) ? "'" + log.reempaque + "'" : null},${(log.batch_number) ? "'" + log.batch_number + "'" : null}),`;
        }
        inserts = inserts.slice(0, -1);
        con.query('insert into inspectionreports_logs values ' + inserts, function (err) {
            if (err) throw err
            else res.send({ message: 'Registros Realizados Correctamente' });
        })
    }

});
api.post('/sendNotification', function (req, res) {
    try {
        let info = req.body;
        let destino = info.emails;
        let subject = info.subject;
        let content = info.content;
        for (let index = 0; index < destino.split(',').length; index++) {
            const element = destino.split(',')[index].toLowerCase().trim();
            if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(`${element}`) == false) {
                return res.status(500).send({ data: element });
            }
        }
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'qmc.iolvera@gmail.com', // generated ethereal user
                pass: 'Mission03' // generated ethereal password
            }

        });
        let mailOptions = {
            from: '"Ignacio Olvera" <qmc.iolvera@gmail.com>', // sender address
            to: destino, // list of receivers
            subject: subject, // Subject line
            text: content//plain text body
        };
        let send = transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Mensaje Enviado" });
    } catch (e) {
        return res.status(500).send({ message: "No" });
    }
});

api.post('/editLog', function (req, res) {
    let data = req.body;
    console.log(data);
    if (data.type == 'text') {
        if (data.name == 'part_number') {
            con.query(`update inspectionreports_logs set fk_part=(select _id from parts where part_number = '${data.value}') where _id=${data.log}`, function (err) {
                if (err) throw err
                else res.status(200).send({ message: 'Registro Editado Correctamente' })
            })
        } else {
            con.query(`update inspectionreports_logs set ${data.name}='${data.value}' where _id=${data.log}`, function (err) {
                if (err) throw err
                else res.status(200).send({ message: 'Registro Editado Correctamente' })
            })
        }

    } else if (data.name == 'act_date' || data.name == "mgf_date") {
        con.query(`update inspectionreports_logs set ${data.name}=date_formar(str_to_date('${data.value}','%d/%m/%Y'),'%Y-%m-%d') where _id=${data.log}`, function (err) {
            if (err) throw err
            else res.status(200).send({ message: 'Registro Editado Correctamente' })
        })
    } else if (data.type == 'number') {
        con.query(`update inspectionreports_logs set ${data.name}=${data.value} where _id=${data.log}`, function (err) {
            if (err) throw err
            else res.status(200).send({ message: 'Registro Editado Correctamente' })
        })
    }

});

//Consultas para Clientes
//Piezas NG y errores de cliente
api.get('/getngparts', function (req, res) {
    //Recibir Token hasheado
    con.query(`select p.name part_name, sum(ng_1) ng1, sum(ng_2) ng2, sum(ng_3) ng3, sum(ng_4) ng4, sum(ng_5) ng5, sum(ng_6) ng6, sum(ng_7) ng7, sum(ng_8) ng8 fr1,2,3,4om logs join (select * from reports where fk_customer = 1) r on fk_report = r._id join parts p on r.fk_part = p._id group by date_format(act_date, '%m-%Y'), p.name;`, function (err, rows) {
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
        if (err) throw err
        else
            res.send(data);
    });

})


module.exports = api;