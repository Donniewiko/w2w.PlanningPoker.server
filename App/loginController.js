(function() {
   'use strict';
   angular.module('app').controller('loginController', ['$scope', '$state', 'signalRService', login]);

   function login($scope, $state, signalRService) {
      $scope.connectionID = '';

      $scope.$on('registered', function(e, connectionID) {
         $scope.connectionID = connectionID;
      });

      $scope.submitLogin = function() {
         var userName = $scope.username;
         var redirectToDashboard = $scope.dashboard;
         var connectionID = $scope.connectionID;
         signalRService.registerUser(userName, redirectToDashboard, connectionID);
      };
   }
})();
