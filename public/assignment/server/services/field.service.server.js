var formAccess = require("../models/form.model.js")();

module.exports = function(app){

    api.get('/api/assignment/form/:formId/field', getField);
    api.get('/api/assignment/form/:formId/field/:fieldId', getField);
    api.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    api.put('/api/assignment/form/:formId/field/:fieldId', updateFieldForForm);
    api.post('/api/assignment/form/:formId/field', createFieldForForm);

    function  getField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formAccess.getField(formId, fieldId));
    }

    function  deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formAccess.deleteField(formId, fieldId));

    }

    function createFieldForForm(req, res){
        var formId = req.params.formId;
        var field = req.body;

        res.json(formAccess.createFieldForForm(formId, form));


    }

    function  updateFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        res.json(formAccess.updateFieldForForm(formId, fieldId, field));

    }


}