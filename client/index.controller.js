import angular from 'angular';
import config from '../config';
import * as _ from 'lodash';

angular
  .module('diaryApp', [])
  .controller('diaryController', ['$http', function($http) {

  const vm = this;
  const api = config.host;
  const modal = angular.element(document.querySelector("#myModal"));
  vm.records = [];
  vm.categories = [];
  vm.newCategory =  {};
  vm.newCategory.color = '#f6b73c';
  vm.openModal = openModal;
  vm.closeModal = closeModal;
  vm.createRecord = createRecord;
  vm.searchString = '';
  vm.loadAll = loadAll;

  loadAll();

  function loadAll() {
    $http.get(api + '/diary').then(function(response) {
      vm.records = response.data;
      getAllCategories();
    });    
  }

  function getAllCategories () {
    $http.get(api + '/categories').then(function(response) {
      vm.categories = response.data.reverse();
      vm.listOfCategories = angular.copy(response.data);
    }); 
  }

  vm.setColor = function (color) {
      return { 'background-color': color }
  }

  vm.sendRecord = function () {
    if(vm.record.id){
      $http.put(api + '/diary/' + vm.record.id, vm.record).then(function() {
        vm.closeModal();
        loadAll();
      });
    } else {
      $http.post(api + '/diary', vm.record).then(function() {
        vm.closeModal();
        loadAll();
      });
    }
  }

  function createRecord  () {
    vm.record = {};
    vm.record.categories = [];
    openModal();
    vm.record.date = new Date();
    getAllCategories();
  }

  vm.updateRecord = function (record) {
    vm.record = record;
    vm.record.date = new Date();
    openModal();

    $http.get(api + '/categories').then(function(response) {
      vm.listOfCategories = response.data;
      vm.listOfCategories = _.xorBy(vm.listOfCategories,vm.record.categories, 'id');
    }); 
  }

  vm.deleteRecord = function (record) {
    $http.delete(api + '/diary/' + record.id).then(function(response) {
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
        return elem.categories.some((cat) => {
          return cat.id === searchCategory.id;
        })
      })
    });
  }

  vm.addCategory = function (category) {
    vm.record.categories.push(category);
    let index = vm.listOfCategories.indexOf(category);
    vm.listOfCategories.splice(index,1);
  }

  vm.removeCategory = function (category) {
    console.log(category,vm.record.categories);
    let index = vm.record.categories.indexOf(category);
    vm.record.categories.splice(index,1);
    vm.listOfCategories.push(category);
  }

  function openModal () {
    modal[0].style.display = "block";
  }

  function closeModal  () {
    modal[0].style.display = "none";
  }

  vm.addItemToListCategories = function () {

    if(vm.newCategory.name.length < 1)
      return;

    $http.post(api + '/categories', vm.newCategory).then(function() {
      vm.newCategory = {};
      vm.newCategory.color = '#f6b73c';
      getAllCategories();
    });
  }

  vm.removeItemFromListCategories = function (category) {
    $http.delete(api + '/categories/' + category.id).then(function() {
      getAllCategories();
    });
  }

}]);