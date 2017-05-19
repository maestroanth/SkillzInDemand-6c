// For more examples:
//   https://github.com/angular/angular/blob/master/modules/@angular/router/test/integration.spec.ts
"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var testing_3 = require("../testing");
// r - for relatively obscure router symbols
var r = require("@angular/router");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var app_module_1 = require("./app.module");
var app_component_1 = require("./app.component");
var about_component_1 = require("./about.component");
var dashboard_hero_component_1 = require("./dashboard/dashboard-hero.component");
var twain_service_1 = require("./shared/twain.service");
var comp;
var fixture;
var page;
var router;
var location;
describe('AppComponent & RouterTestingModule', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [app_module_1.AppModule, testing_2.RouterTestingModule]
        })
            .compileComponents();
    }));
    it('should navigate to "Dashboard" immediately', testing_1.fakeAsync(function () {
        createComponent();
        expect(location.path()).toEqual('/dashboard', 'after initialNavigation()');
        expectElementOf(dashboard_hero_component_1.DashboardHeroComponent);
    }));
    it('should navigate to "About" on click', testing_1.fakeAsync(function () {
        createComponent();
        testing_3.click(page.aboutLinkDe);
        // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom
        advance();
        expectPathToBe('/about');
        expectElementOf(about_component_1.AboutComponent);
        page.expectEvents([
            [r.NavigationStart, '/about'], [r.RoutesRecognized, '/about'],
            [r.NavigationEnd, '/about']
        ]);
    }));
    it('should navigate to "About" w/ browser location URL change', testing_1.fakeAsync(function () {
        createComponent();
        location.simulateHashChange('/about');
        // location.go('/about'); // also works ... except in plunker
        advance();
        expectPathToBe('/about');
        expectElementOf(about_component_1.AboutComponent);
    }));
    // Can't navigate to lazy loaded modules with this technique
    xit('should navigate to "Heroes" on click', testing_1.fakeAsync(function () {
        createComponent();
        page.heroesLinkDe.nativeElement.click();
        advance();
        expectPathToBe('/heroes');
    }));
});
///////////////
var core_1 = require("@angular/core");
var hero_module_1 = require("./hero/hero.module"); // should be lazy loaded
var hero_list_component_1 = require("./hero/hero-list.component");
var loader;
///////// Can't get lazy loaded Heroes to work yet
xdescribe('AppComponent & Lazy Loading', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [app_module_1.AppModule, testing_2.RouterTestingModule]
        })
            .compileComponents();
    }));
    beforeEach(testing_1.fakeAsync(function () {
        createComponent();
        loader = testing_1.TestBed.get(core_1.NgModuleFactoryLoader);
        loader.stubbedModules = { expected: hero_module_1.HeroModule };
        router.resetConfig([{ path: 'heroes', loadChildren: 'expected' }]);
    }));
    it('dummy', function () { return expect(true).toBe(true); });
    it('should navigate to "Heroes" on click', testing_1.async(function () {
        page.heroesLinkDe.nativeElement.click();
        advance();
        expectPathToBe('/heroes');
        expectElementOf(hero_list_component_1.HeroListComponent);
    }));
    xit('can navigate to "Heroes" w/ browser location URL change', testing_1.fakeAsync(function () {
        location.go('/heroes');
        advance();
        expectPathToBe('/heroes');
        expectElementOf(hero_list_component_1.HeroListComponent);
        page.expectEvents([
            [r.NavigationStart, '/heroes'], [r.RoutesRecognized, '/heroes'],
            [r.NavigationEnd, '/heroes']
        ]);
    }));
});
////// Helpers /////////
/** Wait a tick, then detect changes */
function advance() {
    testing_1.tick();
    fixture.detectChanges();
}
function createComponent() {
    fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
    comp = fixture.componentInstance;
    var injector = fixture.debugElement.injector;
    location = injector.get(common_1.Location);
    router = injector.get(router_1.Router);
    router.initialNavigation();
    spyOn(injector.get(twain_service_1.TwainService), 'getQuote')
        .and.returnValue(Promise.resolve('Test Quote')); // fakes it
    advance();
    page = new Page();
}
var Page = (function () {
    function Page() {
        var _this = this;
        this.recordedEvents = [];
        router.events.subscribe(function (e) { return _this.recordedEvents.push(e); });
        var links = fixture.debugElement.queryAll(platform_browser_1.By.directive(router_1.RouterLinkWithHref));
        this.aboutLinkDe = links[2];
        this.dashboardLinkDe = links[0];
        this.heroesLinkDe = links[1];
        // for debugging
        this.comp = comp;
        this.fixture = fixture;
        this.router = router;
    }
    Page.prototype.expectEvents = function (pairs) {
        var events = this.recordedEvents;
        expect(events.length).toEqual(pairs.length, 'actual/expected events length mismatch');
        for (var i = 0; i < events.length; ++i) {
            expect(events[i].constructor.name).toBe(pairs[i][0].name, 'unexpected event name');
            expect(events[i].url).toBe(pairs[i][1], 'unexpected event url');
        }
    };
    return Page;
}());
function expectPathToBe(path, expectationFailOutput) {
    expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}
function expectElementOf(type) {
    var el = fixture.debugElement.query(platform_browser_1.By.directive(type));
    expect(el).toBeTruthy('expected an element for ' + type.name);
    return el;
}
//# sourceMappingURL=app.component.router.spec.js.map