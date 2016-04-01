(function(){
    angular
        .module('FormBuilderApp')
        .controller('ProfileController',ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {

        $scope.update=function(user){

            console.log("Profile Controller");
            console.log(user);

            var userId=$rootScope.user._id;
            UserService.updateUser(userId,user,
                function(response){
                    $rootScope.user=response;
                    console.log("Profile");
                }
            )

            $location.path('/profile');
            }



    };

})();
