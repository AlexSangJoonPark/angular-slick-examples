(function() {
  'use strict';
  angular.module('carouselApp').directive('filter', filter);

  function filter() {
    return {
      templateUrl: 'template/directive/filter.html'
    };
  }
})();
