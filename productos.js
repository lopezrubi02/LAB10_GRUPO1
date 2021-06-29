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
