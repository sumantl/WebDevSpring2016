
var express = require('express');
var app = express();
var route = require('public/assignment/server/services/user.service.server.js');

app.use(express.static(__dirname + '/public'));
app.use(route);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
