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

/**         PREGUNTA 5      **/
app.get("/productos/get", function (request, response) {
    var page = request.query.page;
    var query = "select ProductID,ProductName,UnitPrice,UnitsInStock from products p limit ?,10";
    var parametros = [(page-1)*10];
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
