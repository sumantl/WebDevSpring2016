(function(){
    angular
        .module('FormBuilderApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register=function(user){



            UserService
                .register(user)
                .then(function(response) {
                    $rootScope.user = response;
                    console.log($rootScope.user);
                    $location.path('/profile');

                });
        }
    }

})();
