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
app.get("/empleados/get", function (request, response) {
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title from employees e ";
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});

/**         PREGUNTA 2      **/
app.get("/empleados/getManagerEmployees/:id", function (request, response) {
    var id = request.params.title;
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title from employees e where e.EmployeeID = ?";
    var parametros = [id];
    conn.query(query, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});


/**         PREGUNTA 3      **/
app.get("/empleados/getByTitle/:title", function (request, response) {
    var title = request.params.title;
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title from employees e where e.Title = ?";
    var parametros = [title];
    conn.query(query, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});

/**         PREGUNTA 4      **/
app.post("/empleados/update", bodyParser.json(),function (request, response) {
    var id  = request.body.id;
    var email = request.body.email;
    var address = request.body.address;
    if(email != "" && address != ""){
        var query = "update employees e set e.Email = ?, e.Address = ? where e.EmployeeID = ?";
        var parametros = [email,address,id];
    }
    if(email != "" && address == ""){
        var query = "update employees e set e.Email = ? where e.EmployeeID = ?";
        var parametros = [email,id];
    }
    if(email == "" && address != ""){
        var query = "update employees e set e.Address = ? where e.EmployeeID = ?";
        var parametros = [address,id];
    }
    conn.query(query, parametros, function (err) {
        if (err){
            var jsonRespuesta =
                {
                    estado: "error",
                    message: err,
                };
            response.json(jsonRespuesta);
        }else{
            var jsonRespuesta =
                {
                    estado: "ok",
                    message: "Employee updated",
                    datos: {
                        "nombre": email,
                        "apellido": address,
                        "id" : id
                    }
                };
            response.json(jsonRespuesta);
        }
    });
});

app.listen(3100, function () {
    console.log("servidor levantado exitosamente");
});
