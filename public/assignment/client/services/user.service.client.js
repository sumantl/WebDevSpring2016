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
            updateUser: updateUser

        };
        return api;

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

            /*var tempUser ={}
            angular.copy(user,tempUser);
            tempUser._id = (new Date).getTime();
            userInfo.push(tempUser);
            //  callback(tempUser);
            */
        }

        function deleteUserById(userId) {

            return $http.delete('/api/assignment/user/'+userId);
            /*
            for(var i=0;i<userInfo.length;i++){
                if(userInfo[i]._id == userId){
                    userInfo.splice(i,1);
                    break;
                }
            }
            // callback(userInfo);
            */
        }

        function updateUser(userId, user) {

            return $http.put('/api/assignment/user/'+userId,user);
            /*
            var result = null;
            for(var i=0;i<userInfo.length;i++){

                if(userInfo[i]._id == userId){
                    angular.copy(user,userInfo[i]);
                    angular.copy(userInfo[i],result);
                    break;
                }
            }
            // callback(result);
            */

        }
    }
})();