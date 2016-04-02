//var formAccess = require("../models/form.model.js")();

module.exports = function(app, formModel){
    app.get('/api/assignment/user/:userId/form',findAllFormsForUser);
    app.get('/api/assignment/form/:formId',findAllFormsForUser);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId',updateFormById);
    app.delete('/api/assignment/form/:formId',deleteFormById);

    function findAllFormsForUser(req, res){
        var userId = req.params.userId;
        console.log(userId);
                    formModel
                .findAllFormsForUser(userId)
                .then(function(forms){
                        //console.log(forms);
                        res.json(forms);
                } );
    }

    function  deleteFormById(req, res){
        console.log(req.params.formId);
        formModel
            .deleteFormById(req.params.formId)
            .then(function(forms){
                res.json(forms);
            } );
    }

    function  createFormForUser(req, res){
        var tempUser = req.body;


        formModel
            .createFormForUser(req.params.userId, tempUser)
            .then(function (form){
                console.log("form");
                console.log(form);
                res.json(form);
            });
        //res.json(formAccess.createFormForUser(req.params.userId, tempUser));

    }

    function updateFormById(req, res){

        var tempForm = req.body;
        console.log("Form "+tempForm._id+" Req param "+req.params.formId);
        formModel
            .updateFormById(req.params.formId, tempForm)
            .then(function (form){
                console.log(form);
                res.json(form);
            });



    }

};
