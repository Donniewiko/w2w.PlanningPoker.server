(function () {
   'use strict';

   var app = angular.module('app', [
       // Angular modules 
       'ngAnimate',        // animations
       'ui.router',          // routing
       'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

       // 3rd Party Modules
       'mgcrea.ngStrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
   ]);
})();