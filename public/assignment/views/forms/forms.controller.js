(function() {
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, $location, FormService) {

        $scope.selIndex = null;
        $scope.forms = [];
        var currentUser = $rootScope.user;
        var currentUserForms = $scope.forms;


        function initialiseForms() {
            getUserForms(currentUser._id);
        }

        initialiseForms();


        function getUserForms(userId) {

            FormService.findAllFormsForUser(userId, function (response) {
                angular.copy(response, currentUserForms);
            });
        }

        function getFormId(formTitle) {

            for (var i = 0; i < currentUserForms.length; i++) {
                if (currentUserForms[i].title == formTitle)
                    return currentUserForms[i]._id;
            }
        }

        $scope.addForm = function (form) {
            FormService.createFormForUser(
                currentUser._id,
                form,
                function (response) {
                    currentUserForms.push(response);
                    $scope.form = {};
                    $scope.selIndex = null;
                }
            )
        };

        $scope.updateForm = function (newForm) {

            console.log("update"+newForm._id);
            FormService.updateFormById(newForm._id, newForm, function (response) {
                getUserForms(currentUser._id);
            });
            $scope.form={};
        };

        $scope.deleteForm = function (index) {


            FormService.deleteFormById(currentUserForms[index]._id, function (response) {
                getUserForms(currentUser._id);
            });
            $scope.form={};
        };

        $scope.selectForm = function (index) {
            $scope.selIndex = index;
            /*
            console.log(index);
            console.log(currentUserForms[index]._id);
            console.log(currentUserForms[index].title);
            console.log(currentUserForms[index].userId);
            */
            $scope.form = {
                "_id": currentUserForms[index]._id,
                "title": currentUserForms[index].title,
                "userId": currentUserForms[index].userId
            };
        };


    }
})();