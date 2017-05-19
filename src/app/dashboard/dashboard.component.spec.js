"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("../../testing");
var model_1 = require("../model");
var testing_3 = require("../model/testing");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard.component");
var dashboard_module_1 = require("./dashboard.module");
var RouterStub = (function () {
    function RouterStub() {
    }
    RouterStub.prototype.navigateByUrl = function (url) { return url; };
    return RouterStub;
}());
beforeEach(testing_2.addMatchers);
var comp;
var fixture;
////////  Deep  ////////////////
describe('DashboardComponent (deep)', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [dashboard_module_1.DashboardModule]
        });
    });
    compileAndCreate();
    tests(clickForDeep);
    function clickForDeep() {
        // get first <div class="hero"> DebugElement
        var heroEl = fixture.debugElement.query(platform_browser_1.By.css('.hero'));
        testing_2.click(heroEl);
    }
});
////////  Shallow ////////////////
var core_1 = require("@angular/core");
describe('DashboardComponent (shallow)', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dashboard_component_1.DashboardComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        });
    });
    compileAndCreate();
    tests(clickForShallow);
    function clickForShallow() {
        // get first <dashboard-hero> DebugElement
        var heroEl = fixture.debugElement.query(platform_browser_1.By.css('dashboard-hero'));
        heroEl.triggerEventHandler('selected', comp.heroes[0]);
    }
});
/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: model_1.HeroService, useClass: testing_3.FakeHeroService },
                { provide: router_1.Router, useClass: RouterStub }
            ]
        })
            .compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(dashboard_component_1.DashboardComponent);
            comp = fixture.componentInstance;
        });
    }));
}
/**
 * The (almost) same tests for both.
 * Only change: the way that the first hero is clicked
 */
function tests(heroClick) {
    it('should NOT have heroes before ngOnInit', function () {
        expect(comp.heroes.length).toBe(0, 'should not have heroes before ngOnInit');
    });
    it('should NOT have heroes immediately after ngOnInit', function () {
        fixture.detectChanges(); // runs initial lifecycle hooks
        expect(comp.heroes.length).toBe(0, 'should not have heroes until service promise resolves');
    });
    describe('after get dashboard heroes', function () {
        // Trigger component so it gets heroes and binds to them
        beforeEach(testing_1.async(function () {
            fixture.detectChanges(); // runs ngOnInit -> getHeroes
            fixture.whenStable() // No need for the `lastPromise` hack!
                .then(function () { return fixture.detectChanges(); }); // bind to heroes
        }));
        it('should HAVE heroes', function () {
            expect(comp.heroes.length).toBeGreaterThan(0, 'should have heroes after service promise resolves');
        });
        it('should DISPLAY heroes', function () {
            // Find and examine the displayed heroes
            // Look for them in the DOM by css class
            var heroes = fixture.debugElement.queryAll(platform_browser_1.By.css('dashboard-hero'));
            expect(heroes.length).toBe(4, 'should display 4 heroes');
        });
        it('should tell ROUTER to navigate when hero clicked', testing_1.inject([router_1.Router], function (router) {
            //inject is native to angular, only for tests. Router is injected from THIS testbed, not root injector
            //OPTION 2:
            // UserService actually injected into the component
            //  userService = fixture.debugElement.injector.get(UserService);
            var spy = spyOn(router, 'navigateByUrl');
            heroClick(); // trigger click on first inner <div class="hero">
            // args passed to router.navigateByUrl()
            var navArgs = spy.calls.first().args[0];
            // expecting to navigate to id of the component's first hero
            var id = comp.heroes[0].id;
            expect(navArgs).toBe('/heroes/' + id, 'should nav to HeroDetail for first hero');
        }));
    });
}
//# sourceMappingURL=dashboard.component.spec.js.map