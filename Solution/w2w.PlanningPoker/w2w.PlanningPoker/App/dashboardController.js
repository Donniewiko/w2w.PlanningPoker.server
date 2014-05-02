(function() {
   'use strict';
   angular.module('app').controller('dashboardController', ['$scope', '$state', '$injector', '$rootScope', dashboard]);

   function dashboard($scope, $state, $injector, $rootScope) {

      var signalRService;

      var initSignalR = function () {
         // client methods here
         

         var serverHub = $.connection.serverHub;

         serverHub.client.registerUser = function (connectionID) {
            $rootScope.$broadcast('registered', connectionID);
         };

         serverHub.client.proceedLogin = function (dashboard) {
            if (dashboard) {
               $state.go('dashboard');
            } else {
               $state.go('member');

            }
         };

         serverHub.client.submitCards = function (pokerCards) {
            $rootScope.$broadcast('pokerCards', pokerCards);
         };

         serverHub.client.teamMemberList = function (teamMembers) {
            $rootScope.$broadcast('teamMemberResult', teamMembers);
         }

         serverHub.client.sessionInProgress = function (inProgress) {
            $rootScope.$broadcast('sessionInProgress', inProgress);
         };


         serverHub.client.showResults = function (results) {
            console.log(results);
            $rootScope.$broadcast('results', results);
         };
         serverHub.client.cardReceived = function () {
            $rootScope.$broadcast('cardReceived');
         };

         $.connection.hub.start({ jsonp: true }).done(function () {
            signalRService = $injector.get('signalRService');

            signalRService.initTeamMembers();
         });

         return true;
      }();

      $scope.flip = false;

      $scope.teamMembers = [];
      $scope.sessionInProgress = false;
      $scope.results = [];
      
      $scope.$on('results', function (e, results) {
         $scope.$apply(function() {
            for (var i = 0; i < results.length; i++) {
               for (var j = 0; j < $scope.teamMembers.length; j++) {
                  if ($scope.teamMembers[j].ConnectionID == results[i].ConnectionID) {
                     $scope.teamMembers[j].SelectedCard = results[i].Card;
                  break;   
                  }

               }
            }
            $scope.flip = true;
         });
      });

      // initial load of the teammembers
      

      $scope.$on('teamMemberResult', function(e, result) {
         // listner for when there are (new) members added
         $scope.$apply(function () {
            $scope.teamMembers = result;
         });
      });

      $scope.startRound = function () {
         $scope.flip = false;
         for (var j = 0; j < $scope.teamMembers.length; j++) {
            $scope.teamMembers[j].SelectedCard = null;
         };
         signalRService.startRound();
      };
   };
})();