(function() {
    angular
        .module('FormBuilderApp')
        .controller('FieldController', FieldController);

    function FieldController($scope, $routeParams, $rootScope, $location, FormService, FieldService) {

        var currentUser = $rootScope.user;
        $scope.model= {};
        $scope.add = add;
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

        $scope.addField = function(fieldType){

            switch (fieldType){
                case "singleLineText":
                    var field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(currentUser._id);
                        })
                    break;
                case ""
            }



        }



    }
})();