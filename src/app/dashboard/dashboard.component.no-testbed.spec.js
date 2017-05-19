"use strict";
var dashboard_component_1 = require("./dashboard.component");
var model_1 = require("../model");
var testing_1 = require("../../testing");
var testing_2 = require("../model/testing");
var FakeRouter = (function () {
    function FakeRouter() {
    }
    FakeRouter.prototype.navigateByUrl = function (url) { return url; };
    return FakeRouter;
}());
describe('DashboardComponent: w/o Angular TestBed', function () {
    var comp;
    var heroService;
    var router;
    beforeEach(function () {
        testing_1.addMatchers();
        router = new FakeRouter();
        heroService = new testing_2.FakeHeroService();
        comp = new dashboard_component_1.DashboardComponent(router, heroService);
    });
    it('should NOT have heroes before calling OnInit', function () {
        expect(comp.heroes.length).toBe(0, 'should not have heroes before OnInit');
    });
    it('should NOT have heroes immediately after OnInit', function () {
        comp.ngOnInit(); // ngOnInit -> getHeroes
        expect(comp.heroes.length).toBe(0, 'should not have heroes until service promise resolves');
    });
    it('should HAVE heroes after HeroService gets them', function (done) {
        comp.ngOnInit(); // ngOnInit -> getHeroes
        heroService.lastPromise // the one from getHeroes
            .then(function () {
            // throw new Error('deliberate error'); // see it fail gracefully
            expect(comp.heroes.length).toBeGreaterThan(0, 'should have heroes after service promise resolves');
        })
            .then(done, done.fail);
    });
    it('should tell ROUTER to navigate by hero id', function () {
        var hero = new model_1.Hero(42, 'Abbracadabra');
        var spy = spyOn(router, 'navigateByUrl');
        comp.gotoDetail(hero);
        var navArgs = spy.calls.mostRecent().args[0];
        expect(navArgs).toBe('/heroes/42', 'should nav to HeroDetail for Hero 42');
    });
});
//# sourceMappingURL=dashboard.component.no-testbed.spec.js.map