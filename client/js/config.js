'use strict';

var app = angular.module('officeApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: '/views/officesupplies.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
