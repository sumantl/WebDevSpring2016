(function(){
    angular
        .module('FormBuilderApp')
        .config(configuration);



    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller : "AdminController",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/logout", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/sort", {
                templateUrl: "views/forms/sortable.html",
                controller: "sortableController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated

            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();



        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {

                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {

                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };


})();
