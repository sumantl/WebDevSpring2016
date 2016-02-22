(function(){
    angular
        .module('FormBuilderApp')
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "/views/users/register.view.html"
                })
                .when("/admin", {
                    templateUrl: "/views/users/admin.view.html"
                })
                .when("/login", {
                    templateUrl: "/views/users/login.view.html"
                })
                .when("/profile", {
                    templateUrl: "/views/users/profile.view.html"
                })
                .when("/logout", {
                    templateUrl: "/views/home/home.view.html"
                })
                .when("/forms", {
                    templateUrl: "/views/forms/forms.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
