"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("../../testing");
var testing_3 = require("../model/testing");
var hero_module_1 = require("./hero.module");
var hero_list_component_1 = require("./hero-list.component");
var highlight_directive_1 = require("../shared/highlight.directive");
var model_1 = require("../model");
var comp;
var fixture;
var page;
/////// Tests //////
describe('HeroListComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_2.addMatchers();
        testing_1.TestBed.configureTestingModule({
            imports: [hero_module_1.HeroModule],
            providers: [
                { provide: model_1.HeroService, useClass: testing_3.FakeHeroService },
                { provide: testing_2.Router, useClass: testing_2.RouterStub }
            ]
        })
            .compileComponents()
            .then(createComponent);
    }));
    it('should display heroes', function () {
        expect(page.heroRows.length).toBeGreaterThan(0);
    });
    it('1st hero should match 1st test hero', function () {
        var expectedHero = testing_3.HEROES[0];
        var actualHero = page.heroRows[0].textContent;
        expect(actualHero).toContain(expectedHero.id, 'hero.id');
        expect(actualHero).toContain(expectedHero.name, 'hero.name');
    });
    it('should select hero on click', testing_1.fakeAsync(function () {
        var expectedHero = testing_3.HEROES[1];
        var li = page.heroRows[1];
        li.dispatchEvent(testing_2.newEvent('click'));
        testing_1.tick();
        // `.toEqual` because selectedHero is clone of expectedHero; see FakeHeroService
        expect(comp.selectedHero).toEqual(expectedHero);
    }));
    it('should navigate to selected hero detail on click', testing_1.fakeAsync(function () {
        var expectedHero = testing_3.HEROES[1];
        var li = page.heroRows[1];
        li.dispatchEvent(testing_2.newEvent('click'));
        testing_1.tick();
        // should have navigated
        expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
        // composed hero detail will be URL like 'heroes/42'
        // expect link array with the route path and hero id
        // first argument to router.navigate is link array
        var navArgs = page.navSpy.calls.first().args[0];
        expect(navArgs[0]).toContain('heroes', 'nav to heroes detail URL');
        expect(navArgs[1]).toBe(expectedHero.id, 'expected hero.id');
    }));
    it('should find `HighlightDirective` with `By.directive', function () {
        // Can find DebugElement either by css selector or by directive
        var h2 = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        var directive = fixture.debugElement.query(platform_browser_1.By.directive(highlight_directive_1.HighlightDirective));
        expect(h2).toBe(directive);
    });
    it('should color header with `HighlightDirective`', function () {
        var h2 = page.highlightDe.nativeElement;
        var bgColor = h2.style.backgroundColor;
        // different browsers report color values differently
        var isExpectedColor = bgColor === 'gold' || bgColor === 'rgb(255, 215, 0)';
        expect(isExpectedColor).toBe(true, 'backgroundColor');
    });
    it('the `HighlightDirective` is among the element\'s providers', function () {
        expect(page.highlightDe.providerTokens).toContain(highlight_directive_1.HighlightDirective, 'HighlightDirective');
    });
});
/////////// Helpers /////
/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = testing_1.TestBed.createComponent(hero_list_component_1.HeroListComponent);
    comp = fixture.componentInstance;
    // change detection triggers ngOnInit which gets a hero
    fixture.detectChanges();
    return fixture.whenStable().then(function () {
        // got the heroes and updated component
        // change detection updates the view
        fixture.detectChanges();
        page = new Page();
    });
}
var Page = (function () {
    function Page() {
        this.heroRows = fixture.debugElement.queryAll(platform_browser_1.By.css('li')).map(function (de) { return de.nativeElement; });
        // Find the first element with an attached HighlightDirective
        this.highlightDe = fixture.debugElement.query(platform_browser_1.By.directive(highlight_directive_1.HighlightDirective));
        // Get the component's injected router and spy on it
        var router = fixture.debugElement.injector.get(testing_2.Router);
        this.navSpy = spyOn(router, 'navigate');
    }
    ;
    return Page;
}());
//# sourceMappingURL=hero-list.component.spec.js.map