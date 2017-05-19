"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var about_component_1 = require("./about.component");
var highlight_directive_1 = require("./shared/highlight.directive");
var fixture;
describe('AboutComponent (highlightDirective)', function () {
    beforeEach(function () {
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [about_component_1.AboutComponent, highlight_directive_1.HighlightDirective],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .createComponent(about_component_1.AboutComponent);
        fixture.detectChanges(); // initial binding
    });
    it('should have skyblue <h2>', function () {
        var de = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        var bgColor = de.nativeElement.style.backgroundColor;
        expect(bgColor).toBe('skyblue');
    });
});
//# sourceMappingURL=about.component.spec.js.map