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

    // Closest odd square root
    var closestRoot = Math.ceil(Math.sqrt(num));
    if(closestRoot % 2 == 0 )
      closestRoot++;

    // Square of closes square root
    var closestSquare = Math.pow(closestRoot, 2);

    // Distance away from the center element (1) in imaginary squares
    var delta = (closestRoot / 2) + 0.5;

    // Amount of numbers in each imaginary square
    var numsInSquare = delta * 8;

    var x, y, neutralXUpper, neutralXLower, neutralYLeft, neutralYRight;

    // The points that determine if the x or y value will be negative or positive
    neutralXUpper = closestSquare - delta - (numsInSquare / 2);
    neutralXLower = closestSquare - delta;
    neutralYLeft = closestSquare - (numsInSquare / 2) + delta;
    neutralYRight = closestSquare - numsInSquare + delta;

    // Corners of each imaginary square
    upperLeft = closestSquare - (numsInSquare / 2);
    upperRight = upperLeft - closestRoot - 1;
    lowerLeft = closestSquare - closestRoot - 1;
    lowerRight = closestSquare;

    // If closest to lower right and bottom
    if(Math.abs(num - lowerRight) <= delta) {
      x = Math.abs(num - neutralXLower);
      y = delta * -1;
    // If closest to lower right and right
    } else if(Math.abs(num - lowerRight) > numsInSquare - delta) {
      x = delta;
      y = Math.abs(num - neutralYRight) * -1;
    // If closest to lower left
    } else if(Math.abs(num - lowerLeft) <= delta) {
      x = -1;
      Math.abs(num - neutralXLower) > delta ? x *= Math.abs(num - neutralXLower) : x *=  delta;
      y = -1;
      Math.abs(num - neutralYLeft) > delta ? y *= Math.abs(num - neutralYLeft) : y *=  delta;
    // If closest to upper left
    } else if(Math.abs(num - upperLeft) <= delta) {
      x = -1;
      Math.abs(num - neutralXUpper) > delta ? x *= Math.abs(num - neutralXUpper) : x *=  delta;
      y = 1;
      Math.abs(num - neutralYLeft) > delta ? y *= Math.abs(num - neutralYLeft) : y *=  delta;
    // If closest to upper right
    } else {
      x = 1;
      Math.abs(num - neutralXUpper) > delta ? x *= Math.abs(num - neutralXUpper) : x *=  delta;
      y = 1;
      Math.abs(num - neutralYRight) > delta ? y *= Math.abs(num - neutralYRight) : y *=  delta;
    }

    // Finally translate the item to it's final destination in the spiral
    translate($('.item:nth-of-type(' + num + ')'), x, y);

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