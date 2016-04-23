var passport      = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel){


    var auth = authorized;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login',    passport.authenticate('local'), login);
    app.get('/api/loggedin', loggedin);
    app.post  ('/api/register', register);
    app.get('/api/logout',logout)



    app.get('/api/assignment/user',getUsers);
    app.get('/api/assignment/user/:id',findUserById);
    app.post('/api/assignment/user', createUser);

    app.get('/api/assignment/user?username=username',getUsers);
    app.get( '/api/assignment/user?username=alice&password=wonderland',getUsers);
    app.put('/api/assignment/user/:id',updateUser);
    app.delete('/api/assignment/user/:id',deleteUserById);




    function register(req, res) {

        var tempUser = req.body;

        userModel
            .findUserByUserName(tempUser.username)
            .then(function (user) {
                    if (user) {
                        res.json(null);
                    }
                    else {
                        console.log(user);
                        tempUser.password = bcrypt.hashSync(tempUser.password);
                        return userModel.createUser(tempUser);

                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUserName(username)
            .then(
                function(user) {
                    console.log(user);
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }



    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }





    function getUsers(req, res){
        if(req.query.username) {
            if (req.query.password) {
                userModel
                    .findUserByCredentials(req.query.username, req.query.password)
                    .then(function (user){
                        res.json(user);
                    });
            }
            else {
                findUserByUserName(req.query.username, res)
            }
        }
        else{
            userModel.findAllUsers()
                .then(function (userList){
                    res.json(userList);
                });

        }
    }

    function findUserByUserName(username, res) {
        userModel
            .findUserByUserName(username)
            .then(function (response) {
                res.json(response);
            });
    }

    function  deleteUserById(req, res){
        userModel
            .deleteUserById(req.params.id)
            .then(function (response){
                res.json(response);
            });

    }


    function  createUser(req, res){
        var tempUser = req.body;
        userModel
            .createUser(tempUser    )
            .then(function (user){
                res.json(user);
            });



    }

    function findUserByCredentials(username, password){
        return (userAccess.findUserByCredentials(username, password));
    }

    function updateUser(req, res){
        console.log(35445);
        console.log(tempUser);
        var tempUser = req.body;
        console.log(req.params.id);
        console.log(tempUser);
        userModel
            .updateUser(req.params.id, tempUser)
            .then(function (updatedUser){
                console.log(updatedUser);
                res.json(updatedUser);
            });


    }

    function findUserById(req, res){

        res.json(userAccess.findUserById(req.params.id));

    }



};
