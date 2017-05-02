angular.module('app')
	.controller('PredictionController', PredictionController)
  .controller('SendTextController', SendTextController)
  .config(routes);


routes.$inject = ['$routeProvider', '$locationProvider'];
function routes($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "/main.html"
    })
    .when('/twilio', {
      templateUrl: "/sent.html",
      controller: 'SendTextController'
    });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase: false
    });
}

PredictionController.$inject = ['$http'];
function PredictionController($http) {
	var vm = this;
	$http
      .get('/prediction')
      .then(function(response){
      	var data = parseInt(response.data.prediction);
      	console.log(data);
      	if (data == 0) {
        	vm.prediction = "Jacket";
        } else if(data == 1) {
        	vm.prediction = "Sweater";
        } else if(data == 2) {
        	vm.prediction = "T-shirt";
        } else if(data == 3) {
        	vm.prediction = "Nothing";
        }  

        vm.temp = parseInt(response.data.temp);

    });
}

function SendTextController($http) {
  var vm = this;
  $http
      .get('/twilio')
      .then(function(response){
        console.log(response);
      });
}
