'use strict';

var app = angular.module('officeApp');

app.factory('OfficeSuppliesService', ['$resource', '$location',
    function($resource, $location) {
        var resource = $resource('/service/officesupplies/:id');

        var services = {
            officeSupplies: resource.query(),

            save: function(officeSupply) {
                new resource(officeSupply).$save().then(function(newOfficeSupply) {
                    services.officeSupplies.push(newOfficeSupply);
                    $location.path('/');
                }).catch(function(response) {
                    alert('Error: ' + response.data.error);
                });
            },

            update: function(officeSupply) {
                new resource(officeSupply).$save({
                    id: officeSupply._id
                }).then(function(newOfficeSupply) {
                    services.officeSupplies = _.without(services.officeSupplies, services.findSupplyById(newOfficeSupply._id));
                    services.officeSupplies.push(newOfficeSupply);
                    $location.path('/');
                }).catch(function(response) {
                    alert('Error: ' + response.data.error);
                });
            },

            findSupplyById: function(id) {
                return _.findWhere(services.officeSupplies, {
                    "_id": id
                });
            }
        };

        return services;
    }
]);
