'use strict';

var app = angular.module('officeApp');

app.controller('OfficeSupplies', ['$scope', 'OfficeSuppliesService',
    function($scope, OfficeSuppliesService) {
        $scope.officeSupplies = OfficeSuppliesService.officeSupplies;
    }
]);

app.controller('AddOfficeSupply', ['$scope', 'OfficeSuppliesService',
    function($scope, OfficeSuppliesService) {
        $scope.officeSupply = {};

        $scope.save = function() {
            if (this.addOfficeSupply.$valid) {
                OfficeSuppliesService.save(this.officeSupply);
            }
        }
    }
]);

app.controller('EditOfficeSupply', ['$scope', '$routeParams', 'OfficeSuppliesService',
    function($scope, $routeParams, OfficeSuppliesService) {
        $scope.officeSupply = angular.copy(OfficeSuppliesService.findSupplyById($routeParams.id));

        $scope.addSupply = function() {
            this.officeSupply.supplies ? this.officeSupply.supplies.push({}) : this.officeSupply.supplies = [{}];
        };

        $scope.save = function() {
            if (this.editOfficeSupply.$valid) {
                var supplies = [];
                for (var i = 0; i < this.officeSupply.supplies.length; i++) {
                    var supplyName = angular.element('#supplyname' + i).val();
                    var supplyQty = angular.element('#supplyqty' + i).val();
                    if (supplyName != '' && supplyQty != '') {
                        supplies.push({
                            name: supplyName,
                            qty: supplyQty
                        });
                    }
                }
                this.officeSupply.supplies = supplies;
                OfficeSuppliesService.update(this.officeSupply);
            }
        };
    }
]);
