(function(){
    angular
        .module('FormBuilderApp')
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/logout", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html"
                })
                .when("/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController"
                })
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController"
                })
                .when("/sort", {
                    templateUrl: "views/forms/sortable.html",
                    controller: "sortableController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
