var q = require("q");

module.exports = function(db, mongoose) {

    var fieldSchema = require('./field.schema.server.js')(mongoose);

    var Field = mongoose.model('Field',fieldSchema);



    var api = {

        findAllFormsForUser : findAllFormsForUser,
        deleteField : deleteField,
        createFieldForForm : createFieldForForm,    };
    return api;

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





    function  deleteField (fieldId) {

        var deferred = q.defer();

        Field.remove(
            {'_id' : fieldId},
            function(err, field){
                if(err){
                    console.log("delete all field error");
                     console.log(err);
                }
                else{
                    console.log("success delete field");
                    deferred.resolve(field);
                }

            });
        return deferred.promise;


    }



    function  createFieldForForm(field) {

        var deferred = q.defer();

        delete field._id;

        Field.create(field,
            function (err, newField) {
                if (err) {
                    console.log("field insertion failed");
                    console.log(err);
                }
                else {

                    console.log("field inserted");
                    console.log(newField);
                    deferred.resolve(newField);
                }
            });
        return deferred.promise;
    }






};