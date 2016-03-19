var formInfo = require("./form.mock.json");

module.exports = function() {


    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        updateField: updateField,
        getField: getField,
        getFieldById :getFieldById,
        deleteField : deleteField,
        deleteFieldById : deleteFieldById,
        createFieldForForm : createFieldForForm,
        updateFieldForForm : updateFieldForForm

    };
    return api;

    function createFormForUser(userId, form){

        var tempForm ={};
        tempForm = form;
        tempForm._id=(new Date).getTime(); // Need to change this
        tempForm.userId = userId;
        formInfo.push(tempForm);

        return tempForm;


    }

    function  findAllFormsForUser(userId){
        var userForms=[];
        for(var i = 0; i<formInfo.length; i++){
            if(formInfo[i].userId == userId){
                userForms.push(formInfo[i]);
            }
        }
        return userForms;
    }

    function  deleteFormById(formId){
        for (var i = 0; i < formInfo.length; i++) {
            if (formInfo[i]._id == formId) {
                formInfo.splice(i, 1);

            }
        }

        return formInfo;
    }

    function  updateFormById(formId, newForm){
        var result  = null;
        for(var i=0; i<formInfo.length; i++){
            if(formInfo[i]._id == formId){

                formInfo[i]=newForm;
                result =formInfo[i];

            }
        }
        return result;
    }

    //*******************************************************************//
    //*******************************************************************//
    //*******************************************************************//

    function getField(formId, fieldId){

        for (var i = 0; i < formInfo.length; i++){
            if(formInfo[i]._id == formId)
                if(fieldId)
                    getFieldById(formInfo[i].fields, fieldId);
                else
                    return formInfo[i].fields;
        }
    }

    function getFieldById(fields, fieldId){

        for (var i = 0; i < fields.length; i++){
            if( fields[i]._id == fieldId)
                return fields[i];
        }

    }

    function  deleteField(formId, fieldId) {

        for (var i = 0; i < formInfo.length; i++) {
            if (formInfo[i]._id == formId) {
                deleteFieldById(i, fieldId)
                console.log("form found");
            }
        }
        return formInfo;
    }

    function deleteFieldById(index, fieldId) {
       // console.log(fields);
        for (var i = 0; i < formInfo[index].fields.length; i++) {
            if (formInfo[index].fields[i]._id == fieldId) {
                formInfo[index].fields.splice(i, 1);
                console.log("filed");
            }
        }
    }

    function  createFieldForForm(formId, field){

        var temp ={};
        field._id = (new Date).getTime();
        for (var i = 0; i < formInfo.length; i++) {
            if (formInfo[i]._id == formId) {
                formInfo[i].fields.push(field);
                temp = field;
            }

        }
        return temp;

    }

    function  updateFieldForForm(formId, fieldId, field){
        var tempField = {};
        for (var i = 0; i < formInfo.length; i++) {
            if (formInfo[i]._id == formId);
                return updateField(formInfo[i].fields, fieldId, field);

        }
    }

    function updateField(fields, fieldId, field){
        for(var i=0; i<fields.length; i++){
            if(fields[i]._id == fieldId) {
                field[i] = field;
                return field;
            }
        }
    }


};