module.exports = function(app, formModel, fieldModel){

    app.get('/api/assignment/form/:formId/field', getField);
    app.get('/api/assignment/form/:formId/field/:fieldId', getField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldForForm);
    app.post('/api/assignment/form/:formId/field', createFieldForForm);
    app.put('/api/assignment/form/:formId/field', updateAllFieldsForForm);

    function  getField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formAccess.getField(formId, fieldId));
    }

    function  deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        console.log(formId);
        console.log(fieldId);

        formModel.findFormById(formId)
            .then(function (form) {
                fieldModel.deleteField(fieldId)
                    .then(function (field) {
                        form.fields.id(fieldId).remove();
                        form.save();
                        res.json(form);
                    });
            });

        console.log(formId+"   "+fieldId);


    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;

        formModel.findFormById(formId)
            .then(function (form) {
                fieldModel.createFieldForForm(field)
                    .then(function (field) {
                        form.fields.push(field);
                        form.save();
                        res.json(form);
                    });
            });

    }

    function  updateFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        res.json(formAccess.updateFieldForForm(formId, fieldId, field));

    }

    function updateAllFieldsForForm(req, res){
        var formId = req.params.formId;
        var field = req.body;

        res.json(formAccess.updateFieldForForm(formId, null, field));
    }


}