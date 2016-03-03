var Yelp = require('yelp');
var yelp = new Yelp({
    consumer_key: 'r7UvikICvNylN1CbaoX5LA',
    consumer_secret: 'tXf4iGd0eFdSiRmtVtmHEYRNOjE',
    token: 'u_ku2Gh2Yr-HO0EmXvh6eUmcGYPVCFp7',
    token_secret: 'uqbsTDCLt19m-z91El4P5NOO8dM',
});
yelp.search({ term: 'food', location: 'Montreal' })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.error(err);
    });
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);