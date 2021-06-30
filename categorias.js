'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer = require("multer");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
let upload = multer();

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

/**         PREGUNTA 6      **/
app.post("/categorias/create", upload.none(),function (request, response) {
    let name = request.body.name;
    let description = request.body.description;
    let picture = request.body.picture;

    let extension = getFileExtension(picture);

    var query = "insert into categories (CategoryName,Description,Picture) values(?,?,?)";
    var parametros = [name, description, picture];

    if (extension == 'jpg' || extension == 'png') {
        conn.query(query, parametros, function (err) {
            if (err) {
                var jsonRespuesta =
                    {
                        estado: "error",
                        message: err,
                    }
                response.status(400);
                response.json(jsonRespuesta);

            } else {
                var jsonRespuesta =
                    {
                        estado: "Ok",
                        message: "Category created",
                    }
                response.json(jsonRespuesta);
            }
        });
    } else {
        var jsonRespuesta =
            {
                estado: "error",
                message: "Picture name doesn't have correct extension",
            }
        response.status(400);
        response.json(jsonRespuesta);
    }
});

function getFileExtension(filename) {
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

app.listen(3100, function () {
    console.log("servidor levantado exitosamente");
});
