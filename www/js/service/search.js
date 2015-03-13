'use strict';

angular.module('starter')
    .factory('searchService', function ($scope, $http) {
        $http.get('data/posts.json').
        success(function (data, status, headers, config) {
            $scope.posts = data;
        }).
        error(function (data, status, headers, config) {
            // log error
        });

    });