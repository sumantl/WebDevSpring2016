'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService ($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByUserName : findUserByUserName,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            login: login,
            register : register,
            logout : logout

        };
        return api;



        function logout(){
            return $http.get('/api/logout');
        }


        function register(user){
            return $http.post('/api/register',user);
        }

        function login(user){
            return $http.post('/api/login',user);
        }




        function findUserByCredentials(username, password) {

            return $http.get('/api/assignment/user?username='+username+'&password='+password);

        }

        function findUserByUserName(username){

            return $http.get('/api/assignment/user?username='+username);
        }

        function findAllUsers() {
            return $http.get('/api/assignment/user');
        }

        function createUser(user){

            return $http.post('/api/assignment/user', user);

        }

        function deleteUserById(userId) {

            return $http.delete('/api/assignment/user/'+userId);

        }

        function updateUser(user) {
            console.log("Update Ser");
            console.log(user);
            return $http.put('/api/assignment/user/' + user._id, user);

        }



    }
})();