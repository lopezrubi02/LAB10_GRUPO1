'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "lab10_employees"
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión exitosa a base de datos");
    }
});

/**         PREGUNTA 1      **/

/**         PREGUNTA 2      **/



/**         PREGUNTA 3      **/
app.get("/empleados/getByTitle/:title", function (request, response) {
    var title = request.params.title;
    var query = "select * from employees e where e.Title = ?";
    var parametros = [title];
    conn.query(query, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});

app.listen(3100, function () {
    console.log("servidor levantado exitosamente");
});
