var userInfo = require("./user.mock.json");

module.exports = function() {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUserName: findUserByUserName,
        findUserById : findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser

    };
    return api;


    function findUserByCredentials(username, password) {

        var result = {};
        for (var i = 0; i < userInfo.length; i++) {
            if (userInfo[i].username == username && userInfo[i].password == password) {
                console.log("User Found");
                //angular.copy(userInfo[i], result);
                console.log(result);
                return userInfo[i];
                //break;
            }
        }
    }

    function  findUserById(userId){
        for(var i = 0; i < userInfo.length; i++){
            if(userInfo[i]._id == userId){
                return userInfo[i];
            }
        }

    }
    function findUserByUserName(userName) {

        for(var i = 0; i < userInfo.length; i++){
            if(userInfo[i].username == userName){
                return userInfo[i];
            }
        }
    }

    function findAllUsers() {
        return userInfo;
    }

    function createUser(user) {
        var tempUser = {};
        angular.copy(user, tempUser);
        tempUser._id = (new Date).getTime();
        userInfo.push(tempUser);
        return tempUser;
    }

    function deleteUserById(userId) {
        for (var i = 0; i < userInfo.length; i++) {
            if (userInfo[i]._id == userId) {
                userInfo.splice(i, 1);
                return userInfo;
            }
        }

    }

    function updateUser(userId, user) {

        var result = null;
        for (var i = 0; i < userInfo.length; i++) {

            if (userInfo[i]._id == userId) {
                angular.copy(user, userInfo[i]);
                angular.copy(userInfo[i], result);

            }
        }

        return result;
    }
}