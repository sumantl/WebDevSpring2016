var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var connectionString = "mongodb://localhost/form-maker";
var db = mongoose.connect(connectionString);


if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname + '/public'));


require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);

