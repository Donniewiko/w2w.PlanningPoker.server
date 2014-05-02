(function() {
   'use strict';

   var app = angular.module('app');

   app.config(['$stateProvider', '$urlRouterProvider', routeConfigurator]);
   function routeConfigurator($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('dashboard', {
         Url: '/',
         templateUrl: "App/Dashboard.html",
         controller: "dashboardController"
      });
   }
})();