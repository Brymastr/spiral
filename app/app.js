var app = angular.module('spiral', []);

app.controller('MainController', function($scope) {
  $scope.lower_bound = 1;
  $scope.upper_bound = 10;

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

  $scope.positionDiv = function(num) {

    var closestSquare = Math.ceil(Math.sqrt(num));
    if(closestSquare % 2 == 0 )
      closestSquare++;
    console.log(closestSquare);

    //var x = ;
    //var y = ;


    translate($('.item:nth-of-type(' + num + ')').nextAll(), 1, 0);

  }
});


function translate(item, x, y) {
  item.css({position: 'relative'});

  item.animate({
    left: units(x),
    top: units(-y)
  }, 0);
}

function units(num) {
  return '' + (num * 44);
};