(function() {
   'use strict';

   angular.module('app').directive('qrCode', qrCodeDirective);

   function qrCodeDirective() {
      return {
         link: qrCodeLink,
         restrict: 'A'
      };

      function qrCodeLink(scope, element, attrs) {
         var qrElement = document.getElementById(attrs.id);
         
         var qrcode = new QRCode(qrElement, {
            width: 128,
            height: 128
         });


         qrcode.makeCode('http://192.168.107.35');
      };
   };

})();