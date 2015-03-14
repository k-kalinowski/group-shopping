'use strict';

angular.module('starter.services')
    .factory('searchService', function ($http, restUrl, accessToken) {
        return {
            search: function(text) {
                return $http.post(restUrl + '/offers?access_token=' + accessToken,
                '{"limit":25,"searchString":'+ text + ',"category":165,"sort":"price:desc" }');
            }
        }
    });