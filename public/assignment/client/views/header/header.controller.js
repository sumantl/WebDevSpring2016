(function(){
    angular
        .module('FormBuilderApp')
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$rootScope, UserService) {

        $scope.logout = logout;

        function logout(){


            UserService
                .logout()
                .then (function(response){
                    console.log("logged out");
                    $rootScope.user=null;
                });
        }

    }
})();