var q = require("q");
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var userSchema = require('./user.schema.server.js')(mongoose);

    var User = mongoose.model("user", userSchema);


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

        var deferred = q.defer();

        User.findOne(
            {'username': username, 'password' : password },
            function(err, user){
                deferred.resolve(user);
            });
        return deferred.promise;
    }


    function  findUserById(userId){
        var deferred = q.defer();

        User.findById(userId,
            function(err, user){
                deferred.resolve(user);
            });
        return deferred.promise;

    }


    function findUserByUserName(userName) {

        var deferred = q.defer();

        User.findOne(
            {'username': username},
            function(err, user){
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        User.findOne(
            function(err, userList){
                deferred.resolve(userList);
            });
        return deferred.promise;
    }

    function createUser(user) {

        user._id = uuid.v1();

        var deferred = q.defer();

        User.create(user,
            function(err, user){
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        User.remove(userId,
            function(err, user){
                deferred.resolve(user);
            });
        return deferred.promise;

    }

    function updateUser(userId, user) {

        var deferred = q.defer();
        delete user._id;

        console.log(userId);

        User.update(
            {'_id' : userId},
            {$set : user},
            function(err, update){
                if(err){
                    console.log("error updating");
                    console.log(err);
                    deferred.reject(err);
                }
                else{

                    console.log("success");
                    console.log(update);
                }
            }
        );
        return deferred.promise;
    }

};