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
  vm.openModal = openModal;
  vm.closeModal = closeModal;
  vm.addRecord = addRecord;
  vm.searchString = '';
  loadAll();

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

  vm.setSelectedColor = function (thisCategory){

    let category =  vm.categories.find((category) => {
      if(category.name.toLowerCase() === thisCategory.toLowerCase())
        return category;
    }) || 'white';

    return { 'background-color': category.color};
  }


  vm.setColor = function (color) {
      return { 'background-color': color }
  }


  vm.sendRecord = function () {
    if(vm.record.id){
      $http.put(api + '/diary/' + vm.record.id, vm.record).then(function(response) {
        console.log(response.data);
        vm.closeModal();
        loadAll();
      });
    } else {
      $http.post(api + '/diary', vm.record).then(function(response) {
        vm.closeModal();
        loadAll();
      });
    }
  }

  function addRecord  () {
    vm.record = {};
    openModal();
    vm.record.date = new Date();
  }

  vm.updateRecord = function (record) {
    vm.record = record;
    vm.record.date = new Date();
    openModal();
  }

  vm.deleteRecord = function (record) {
    $http.delete(api + '/diary/' + record.id).then(function(response) {
    console.log(response.data);
    loadAll();
  });
  }

  vm.search  = function () {

    if(vm.searchString.length < 1) {
      loadAll();
      return;
    }

  $http.get(api + '/diary').then(function(response) {
    vm.records = response.data.filter((elem) => {
      if(elem.title.includes(vm.searchString) || elem.description.includes(vm.searchString))
        return elem;
    })
  });
  }

  vm.filter = function (searchCategory) {
    $http.get(api + '/diary').then(function(response) {
      vm.records = response.data.filter((elem) => {
        if(elem.categories.includes(searchCategory.name))
          return elem;
      })
    });
  }

  function openModal () {
    modal[0].style.display = "block";
  }

  function closeModal  () {
    modal[0].style.display = "none";
  }


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