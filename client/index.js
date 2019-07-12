import angular from 'angular';

angular
  .module('myApp', [])
  .controller('myController', ['$http', function($http) {
  let vm = this;

  $http.get('http://localhost:3000/diary').then(function(response) {
    console.log(response.data);
  });
  
}]);