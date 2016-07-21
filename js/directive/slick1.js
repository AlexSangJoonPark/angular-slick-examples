(function() {
  'use strict';
  angular.module('carouselApp').directive('slick1', slick1);

  function slick1() {
    return {
      templateUrl: 'template/directive/slick1.html'
    };
  }
})();
