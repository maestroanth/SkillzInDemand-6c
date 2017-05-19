"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var model_1 = require("./model");
var welcome_component_1 = require("./welcome.component");
describe('WelcomeComponent', function () {
    var comp;
    var fixture;
    var componentUserService; // the actually injected service
    var userService; // the TestBed injected service
    var de; // the DebugElement with the welcome message
    var el; // the DOM element with the welcome message
    var userServiceStub;
    beforeEach(function () {
        // stub UserService for test purposes
        userServiceStub = {
            isLoggedIn: true,
            user: { name: 'Test User' }
        };
        testing_1.TestBed.configureTestingModule({
            declarations: [welcome_component_1.WelcomeComponent],
            // providers:    [ UserService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{ provide: model_1.UserService, useValue: userServiceStub }]
        });
        fixture = testing_1.TestBed.createComponent(welcome_component_1.WelcomeComponent);
        comp = fixture.componentInstance;
        // UserService actually injected into the component
        userService = fixture.debugElement.injector.get(model_1.UserService);
        componentUserService = userService;
        // UserService from the root injector
        userService = testing_1.TestBed.get(model_1.UserService);
        //  get the "welcome" element by CSS selector (e.g., by class name)
        de = fixture.debugElement.query(platform_browser_1.By.css('.welcome'));
        el = de.nativeElement;
    });
    it('should welcome the user', function () {
        fixture.detectChanges();
        var content = el.textContent;
        expect(content).toContain('Welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');
    });
    it('should welcome "Bubba"', function () {
        userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
        fixture.detectChanges();
        expect(el.textContent).toContain('Bubba');
    });
    it('should request login if not logged in', function () {
        userService.isLoggedIn = false; // welcome message hasn't been shown yet
        fixture.detectChanges();
        var content = el.textContent;
        expect(content).not.toContain('Welcome', 'not welcomed');
        expect(content).toMatch(/log in/i, '"log in"');
    });
    it('should inject the component\'s UserService instance', testing_1.inject([model_1.UserService], function (service) {
        expect(service).toBe(componentUserService);
    }));
    it('TestBed and Component UserService should be the same', function () {
        expect(userService === componentUserService).toBe(true);
    });
    it('stub object and injected UserService should not be the same', function () {
        expect(userServiceStub === userService).toBe(false);
        // Changing the stub object has no effect on the injected service
        userServiceStub.isLoggedIn = false;
        expect(userService.isLoggedIn).toBe(true);
    });
});
//# sourceMappingURL=welcome.component.spec.js.map