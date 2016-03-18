var userAccess = require("../models/user.model.js")();

module.exports = function(app){
    app.get('/api/assignment/user',getUsers);
    app.get('/api/assignment/user/:id',findUserById);
    app.post('/api/assignment/user', createUser);

    app.get('/api/assignment/user?username=username',getUsers);
    app.get( '/api/assignment/user?username=alice&password=wonderland',getUsers);
    app.put('/api/assignment/user/:id',updateUser);
    app.delete('/api/assignment/user/:id',deleteUserById);

    function getUsers(req, res){
        if(req.query.username) {
            if (req.query.password) {
                res.json(findUserByCredentials(req.query.username, req.query.password));

            }
            else
                res.json(findUserByUserName(req.query.username));
        }
        else
                res.json(userAccess.findAllUsers());
    }

    function  deleteUserById(req, res){
        res.json(userAccess.deleteUserById(req.params.id))

    }

    function findUserByUserName(username){
            return (userAccess.findUserByUserName(username));

    }


    function  createUser(req, res){
        var tempUser = req.body;
        res.json(userAccess.creatUser(tempUser));

    }

    function findUserByCredentials(username, password){
          return (userAccess.findUserByCredentials(username, password));
    }

    function updateUser(req, res){
        var tempUser = res.body;
        res.json(userAccess.updateUser(req.params.id, tempUser));

    }

    function findUserById(req, res){

        res.json(userAccess.findUserById(req.params.id));

    }



};
