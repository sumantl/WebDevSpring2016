'use strict';
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

        function createFormForUser(userId, form) {

            return $http.post('/api/assignment/user/'+userId+'/form', form);
            /*var tempForm ={}
            angular.copy(form,tempForm);
            tempForm._id=(new Date).getTime();
            tempForm.userId = userId;
            forms.push(tempForm);
            callback(tempForm)
            */
        }

        function findAllFormsForUser(userId) {
            return $http.get('/api/assignment/user/'+userId+'/form');

        }

        function deleteFormById(formId) {

            return $http.delete('/api/assignment/form/'+formId);

        }

        function updateFormById (formId, newForm){


            return $http.put('/api/assignment/form/'+formId,newForm);

        }
    }

})();