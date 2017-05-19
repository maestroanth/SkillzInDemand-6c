"use strict";
var hero_detail_component_1 = require("./hero-detail.component");
var model_1 = require("../model");
var testing_1 = require("../../testing");
//////////  Tests  ////////////////////
describe('HeroDetailComponent - no TestBed', function () {
    var activatedRoute;
    var comp;
    var expectedHero;
    var hds;
    var router;
    beforeEach(function (done) {
        expectedHero = new model_1.Hero(42, 'Bubba');
        activatedRoute = new testing_1.ActivatedRouteStub();
        activatedRoute.testParams = { id: expectedHero.id };
        router = jasmine.createSpyObj('router', ['navigate']);
        hds = jasmine.createSpyObj('HeroDetailService', ['getHero', 'saveHero']);
        hds.getHero.and.returnValue(Promise.resolve(expectedHero));
        hds.saveHero.and.returnValue(Promise.resolve(expectedHero));
        comp = new hero_detail_component_1.HeroDetailComponent(hds, activatedRoute, router);
        comp.ngOnInit();
        // OnInit calls HDS.getHero; wait for it to get the fake hero
        hds.getHero.calls.first().returnValue.then(done);
    });
    it('should expose the hero retrieved from the service', function () {
        expect(comp.hero).toBe(expectedHero);
    });
    it('should navigate when click cancel', function () {
        comp.cancel();
        expect(router.navigate.calls.any()).toBe(true, 'router.navigate called');
    });
    it('should save when click save', function () {
        comp.save();
        expect(hds.saveHero.calls.any()).toBe(true, 'HeroDetailService.save called');
        expect(router.navigate.calls.any()).toBe(false, 'router.navigate not called yet');
    });
    it('should navigate when click save resolves', function (done) {
        comp.save();
        // waits for async save to complete before navigating
        hds.saveHero.calls.first().returnValue
            .then(function () {
            expect(router.navigate.calls.any()).toBe(true, 'router.navigate called');
            done();
        });
    });
});
//# sourceMappingURL=hero-detail.component.no-testbed.spec.js.map