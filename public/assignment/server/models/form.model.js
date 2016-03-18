var formInfo = require("./form.mock.json");

module.exports = function() {


    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
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
};