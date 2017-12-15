var App = {};

App.MainCtrl = function($scope, dataService) {
  this.scope = $scope;
  this.items = [];
  this.favorites = [];
  this.categories = [
    'Favorites',
    'BTC Markets',
    'ETH Markets',
    'USDT Markets'
  ];
  this.dataService = dataService;
  this.selectedCategory = 'BTC Markets';

  var errorHandler = function(response) {
    console.error(response);
  };

  dataService.getData().then(angular.bind(this, function(response) {
    this.items = response.data;
  }), errorHandler);
};

App.MainCtrl.prototype.setFavoriteItem = function(item) {
  var itemIndex = this.favorites.indexOf(item);

  if (itemIndex > -1) {
    this.favorites.splice(itemIndex, 1);
  } else {
    this.favorites.push(item);
  }
};

App.MainCtrl.prototype.setSelectedCategory = function(category) {
  this.selectedCategory = category;
};

App.MainCtrl.prototype.getSelectedCategory = function() {
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
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 8
      }).format(num);
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

var ngApp = angular.module('app', [
  'ngRoute',
  'ngAnimate'
]);

ngApp.controller('MainCtrl', ['$scope', 'dataService', App.MainCtrl]);
ngApp.service('dataService', ['$http', App.DataService]);
