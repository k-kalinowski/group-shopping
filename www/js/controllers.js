angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('OfferCtrl', function($scope, $log, $state, $stateParams, offerService) {
        var vm = this;

        vm.getName = function(){
            return window.plugins.socialsharing.shareViaTwitter("Kup za mniej - " + vm.item.name  + " #allegro" + vm.item.id, vm.item.mainImage.small, 'http://allegro.pl/aukcja/123424154');
        };

        var promise = offerService.getItem($state.params.id);

        promise.then(function(result){
            vm.item = result.data;
        }, function(error){
            $log.error('failure loading items', error);
        });
})

.controller('SearchController', function($scope, $log, $stateParams, searchService) {
        var vm = this;
        vm.criteria = {
            text:""
        };
        $scope.search = function() {
            var promise = searchService.search(vm.criteria.text);
            promise.then(
                function (result) {
                    vm.items = result.data.offers;
                },
                function (error) {
                    $log.error('failure loading items', error);
                });
        }
    });
