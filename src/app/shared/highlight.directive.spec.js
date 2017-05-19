"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var highlight_directive_1 = require("./highlight.directive");
var testing_2 = require("../../testing");
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        template: "\n  <h2 highlight=\"yellow\">Something Yellow</h2>\n  <h2 highlight>The Default (Gray)</h2>\n  <h2>No Highlight</h2>\n  <input #box [highlight]=\"box.value\" value=\"cyan\"/>"
    })
], TestComponent);
describe('HighlightDirective', function () {
    var fixture;
    var des; // the three elements w/ the directive
    var bareH2; // the <h2> w/o the directive
    beforeEach(function () {
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [highlight_directive_1.HighlightDirective, TestComponent]
        })
            .createComponent(TestComponent);
        fixture.detectChanges(); // initial binding
        // all elements with an attached HighlightDirective
        des = fixture.debugElement.queryAll(platform_browser_1.By.directive(highlight_directive_1.HighlightDirective));
        // the h2 without the HighlightDirective
        bareH2 = fixture.debugElement.query(platform_browser_1.By.css('h2:not([highlight])'));
    });
    // color tests
    it('should have three highlighted elements', function () {
        expect(des.length).toBe(3);
    });
    it('should color 1st <h2> background "yellow"', function () {
        var bgColor = des[0].nativeElement.style.backgroundColor;
        expect(bgColor).toBe('yellow');
    });
    it('should color 2nd <h2> background w/ default color', function () {
        var dir = des[1].injector.get(highlight_directive_1.HighlightDirective);
        var bgColor = des[1].nativeElement.style.backgroundColor;
        expect(bgColor).toBe(dir.defaultColor);
    });
    it('should bind <input> background to value color', function () {
        // easier to work with nativeElement
        var input = des[2].nativeElement;
        expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');
        // dispatch a DOM event so that Angular responds to the input value change.
        input.value = 'green';
        input.dispatchEvent(testing_2.newEvent('input'));
        fixture.detectChanges();
        expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
    });
    it('bare <h2> should not have a customProperty', function () {
        expect(bareH2.properties['customProperty']).toBeUndefined();
    });
    // Removed on 12/02/2016 when ceased public discussion of the `Renderer`. Revive in future?
    // // customProperty tests
    // it('all highlighted elements should have a true customProperty', () => {
    //   const allTrue = des.map(de => !!de.properties['customProperty']).every(v => v === true);
    //   expect(allTrue).toBe(true);
    // });
    // injected directive
    // attached HighlightDirective can be injected
    it('can inject `HighlightDirective` in 1st <h2>', function () {
        var dir = des[0].injector.get(highlight_directive_1.HighlightDirective);
        expect(dir).toBeTruthy();
    });
    it('cannot inject `HighlightDirective` in 3rd <h2>', function () {
        var dir = bareH2.injector.get(highlight_directive_1.HighlightDirective, null);
        expect(dir).toBe(null);
    });
    // DebugElement.providerTokens
    // attached HighlightDirective should be listed in the providerTokens
    it('should have `HighlightDirective` in 1st <h2> providerTokens', function () {
        expect(des[0].providerTokens).toContain(highlight_directive_1.HighlightDirective);
    });
    it('should not have `HighlightDirective` in 3rd <h2> providerTokens', function () {
        expect(bareH2.providerTokens).not.toContain(highlight_directive_1.HighlightDirective);
    });
});
//# sourceMappingURL=highlight.directive.spec.js.map