/**
 * Created by lukaszolejarczuk on 14/03/15.
 */
'use strict';

angular.module('starter.services')
    .factory('offerService', function ($http, restUrl, accessToken) {
        return {
            getItem: function(id) {
                return $http.get(restUrl + '/offers/' + id + '?access_token=' + accessToken);
            }
        }
    });