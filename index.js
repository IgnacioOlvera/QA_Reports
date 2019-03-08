// var con = require('./connection.js');
// var app = require('./app');

// con.connect(function (err) {
//     if (err) throw err;
//     else
//         app.listen(3000, function () {
//             console.log("Servidor escuchando en http://localhost:" + 3000);
//         });
// });

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongodb://client:Mission03@ds163683.mlab.com:63683/heroku_5dv87bb4

mongoose.connect('mongodb://qmc:Lautrec125@ds163683.mlab.com:63683/heroku_5dv87bb4', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        app.listen(port, function () {
            console.log("La base de datos está corriendo correctamente");
        });
    }
});

// mongoose.connect('mongodb://localhost:27017/reportes', { useNewUrlParser: true }, (err, res) => {
//     if (err) {
//         throw err;
//     } else {
//         app.listen(port, function () {
//             console.log("La base de datos está corriendo correctamente");
//         });
//     }
// });
