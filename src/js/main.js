var App = {};

App.MainCtrl = function($scope, dataService) {
  this.scope = $scope;
  this.items = [];
  this.categories = [
    'Favorites',
    'BTC Markets',
    'ETH Markets',
    'USDT Markets'
  ];
  this.dataService = dataService;
  this.selectedCategory = '';

  var errorHandler = function(response) {
    console.error(response);
  };

  dataService.getData().then(angular.bind(this, function(response) {
    this.items = response.data;
  }), errorHandler);
};

App.MainCtrl.prototype.setSelectedCategory = function(category) {
  this.selectedCategory = category;
  // console.log(this.selectedCategory);
};

App.MainCtrl.prototype.getSelectedCategory = function() {
  // console.log(this.selectedCategory);
  return this.selectedCategory;
};

App.DataService = function($http) {
  var getRequest = function() {
    return {
      method: 'GET',
      url: 'json/data.json',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  };

  return {
    getData: function() {
      return $http(getRequest());
    },
    volumeFormatter: function(num) {
      return new Intl.NumberFormat('en-US').format(num);
    },
    lastPriceBaseFormatter: function(num) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(num);
    },
    dayChangeFormatter: function(num) {
      return (num > 0) ? '+' + num : num;
    }
  };
};

App.MainCtrl.categoryItem = function() {
  return {
    restrict: 'A',
    controller: 'MainCtrl',
    scope: {},
    link: function(scope, element, attrs, ctrl) {
      if (attrs.categoryItem === 'BTC Markets') {
        ctrl.setSelectedCategory('BTC Markets');
        // ctrl.selectedCategory = 'BTC Markets';
        // console.log(scope.selectedCategory);
        element.addClass('binance-theme active');
      }

      element.on('click', function() {
        if (ctrl.getSelectedCategory() !== attrs.categoryItem) {
          // console.log(scope.selectedCategory);
          ctrl.setSelectedCategory(attrs.categoryItem);
        }

        scope.$apply();
      });
    }
  };
};

var ngApp = angular.module('app', [
  'ngRoute',
  'ngAnimate'
]);

ngApp.controller('MainCtrl', ['$scope', 'dataService', App.MainCtrl]);
ngApp.directive('categoryItem', App.MainCtrl.categoryItem);
ngApp.service('dataService', ['$http', App.DataService]);
