(function() {
    angular
        .module('FormBuilderApp')
        .controller('FieldController', FieldController);

    function FieldController($scope, $routeParams, $rootScope, $location, FormService, FieldService) {

        var currentUser = $rootScope.user;
        $scope.model= {};
        var currentUserFields = [];
        var currentUserForms = [];

        var formId = $routeParams.formId;
        console.log("Form id "+formId);



        function initialiseForms() {
            getUserForms(currentUser._id);
        }
        initialiseForms();

        function getUserForms(userId) {

            var formData=[];

            FormService
                .findAllFormsForUser(userId)
                .then(function (response){
                    angular.copy(response.data, currentUserForms);
                    //$scope.model.fields = currentUserFields;
                   // console.log(currentUserForms);
                    getFormFields();
                });
        }

        function  getFormFields(){

            console.log("Inside getFormFields");
            for(var i=0; i< currentUserForms.length;i++){
                if(currentUserForms[i]._id == formId){
                    console.log("Inside if");
                    console.log(currentUserForms[i].fields);
                    $scope.model.fields = currentUserForms[i].fields;
                    break;
                }
            }

        }
        $scope.removeField = function(field){
            console.log("in remove"+field._id+"form id"+formId);
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function (response){
                    getUserForms(currentUser._id);
                })
        };

        $scope.modifyField = function(field){
            console.log(field);
            $scope.modal = field;
            $scope.modal.options = JSON.stringify(field.options);
        }

        $scope.addField = function(fieldType){

            switch (fieldType){
                case "singleLineText":
                    var field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(currentUser._id);
                        });
                    break;
                case "multiLineText" :
                    var field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(currentUser._id);
                        });
                    break;
                case "date" :
                    var field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(currentUser._id);
                        });
                    break;
                case "dropDown" :
                    var field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(currentUser._id);
                        });
                    break;
                case "radio" :
                    var field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(currentUser._id);
                        });
                    break;

                case "checkBox" :
                    var field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(currentUser._id);
                        });
                    break;



            }
            }









    }
})();