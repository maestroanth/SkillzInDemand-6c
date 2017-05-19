"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var app_component_1 = require("./app.component");
var banner_component_1 = require("./banner.component");
var testing_2 = require("../testing");
var testing_3 = require("../testing");
var WelcomeStubComponent = (function () {
    function WelcomeStubComponent() {
    }
    return WelcomeStubComponent;
}());
WelcomeStubComponent = __decorate([
    core_2.Component({ selector: 'app-welcome', template: '' })
], WelcomeStubComponent);
var comp;
var fixture;
describe('AppComponent & TestModule', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent,
                banner_component_1.BannerComponent, WelcomeStubComponent,
                testing_2.RouterLinkStubDirective, testing_3.RouterOutletStubComponent
            ]
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent, testing_2.RouterLinkStubDirective],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
//////// Testing w/ real root module //////
// Tricky because we are disabling the router and its configuration
// Better to use RouterTestingModule
var app_module_1 = require("./app.module");
var app_routing_module_1 = require("./app-routing.module");
describe('AppComponent & AppModule', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [app_module_1.AppModule]
        })
            .overrideModule(app_module_1.AppModule, {
            remove: {
                imports: [app_routing_module_1.AppRoutingModule]
            },
            add: {
                declarations: [testing_2.RouterLinkStubDirective, testing_3.RouterOutletStubComponent]
            }
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
function tests() {
    var links;
    var linkDes;
    beforeEach(function () {
        // trigger initial data binding
        fixture.detectChanges();
        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(platform_browser_1.By.directive(testing_2.RouterLinkStubDirective));
        // get the attached link directive instances using the DebugElement injectors
        links = linkDes
            .map(function (de) { return de.injector.get(testing_2.RouterLinkStubDirective); });
    });
    it('can instantiate it', function () {
        expect(comp).not.toBeNull();
    });
    it('can get RouterLinks from template', function () {
        expect(links.length).toBe(3, 'should have 3 links');
        expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
        expect(links[1].linkParams).toBe('/heroes', '1st link should go to Heroes');
    });
    it('can click Heroes link in template', function () {
        var heroesLinkDe = linkDes[1];
        var heroesLink = links[1];
        expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');
        heroesLinkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(heroesLink.navigatedTo).toBe('/heroes');
    });
}
//# sourceMappingURL=app.component.spec.js.map