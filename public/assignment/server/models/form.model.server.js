var q = require("q");

module.exports = function(db, mongoose) {

    var formSchema = require('./form.schema.server.js')(mongoose);

    var Form = mongoose.model('Form',formSchema);



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

        var deferred = q.defer();
        var tempForm ={};
        tempForm = form;
        console.log(userId);
        tempForm.userId = userId;
        tempForm.created = (new Date).getTime();

        console.log(tempForm);

        Form.create(tempForm,
            function(err, form){
                if(err){
                    console.log("form insertion failed");
                    console.log(err);
                }
                else{
                    console.log("form inserted");
                    deferred.resolve(form);
                }
            });



        return deferred.promise;


    }

    function  findAllFormsForUser(userId){
        console.log(userId);


        var deferred = q.defer();

        Form.find({'userId' : userId},
            function(err, forms){
                if(err){
                    console.log("find all forms error");
                }
                else{

                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }

    function  deleteFormById(formId){

        var deferred = q.defer();

        Form.remove(
            {'_id' : formId},
            function(err, forms){
                if(err){
                    console.log("delete all forms error");
                }
                else{
                    console.log("success");
                    deferred.resolve(findAllFormsForUser(forms.userId));
                    }

            });
        return deferred.promise;


    }

    function  updateFormById(formId, newForm){

        var deferred = q.defer();
        delete newForm._id;

        Form.update(
            {'_id' : formId},
            {$set : newForm},
            function(err, forms){
                if(err){
                    console.log("update all forms error");
                    console.log(err);
                }
                else{
                    console.log("success");
                    console.log(forms);
                    Form.findOne({"_id" : formId},
                    function(err, user){
                       console.log(user);
                        deferred.resolve(user);
                    });
                }

            });
        return deferred.promise;

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
            if(fieldId)
                return updateField(formInfo[i].fields, field);
            else{
                formInfo[i].fields = field;
                return formInfo[i].fields;
            }




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