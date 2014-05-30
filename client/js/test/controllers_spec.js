'use strict';

(function() {
    describe('officeApp controllers', function() {
        var OfficeSuppliesService, mockOfficeSupply, scope;
        beforeEach(function() {
            module('officeApp');

            mockOfficeSupply = {
                name: 'cat in a hat'
            };

            OfficeSuppliesService = {
                officeSupplies: ['office supply 1', 'office supply 2'],
                save: jasmine.createSpy(),
                update: jasmine.createSpy(),
                findSupplyById: jasmine.createSpy().andReturn(mockOfficeSupply)
            };
        });

        describe('OfficeSupplies', function() {
            var OfficeSuppliesController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                OfficeSuppliesController = $controller('OfficeSupplies', {
                    $scope: scope,
                    OfficeSuppliesService: OfficeSuppliesService
                });
            }));

            it('$scope gets assigned the office supplies', function() {
                expect(scope.officeSupplies).toBe(OfficeSuppliesService.officeSupplies);
            });
        });

        describe('AddOfficeSupply', function() {
            var AddOfficeSupplyController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                AddOfficeSupplyController = $controller('AddOfficeSupply', {
                    $scope: scope,
                    OfficeSuppliesService: OfficeSuppliesService
                });
            }));

            it('$scope gets assigned the officeSupply default', function() {
                expect(scope.officeSupply).toEqual({});
            });

            it('does not save new office supply when the form is invalid', function() {
                scope.addOfficeSupply = {
                    $valid: false
                };

                scope.save();

                expect(OfficeSuppliesService.save).not.toHaveBeenCalled();
            });

            it('saves new office supply when the form is valid', function() {
                scope.addOfficeSupply = {
                    $valid: true
                };
                scope.officeSupply = mockOfficeSupply;

                scope.save();

                expect(OfficeSuppliesService.save).toHaveBeenCalledWith(mockOfficeSupply);
            });
        });

        describe('EditOfficeSupply', function() {
            var EditOfficeSupplyController, routeParams;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                routeParams = {
                    id: 'theID'
                };

                EditOfficeSupplyController = $controller('EditOfficeSupply', {
                    $scope: scope,
                    $routeParams: routeParams,
                    OfficeSuppliesService: OfficeSuppliesService
                });
            }));

            it('gets office supply by id from routeParams', function() {
                expect(OfficeSuppliesService.findSupplyById).toHaveBeenCalledWith('theID');
                expect(scope.officeSupply.name).toBe('cat in a hat');
            });

            describe('addSupply', function() {
                it('adds empty object to supplies when a list exists', function() {
                    scope.officeSupply.supplies = [{}];

                    scope.addSupply();

                    expect(scope.officeSupply.supplies.length).toBe(2);
                    expect(scope.officeSupply.supplies[1]).toEqual({});
                });

                it('sets supplies to an array of a single empty object when no supplies exist', function() {
                    scope.officeSupply.supplies = null;

                    scope.addSupply();

                    expect(scope.officeSupply.supplies.length).toBe(1);
                    expect(scope.officeSupply.supplies[0]).toEqual({});
                });
            });

            describe('save', function() {
                it('does not save office supply when form is not valid', function() {
                    scope.editOfficeSupply = {
                        $valid: false
                    };

                    scope.save();

                    expect(OfficeSuppliesService.update).not.toHaveBeenCalled();
                });

                describe('when form is valid', function() {
                    beforeEach(function() {
                        scope.officeSupply = _.extend({}, mockOfficeSupply, {
                            supplies: [{}, {}]
                        });
                        scope.editOfficeSupply = {
                            $valid: true
                        };
                    });

                    it('appends supplies information to the officeSupply', function() {
                        affix('#supplyname0').val('name0');
                        affix('#supplyqty0').val('qty0');
                        affix('#supplyname1').val('name1');
                        affix('#supplyqty1').val('qty1');

                        scope.save();

                        expect(OfficeSuppliesService.update).toHaveBeenCalledWith(scope.officeSupply);
                        expect(scope.officeSupply.supplies.length).toBe(2);
                        expect(scope.officeSupply.supplies[0].name).toBe('name0');
                        expect(scope.officeSupply.supplies[0].qty).toBe('qty0');
                        expect(scope.officeSupply.supplies[1].name).toBe('name1');
                        expect(scope.officeSupply.supplies[1].qty).toBe('qty1');
                    });

                    it('does not append supply information when name or quantity is empty', function() {
                        affix('#supplyname0').val('name0');
                        affix('#supplyqty0');
                        affix('#supplyname1');
                        affix('#supplyqty1').val('qty1');

                        scope.save();

                        expect(OfficeSuppliesService.update).toHaveBeenCalledWith(scope.officeSupply);
                        expect(scope.officeSupply.supplies.length).toBe(0);
                    });
                });
            });
        });
    });
})();
