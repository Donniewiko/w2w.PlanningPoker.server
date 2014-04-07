//app.config(function ($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.otherwise('/');
//   $stateProvider.state('home', {
//      url: "/"
//   }).state('queueItem', {
//      url: "/{queueID:[0-9]{1,8}}",
//      templateUrl: "Partials/QueueDetails.html"
//   });
//});

(function() {
   'use strict';

   var app = angular.module('app');

   app.config(['$stateProvider', '$urlRouterProvider', routeConfigurator]);
   function routeConfigurator($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('login', {
         templateUrl: "App/login.html",
         controller: "loginController"
      }).state('member', {
         templateUrl: "App/member.html",
         controller: "memberController"
      }).state('dashboard', {
         templateUrl: "App/Dashboard.html",
         controller: "dashboardController"
      });
   }
})();