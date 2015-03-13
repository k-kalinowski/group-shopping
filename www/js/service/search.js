'use strict';

angular.module('starter.services')
    .factory('searchService', function ($http) {
        return {
            getItems: function(text) {
                    return $http.post('https://api.natelefon.pl:9901/v2/allegro/offers?access_token=07de65799b3bd1e90f3004e33086f23c',
                    '{"limit":25,"searchString":'+ text + ',"category":165,"sort":"price:desc" }');
                //return $http.post('api/offers?access_token=07de65799b3bd1e90f3004e33086f23c',
                //'{"limit":25,"searchString":'+ text + ',"category":165,"sort":"price:desc" }');
            }
        }
    });