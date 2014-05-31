'use strict';

(function() {
    describe('officeApp services', function() {
        beforeEach(module('officeApp'));

        describe('OfficeSuppliesService', function() {
            var officeSuppliesService, httpBackend, location, routeParams;

            var mockOfficeSupplies = [{
                _id: 'id1',
                name: 'name 1'
            }, {
                _id: 'id2',
                name: 'name 2'
            }];

            beforeEach(inject(function(OfficeSuppliesService, $httpBackend, $location, $routeParams) {
                officeSuppliesService = OfficeSuppliesService;
                httpBackend = $httpBackend;
                location = $location;
                routeParams = $routeParams;
            }));

            beforeEach(function() {
                httpBackend.whenGET('/service/officesupplies').respond(mockOfficeSupplies);
                httpBackend.flush();
            });

            it('office supplies is assigned to the service when service loads', function() {
                expect(officeSuppliesService.officeSupplies.length).toEqual(mockOfficeSupplies.length);
                expect(officeSuppliesService.officeSupplies[0]._id).toEqual(mockOfficeSupplies[0]._id);
                expect(officeSuppliesService.officeSupplies[1]._id).toEqual(mockOfficeSupplies[1]._id);
            });

            describe('save', function() {
                it('saves the office supply then routes the browser', function() {
                    httpBackend.whenPOST('/service/officesupplies', mockOfficeSupplies[0]).respond(mockOfficeSupplies[0]);

                    officeSuppliesService.save(mockOfficeSupplies[0]);
                    httpBackend.flush();

                    expect(location.path()).toEqual('/');
                });

                it('alerts user when saving the office supply failed', function() {
                    spyOn(window, 'alert');
                    httpBackend.whenPOST('/service/officesupplies', mockOfficeSupplies[0]).respond(500, {
                        error: 'something is wrong'
                    });

                    officeSuppliesService.save(mockOfficeSupplies[0]);
                    httpBackend.flush();

                    expect(window.alert).toHaveBeenCalledWith('Error: something is wrong');
                });
            });

            describe('update', function() {
                it('saves the upated office supply to the backend, updates the list of models, and routes the user', function() {
                    var updatedOfficeSupply = _.extend(mockOfficeSupplies[0], {
                        name: 'testing update'
                    });
                    httpBackend.whenPOST('/service/officesupplies/id1', updatedOfficeSupply).respond(updatedOfficeSupply);

                    officeSuppliesService.update(updatedOfficeSupply);
                    httpBackend.flush();

                    var actualOfficeSupply = _.findWhere(officeSuppliesService.officeSupplies, {
                        _id: updatedOfficeSupply._id
                    });

                    expect(location.path()).toEqual('/');
                    expect(actualOfficeSupply.name).toBe(updatedOfficeSupply.name);
                });

                it('alerts user when updating the office supply failed', function() {
                    spyOn(window, 'alert');
                    httpBackend.whenPOST('/service/officesupplies/id1', mockOfficeSupplies[0]).respond(500, {
                        error: 'something is wrong'
                    });

                    officeSuppliesService.update(mockOfficeSupplies[0]);
                    httpBackend.flush();

                    expect(window.alert).toHaveBeenCalledWith('Error: something is wrong');
                });
            });

            it('findSupplyById finds the proper supply', function() {
                expect(officeSuppliesService.findSupplyById(mockOfficeSupplies[0]._id).name).toBe(mockOfficeSupplies[0].name);
                expect(officeSuppliesService.findSupplyById(mockOfficeSupplies[1]._id).name).toBe(mockOfficeSupplies[1].name);
            });
        });
    });
})();
