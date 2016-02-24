(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService ($http) {

        var userInfo=[];
        userInfo=[
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };


        return api;

        function findUserByCredentials(username, password, callback) {

            for(var i=0;i<userInfo.length;i++){
                var tempUser=userInfo[i];
                if(tempUser.username==username&&tempUser.password==password)
                    callback(tempUser);

            }
            callback(null)

        }

        function findAllUsers(callback) {
            callback(userInfo);
        }


        function createUser(user, callback){
            var tempUser = user.clo;
            tempUser._id = (new Date).getTime();
            userInfo.push(tempUser);
            callback(tempUser);

        }

        function deleteUserById(userId, callback) {

            for(var i=0;i<userInfo.length;i++){
                var tempUser = userInfo[i];
                if(tempUser._id == userId){
                    userInfo.splice(i,1);
                }
            }
            callback(userInfo);
        }

        function updateUser(userId, user, callback) {

            for(var i=0;i<userInfo.length;i++){
                var tempUser = userInfo[i];
                if(tempUser._id == userId){
                    tempUser = user;
                    callback(tempUser);
                }
            }
            callback(null);
        }



    }
})();