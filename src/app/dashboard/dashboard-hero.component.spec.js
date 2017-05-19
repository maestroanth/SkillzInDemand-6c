"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("../../testing"); //imports the custom click function here
var hero_1 = require("../model/hero");
var dashboard_hero_component_1 = require("./dashboard-hero.component");
beforeEach(testing_2.addMatchers);
describe('DashboardHeroComponent when tested directly', function () {
    var component;
    var expectedHero;
    var fixture;
    var heroEl;
    // async beforeEach
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dashboard_hero_component_1.DashboardHeroComponent],
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(dashboard_hero_component_1.DashboardHeroComponent);
        component = fixture.componentInstance;
        heroEl = fixture.debugElement.query(platform_browser_1.By.css('.hero')); // find hero element
        // pretend that it was wired to something that supplied a hero
        expectedHero = new hero_1.Hero(42, 'Test Name');
        component.hero = expectedHero;
        fixture.detectChanges(); // trigger initial data binding
    });
    it('should display hero name', function () {
        var expectedPipedName = expectedHero.name.toUpperCase();
        expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
    });
    it('should raise selected event when clicked', function () {
        var selectedHero;
        component.selected.subscribe(function (hero) { return selectedHero = hero; }); //remember to subscribe to events with a callback function
        testing_2.click(heroEl); // triggerEventHandler helper. This is a helper function from testing/index.ts that has to be manually added!
        //heroEl.triggerEventHandler('click', null);
        expect(selectedHero).toBe(expectedHero);
    });
    it('should raise selected event when clicked', function () {
        var selectedHero;
        component.selected.subscribe(function (hero) { return selectedHero = hero; });
        testing_2.click(heroEl); // triggerEventHandler helper
        expect(selectedHero).toBe(expectedHero);
    });
});
//////////////////
//They do this option instead of testing it with the actual DashboardComponent
//The actual test component is defined below
describe('DashboardHeroComponent when inside a test host', function () {
    var testHost;
    var fixture;
    var heroEl;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dashboard_hero_component_1.DashboardHeroComponent, TestHostComponent],
        }).compileComponents();
    }));
    beforeEach(function () {
        // create TestHostComponent instead of DashboardHeroComponent
        fixture = testing_1.TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        heroEl = fixture.debugElement.query(platform_browser_1.By.css('.hero')); // find hero
        fixture.detectChanges(); // trigger initial data binding
    });
    it('should display hero name', function () {
        var expectedPipedName = testHost.hero.name.toUpperCase();
        expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
    });
    it('should raise selected event when clicked', function () {
        testing_2.click(heroEl);
        // selected hero should be the same data bound hero
        expect(testHost.selectedHero).toBe(testHost.hero);
    });
});
////// Test Host Component //////
//remember it's just a fake component to test the dashboardherocomponent
var core_1 = require("@angular/core");
var TestHostComponent = (function () {
    function TestHostComponent() {
        this.hero = new hero_1.Hero(42, 'Test Name');
    }
    TestHostComponent.prototype.onSelected = function (hero) { this.selectedHero = hero; };
    return TestHostComponent;
}());
TestHostComponent = __decorate([
    core_1.Component({
        template: "\n    <dashboard-hero  [hero]=\"hero\"  (selected)=\"onSelected($event)\"></dashboard-hero>"
    })
], TestHostComponent);
//# sourceMappingURL=dashboard-hero.component.spec.js.map