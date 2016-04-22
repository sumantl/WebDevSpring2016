(function(){
    angular
        .module('FormBuilderApp')
        .controller('ProfileController',ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {

        $scope.update=function(user){

            console.log("Profile Controller");
            console.log(user);

            var userId=$rootScope.user._id;
            UserService
                .updateUser(user)
                .then(function(response){
                    UserService
                        .findUserByUserName(user.username)
                        .then(function (updatedUser){
                            console.log(updatedUser);
                            $rootScope.user = updatedUser.data;
                        });
                    console.log("Profile");
                });

            $location.path('/profile');
            }



    };

})();
