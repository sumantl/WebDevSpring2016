(function(){
    angular
        .module("ExploreWithMeApp")
        .factory("YelpService", YelpService);

    function YelpService($http) {

        var api = {
            searchYelp: searchYelp,
            searchBusiness: searchBusiness
        };
        return api;

        function searchYelp(title, callback) {
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
            var Yelp = require('yelp');
            var yelp = new Yelp({
                consumer_key: 'consumer-key',
                consumer_secret: 'consumer-secret',
                token: 'token',
                token_secret: 'token-secret',
            });



        }

        function searchBusiness(businessId, callback) {
            $http.get("http://www.omdbapi.com/?i="+imdbID)
                .success(callback);
        }

    }
})();/**
 * Created by lohiy on 3/1/2016.
 */
