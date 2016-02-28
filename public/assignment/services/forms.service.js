(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService ($http) {

        var forms=[];
        forms=[
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return api;

        function createFormForUser(userId, form, callback) {
            var tempForm ={}
            angular.copy(form,tempForm);
            tempForm._id=(new Date).getTime();
            tempForm.userId = userId;
            forms.push(tempForm);
            callback(tempForm)
        }

        function findAllFormsForUser(userId, callback) {
            var userForms=[];
            console.log(forms);
            console.log("findall"+userId);
            for(var i = 0; i<forms.length; i++){
                if(forms[i].userId == userId){
                    console.log("Form Found");
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {


            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);

                }
            }
            callback(forms);
        }

        function updateFormById (formId, newForm, callback){
            var result=null;
            for(var i=0;i<forms.length;i++){
                if(forms[i]._id == formId){

                    angular.copy(newForm,forms[i]);
                    angular.copy(forms[i],result);
                    break;
                }
            }
            callback(result);
        }
    }

})();