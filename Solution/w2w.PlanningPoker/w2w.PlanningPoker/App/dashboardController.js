(function() {
   'use strict';
   angular.module('app').controller('dashboardController', ['$scope', '$state', 'signalRService', dashboard]);

   function dashboard($scope, $state, signalRService) {
      $scope.teamMembers = [];
      $scope.sessionInProgress = false;
      $scope.results = [];

      $scope.$on('results', function(e, results) {
         $scope.$apply(function() {
            for (var i = 0; i < results.length; i++) {
               for (var j = 0; j < $scope.teamMembers.length; j++) {
                  if ($scope.teamMembers[j].ConnectionID == results[i].ConnectionID) {
                     $scope.teamMembers[j].SelectedCard = results[i].Card;
                  break;   
                  }

               }
            }
            // match connectionID from results with teamMembers
         });
      });
      // initial load of the teammebers
      signalRService.initTeamMembers();

      $scope.$on('teamMemberResult', function(e, result) {
         // listner for when there are (new) members added
         $scope.$apply(function () {
            $scope.teamMembers = result;
         });
      });

      $scope.startRound = function () {
         for (var j = 0; j < $scope.teamMembers.length; j++) {
            $scope.teamMembers[j].SelectedCard = null;
         };
         signalRService.startRound();
      };

   };
})();