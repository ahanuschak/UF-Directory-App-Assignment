angular.module('listings', ['ngMap'])

.run(function($rootScope) {
  $rootScope.$on('mapInitialized', function(evt,map) {
    $rootScope.map = map;
    $rootScope.$apply();
  });
})


.controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.
     */

    $scope.addListing = function(add) {
      $scope.listings.push(add);
      $scope.add = null;
	};
    $scope.deleteListing = function(index) {
      $scope.listings.splice($scope.listings.indexOf(index),1);
      $scope.showInfo = true;
	};
    $scope.showDetails = function(index) {
      index = $scope.listings.indexOf(index);
      $scope.code = $scope.listings[index].code;
      $scope.building = $scope.listings[index].name;
      $scope.address = $scope.listings[index].address;
      $scope.coordinates = $scope.listings[index].coordinates.latitude + ', ' + $scope.listings[index].coordinates.longitude;
      $scope.latlng = [29.643632, -82.35493];
      $scope.getpos = function(event){
        $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
      };
	};
  }
]);
