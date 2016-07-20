(function() {
  'use strict';
  angular.module('carouselApp').controller('CarouselController', CarouselController);

  CarouselController.$inject = ['$scope', '$timeout'];

  function CarouselController($scope, $timeout) {
    var vm = this;

    vm.startTime = Date.now();
    vm.endTime = null;
    vm.elapsedTime = 0;
    vm.resetTime = function() {
      vm.startTime = Date.now();
      vm.endTime = null;
      vm.elapsedTime = 0;
    }
    vm.updateElapsedTime = function() {
        vm.endTime = Date.now();
        vm.elapsedTime = vm.endTime - vm.startTime;
    }

    vm.output = '';
    vm.showLoading = function(isShow) {
      if (isShow) {
        $('.spinner-wrapper').removeClass('hidden');
      } else {
        $('.spinner-wrapper').addClass('hidden');
      }
    }

    vm.filterLoading = true;
    vm.isFilterSet = false;

    vm.count = 5000;
    vm.arrayList = function() {
      var arrayList = [];
      for (var i = 0; i < vm.count; i++) {
        arrayList.push(i);
      }
      return arrayList;
    };

    vm.newSlideCount=0;
    vm.increase = function() {
      return vm.newSlideCount++;
    }

    vm.slides = 0;
    function updateNoOfSlide() {
      vm.slides = $('.slick-track').children().length;
      $('#noOfSlides').text(vm.slides);

      console.log(vm.slides);
      // $scope.$apply();
    }

    vm.onBeforeChange = function() {
      console.log("changeBefore triggered.");
      vm.resetTime();
    }

    vm.onAfterChange = function() {
      console.log("changeAfter triggered.");
      vm.updateElapsedTime();
      $scope.$apply();
    }

    vm.onSetPosition = function() {
      console.log("onSetPosition triggered.");
    }

    // filter cannot setting in init function
    vm.onInit = function() {
      console.log("onInit triggered.");
      vm.updateElapsedTime();

      updateNoOfSlide();
      vm.containerVisible(true);
      vm.showLoading(false);

    }

    vm.onReInit = function() {
      console.log("onReInit triggered.");
      updateNoOfSlide();
    }

    vm.setFilter = function(flag) {
      if (!vm.isFilterSet && flag) {
          console.log("setFilter:"+vm.isFilterSet);
          vm.showLoading(true);
          vm.resetTime();

          $timeout(function() {
            $('.my-slick').slick('slickFilter', filter);
            function filter(index) {
              return index < 10;
            };
            vm.isFilterSet = true;
            vm.updateElapsedTime();

            vm.showLoading(false);
            updateNoOfSlide();
          }, 100);

      } else if (!flag){
          vm.showLoading(true);
          vm.resetTime();

          $timeout(function() {
            vm.slickCommands('slickUnfilter');
            vm.isFilterSet = false;
            vm.updateElapsedTime();

            vm.showLoading(false);
            updateNoOfSlide();
          }, 100);

      }
    }


    vm.slickCommands = function(command, param1) {
      console.log(command+" executed!");
      var result = $('.my-slick').slick(command, param1);
      vm.output = result.toString();
      console.log(result);
    }

    vm.addSlide = function(markup, index, addBefore) {
      console.log(markup);
      $('.my-slick').slick('addSlide', markup, index, addBefore);
      updateNoOfSlide();
    }

    vm.removeSlide = function(index, removeBefore, removeAll) {
        $('.my-slick').slick('removeSlide', index, removeBefore, removeAll);
        updateNoOfSlide();
    }

    vm.getCurrent = function() {
      var currentIndex = $('.my-slick').slick('getCurrent');
      return currentIndex;
    }
    vm.getLeft = function() {
      var currentIndex = $('.my-slick').slick('getCurrent');
      vm.slickCommands('getLeft', currentIndex);
    }
    vm.setSlideClasses = function(index) {
      var currentIndex = $('.my-slick').slick('getCurrent');
      vm.slickCommands('setSlideClasses', currentIndex);
    }

    vm.containerVisible = function(isVisable) {
      if (isVisable) {
        $('.carousel-wrapper').css('overflow', 'visible');
      } else {
        $('.carousel-wrapper').css('overflow', 'hidden');
      }
    };
  }


})();
