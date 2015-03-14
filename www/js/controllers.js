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

.controller('OfferCtrl', function($scope, $log, $state, $stateParams, offerService, chartService, $ionicPopup, $timeout) {

        var vm = this;
        vm.counter = 9;
        vm.discounts = chartService.values;
        chartService.chart(vm.counter);

        var promise = offerService.getItem($state.params.id);

        promise.then(function(result){
            vm.item = result.data;
            chartService.init(vm.item.prices.buyNow);
        }, function(error){
            $log.error('failure loading items', error);
        });



        vm.getName = function(){
            return window.plugins.socialsharing.shareViaTwitter("Kup za mniej - " + vm.item.name  + " #allegro" + vm.item.id, vm.item.mainImage.small, 'http://allegro.pl/aukcja/123424154');
        };

        vm.buy = function(){
            chartService.chart(++vm.counter);
            $timeout(function() {
                vm.showAlert();
            }, 2000);
        };



        vm.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Gratulacje! Kupiłeś za mniej!',
                template: 'Ostateczna cena będzie znana po zakończeniu aukcji. Jeśli chcesz uzyskać lepszą cenę, podziel się aukcją z innymi!',
                buttons: [
                    {
                        text: '<b>OK</b>',
                        type: 'button-stable'
                    }
                ]
            });
        };
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
   
        $scope.random = function(){
            return Math.floor(Math.random() * 10);
        }
})
    .controller("TwitterController", function($scope,$resource, $ionicPlatform, twitterService){
        var vm = this;
        vm.correctTimestring = function(string) {
            return new Date(Date.parse(string));
        };
        // 2
        vm.showHomeTimeline = function() {
            vm.home_timeline = twitterService.getHomeTimeline();
        };
        // 3
        vm.doRefresh = function() {
            vm.showHomeTimeline();
            vm.$broadcast('scroll.refreshComplete');
        };
        // 4
        $ionicPlatform.ready(function() {
            if (twitterService.isAuthenticated()) {
                vm.showHomeTimeline();
            } else {
                twitterService.initialize().then(function(result) {
                    if(result === true) {
                        vm.showHomeTimeline();
                    }
                });
            }
        });
    });
