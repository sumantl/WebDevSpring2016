(function(){
    angular
        .module('ExploreWithMeApp')
        .controller('MainController',MainController);

    function MainController($scope,$location) {
        $scope.$location = $location;
    }

})();
