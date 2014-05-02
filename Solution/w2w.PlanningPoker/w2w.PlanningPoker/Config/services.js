(function () {
   'use strict';

   angular.module('app').factory('signalRService', ['$rootScope', '$state', function ($rootScope, $state) {
      var service = {};

      var serverHub = $.connection.serverHub;

      service.getCards = function () {
         return serverHub.server.getCards();
      }

      service.registerUser = function (username, dashboard, connectionID) {
         var sendToDashboard = dashboard || false;
         return serverHub.server.registerTeamMember(username, sendToDashboard, connectionID);
      }

      service.submitCard = function (card) {
         return serverHub.server.submitCard(card.StoryPoints);
      }
      service.startRound = function () {
         return serverHub.server.startRound();
      };

      service.initTeamMembers = function() {
         return serverHub.server.initTeamMemberList();
      };

      return service;
   }]);

})();