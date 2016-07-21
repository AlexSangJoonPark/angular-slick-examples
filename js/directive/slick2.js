(function() {
  'use strict';
  angular.module('carouselApp').directive('slick2', slick2);

  function slick2() {
    return {
      templateUrl: 'template/directive/slick2.html'
    };
  }
})();
