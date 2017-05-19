"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var banner_component_1 = require("./banner.component");
describe('BannerComponent (templateUrl)', function () {
    var comp;
    var fixture;
    var de;
    var el;
    // async beforeEach
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [banner_component_1.BannerComponent],
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(banner_component_1.BannerComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        el = de.nativeElement;
    });
    it('no title in the DOM until manually call `detectChanges`', function () {
        expect(el.textContent).toEqual('');
    });
    it('should display original title', function () {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });
    it('should display a different test title', function () {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });
});
//# sourceMappingURL=banner.component.spec.js.map