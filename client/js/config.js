'use strict';

var app = angular.module('officeApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.
        when('/', {
            templateUrl: '/views/officesupplies.html',
            controller: 'OfficeSupplies'
        }).
        when('/new', {
            templateUrl: '/views/addofficesupply.html',
            controller: 'AddOfficeSupply'
        }).
        when('/:id/edit', {
            templateUrl: '/views/editofficesupply.html',
            controller: 'EditOfficeSupply'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
