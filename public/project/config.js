(function(){
    angular
        .module('ExploreWithMeApp')
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
                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "PlaceController"
                })
                .when("/restaurants", {
                    templateUrl: "views/admin/restaurants.view.html"
                })
                .when("/recipe", {
                    templateUrl: "views/admin/recipe.view.html"
                })
                .when("/itinerary", {
                    templateUrl: "views/admin/itinerary.view.html"
                })
                .when("/destination", {
                    templateUrl: "views/admin/destination.view.html"
                })
                .when("/comments", {
                    templateUrl: "views/admin/comments.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
