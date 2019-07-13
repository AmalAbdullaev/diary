import angular from 'angular';
import config from '../config'

angular
  .module('myApp', [])
  .controller('myController', ['$http', function($http) {
  const vm = this;
  const api = config.host;

  // $http.get(api + '/diary').then(function(response) {
  //   console.log(response.data);
  // });

  // $http.post(api + '/diary', {"m": 1}).then(function(response) {
  //   console.log(response.data);
  // });

  // $http.put(api + '/diary/27', {"mferf": 1123}).then(function(response) {
  //   console.log(response.data);
  // });

  // $http.delete(api + '/diary/26').then(function(response) {
  //   console.log(response.data);
  // });

}]);