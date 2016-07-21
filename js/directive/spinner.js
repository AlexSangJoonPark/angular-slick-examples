(function() {
  'use strict';
  angular.module('carouselApp').directive('spinner', spinner);

  function spinner() {
    return {
      templateUrl: 'template/directive/spinner.html'
    };
  }
})();
