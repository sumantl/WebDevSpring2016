(function(){
    angular
        .module('FormBuilderApp')
        .controller('LoginController',LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

        $scope.login=function(user){


            UserService
                //.findUserByCredentials(user.username, user.password)
                .login(user)
                .then(function(response){

                    console.log(response);

                    var empty={};
                    if (response.data.username == null){
                        $location.path('/login');
                        console.log("Login Failed");
                    }
                    else{
                        $rootScope.user=response.data;
                        $location.path('/profile');
                        console.log("Logged IN");
                    }


                });
        }

    }

})();
