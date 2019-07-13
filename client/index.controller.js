import angular from 'angular';
import config from '../config'

angular
  .module('myApp', [])
  .controller('myController', ['$http', '$document', '$element', function($http, $document, $element) {

  const vm = this;
  const api = config.host;
  const modal = angular.element(document.querySelector("#myModal"));
  vm.records = [];
  vm.categories = [];
  vm.selectedCategory =  "Выберите категорию"  ;

  vm.record = {};

  vm.openModal = function () {
    // console.log(modal[0].style);
    modal[0].style.display = "block";
  }

  vm.closeModal = function () {
    modal[0].style.display = "none";
  }

  function loadAll() {
    $http.get(api + '/diary').then(function(response) {
      // console.log(response.data);
      vm.records = response.data;
      $http.get(api + '/categories').then(function(response) {
        // console.log(response.data);
        vm.categories = response.data;
        console.log(vm.categories);
      }); 
    });    
  }

  vm.setSelectedColor = function(){

    let category =  vm.categories.find((category) => {
      if(category.name === vm.selectedCategory)
        return category;
    }) || 'white';

    return { 'background-color': category.color};

  }
  vm.setColor = function (color) {
      return { 'background-color': color }
  }

  loadAll();
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