var formAccess = require("../models/form.model.js")();

module.exports = function(app){
    app.get('/api/assignment/user/:userId/form',findAllFormsForUser);
    app.get('/api/assignment/form/:formId',findAllFormsForUser);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId',updateFormById);
    app.delete('/api/assignment/form/:formId',deleteFormById);

    function findAllFormsForUser(req, res){
        var userId = req.params.userId;
        res.json(formAccess.findAllFormsForUser(userId));
    }

    function  deleteFormById(req, res){
        res.json(formAccess.deleteFormById(req.params.formId));

    }

    function  createFormForUser(req, res){
        var tempUser = req.body;
        res.json(formAccess.createFormForUser(req.params.userId, tempUser));

    }

    function updateFormById(req, res){

        var tempForm = req.body;
        console.log("Form "+tempForm._id+" Req param "+req.params.formId);

        res.json(formAccess.updateFormById(req.params.formId, tempForm));

    }

};
