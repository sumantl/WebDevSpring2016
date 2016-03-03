(function(){

angular.module('ExploreWithMeApp')
    .controller('PlaceController', PlaceController);

    function PlaceController ($scope, GooglePlaces) {



        GooglePlaces.placesWithSearchBox(function (places) {

            $
            $scope.places = places;
            console.log(places);


        })
        $scope.searchMap=function(search) {





        }
    }
})();

