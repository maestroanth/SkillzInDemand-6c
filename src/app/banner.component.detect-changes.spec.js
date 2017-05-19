"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/core/testing");
var testing_3 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var banner_component_1 = require("./banner.component");
describe('BannerComponent (AutoChangeDetect)', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(testing_1.async(function () {
        testing_3.TestBed.configureTestingModule({
            declarations: [banner_component_1.BannerComponent],
            providers: [
                { provide: testing_2.ComponentFixtureAutoDetect, useValue: true }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_3.TestBed.createComponent(banner_component_1.BannerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        el = de.nativeElement;
    });
    it('should display original title', function () {
        // Hooray! No `fixture.detectChanges()` needed
        expect(el.textContent).toContain(comp.title);
    });
    it('should still see original title after comp.title change', function () {
        var oldTitle = comp.title;
        comp.title = 'Test Title';
        // Displayed title is old because Angular didn't hear the change :(
        expect(el.textContent).toContain(oldTitle);
    });
    it('should display updated title after detectChanges', function () {
        comp.title = 'Test Title';
        fixture.detectChanges(); // detect changes explicitly
        expect(el.textContent).toContain(comp.title);
    });
});
//# sourceMappingURL=banner.component.detect-changes.spec.js.map