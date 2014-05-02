(function() {
   'use strict';
   
   angular.module('app').controller("baseController", ['$scope','$state', baseController]);

   function baseController($scope, $state) {
      $scope.title = "Titel";
      $state.go('dashboard');
   };

})();