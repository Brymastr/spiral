var app = angular.module('spiral', []);

app.controller('MainController', function($scope) {
  $scope.range = 10;

  $scope.getNumber = function(num) {
    return new Array(num);
  };

  $scope.checkPrime = function(num) {
    if (num < 2) return false;

    var q = parseInt(Math.sqrt(num));

    for (var i = 2; i <= q; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  };
});
