var con = require('./connection.js');
var app = require('./app');

con.connect(function (err) {
    if (err) throw err;
    else
        app.listen(process.env.PORT || 3000, function () {
            console.log("Servidor escuchando en http://localhost:" + process.env.PORT || 3000);
        });
});
