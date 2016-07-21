(function() {
  'use strict';
  angular.module('carouselApp').controller('CarouselController', CarouselController);

  CarouselController.$inject = ['$scope', '$timeout'];

  function CarouselController($scope, $timeout) {
    var vm = this;
    vm.type = 1;  // slick type
    vm.setType = setType;
    vm.showLoading = showLoading;
    vm.containerVisible = containerVisible;

    vm.startTime = Date.now();
    vm.endTime = null;
    vm.elapsedTime = 0;
    vm.resetTime = resetTime;
    vm.updateElapsedTime = updateElapsedTime;
    vm.output = '';

    vm.filterLoading = true;
    vm.isFilterSet = false;
    vm.newSlideCount=0;
    vm.increase = increase;
    vm.slides = 0;

    vm.count = 5000;
    vm.arrayListCache = {};
    vm.arrayList = arrayList;

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
    
    function setType(type) {
      if (type) {
        vm.showLoading(true);
        $timeout(function() {
          vm.type = type;
          vm.isFilterSet = false;
        }, 100);
      }
    }

    function arrayList(type, count) {

      if (!type) {
        type = 1;   // default
      }
      if (!count) {
        count = 5000; // default
      }

      var arrayListCache = vm.arrayListCache;
      if (!arrayListCache[type]) {
        arrayListCache[type] = [];
        for (var i = 0; i < count; i++) {
          arrayListCache[type].push(i);
        }
      }
      vm.count = arrayListCache[type].length;
      return arrayListCache[type];
    };

    function updateElapsedTime() {
        vm.endTime = Date.now();
        vm.elapsedTime = vm.endTime - vm.startTime;
    }
    function resetTime() {
      vm.startTime = Date.now();
      vm.endTime = null;
      vm.elapsedTime = 0;
    }

    function increase() {
      return vm.newSlideCount++;
    }

    function showLoading(isShow) {
      if (isShow) {
        $('.spinner-wrapper').removeClass('hidden');
      } else {
        $('.spinner-wrapper').addClass('hidden');
      }
    }

    function containerVisible(isVisable) {
      if (isVisable) {
        $('.carousel-wrapper').css('overflow', 'visible');
      } else {
        $('.carousel-wrapper').css('overflow', 'hidden');
      }
    };

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

  }


})();
