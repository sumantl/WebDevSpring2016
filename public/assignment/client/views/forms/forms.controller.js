(function() {
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, $location, FormService) {

        $scope.selIndex = null;
        $rootScope.forms = [];
        var currentUser = $rootScope.user;
        var currentUserForms = $rootScope.forms;


        function initialiseForms() {
            getUserForms(currentUser._id);
        }

        initialiseForms();


        function getUserForms(userId) {

            FormService
                .findAllFormsForUser(userId)
                .then(function (response){

                angular.copy(response.data, currentUserForms);
                    console.log(currentUserForms);
            });



        }

        function getFormId(formTitle) {

            for (var i = 0; i < currentUserForms.length; i++) {
                if (currentUserForms[i].title == formTitle)
                    return currentUserForms[i]._id;
            }
        }

        $scope.addForm = function (form) {
            FormService
                .createFormForUser(currentUser._id, form)
                .then(function (response) {
                    currentUserForms.push(response.data);
                    $scope.form = {};
                    $scope.selIndex = null;
                });
            };

        $scope.updateForm = function (newForm) {

            console.log("update"+newForm._id);
            FormService
                .updateFormById(newForm._id, newForm)
                .then(function (response){
                    getUserForms(currentUser._id);
            });
            $scope.form={};
        };

        $scope.deleteForm = function (index) {

            FormService
                .deleteFormById(currentUserForms[index]._id)
                .then(function (response){
                    getUserForms(currentUser._id);

                });
            $scope.form={};
        };

        $scope.selectForm = function (index) {
            $scope.selIndex = index;
            $scope.form = {
                "_id": currentUserForms[index]._id,
                "title": currentUserForms[index].title,
                "userId": currentUserForms[index].userId
            };
        };


    }
})();