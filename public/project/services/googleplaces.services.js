(function() {
    angular
        .module("ExploreWithMeApp")
        .factory("GooglePlaces", GooglePlaces);

    function GooglePlaces($http) {

        var api = {
            searchPlace: searchPlace,
            searchBusiness: searchBusiness,
            placesWithSearchBox:placesWithSearchBox,
            searchPlaces:searchPlaces
        };
        return api;

        function searchPlace(query, callback) {



            var base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyA5JatahzabYm8Sob8yroyA2utO5VOpdP8&query=";

            $http.get(base_url + query)
                .success(callback);

        }

        function searchPlaces(query, callback){

            var map;
            var infowindow;
            var mainResults;


                var pyrmont = {lat: -33.867, lng: 151.195};

                map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 15
                });

                infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch({
                    location: pyrmont,
                    radius: 500,
                    type: ['store']
                }, callback1);


            function callback1(results, status) {
                mainResults=results;
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }

            callback(map);

    }

        function placesWithSearchBox (callback){
            var places;
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -33.8688, lng: 151.2195},
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });


            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });


            var markers = [];


            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                places = searchBox.getPlaces();


                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];
                callback(places);
                // For each place, get the icon, name and location.

                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };


                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });


        }

        function searchBusiness(businessId, callback) {
            var base_url = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA5JatahzabYm8Sob8yroyA2utO5VOpdP8&placeid=";
            $http.get(base_url + businessId)
                .success(callback);
        }

    }
})();
