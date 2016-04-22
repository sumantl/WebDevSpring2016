(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService){

        var vm = this;
        $scope.allUsers =[];
        $scope.sortType = 'username';
        $scope.sortReverse = false;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;

        var user = $rootScope.user;


        function getAllUsers() {
            UserService
                .findAllUsers()
                .then(function (response) {
                    console.log("in admincontroller");
                    console.log(response);
                    $scope.allUsers = response.data;
                });
        }

        getAllUsers();


        function deleteUser(user){
            console.log("deleting user");
            console.log(user);
            UserService
                .deleteUserById(user._id)
                .then( function (response){
                    getAllUsers();
                });
        }

        function selectUser(user){

            angular.copy(user, $scope.newUser);

            //$scope.newUser = user;
        }

        function updateUser(user){
            console.log("update");
            UserService
                .updateUser(user)
                .then(function (response){
                    $scope.newUser = {};
                    getAllUsers();
                });
        }


        function  addUser(user){
            UserService
                .createUser(user)
                .then(function (response){
                    $scope.newUser = {};
                    getAllUsers();
                });
        }

    }

})();