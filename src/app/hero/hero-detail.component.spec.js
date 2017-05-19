"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("../../testing");
var model_1 = require("../model");
var hero_detail_component_1 = require("./hero-detail.component");
var hero_detail_service_1 = require("./hero-detail.service");
var hero_module_1 = require("./hero.module");
////// Testing Vars //////
var activatedRoute;
var comp;
var fixture;
var page;
////// Tests //////
describe('HeroDetailComponent', function () {
    beforeEach(function () {
        activatedRoute = new testing_2.ActivatedRouteStub();
    });
    describe('with HeroModule setup', heroModuleSetup);
    describe('when override its provided HeroDetailService', overrideSetup);
    describe('with FormsModule setup', formsModuleSetup);
    describe('with SharedModule setup', sharedModuleSetup);
});
////////////////////
function overrideSetup() {
    var HeroDetailServiceSpy = (function () {
        function HeroDetailServiceSpy() {
            var _this = this;
            this.testHero = new model_1.Hero(42, 'Test Hero');
            this.getHero = jasmine.createSpy('getHero').and.callFake(function () { return Promise
                .resolve(true)
                .then(function () { return Object.assign({}, _this.testHero); }); });
            this.saveHero = jasmine.createSpy('saveHero').and.callFake(function (hero) { return Promise
                .resolve(true)
                .then(function () { return Object.assign(_this.testHero, hero); }); });
        }
        return HeroDetailServiceSpy;
    }());
    // the `id` value is irrelevant because ignored by service stub
    beforeEach(function () { return activatedRoute.testParams = { id: 99999 }; });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [hero_module_1.HeroModule],
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
                // HeroDetailService at this level is IRRELEVANT!
                { provide: hero_detail_service_1.HeroDetailService, useValue: {} }
            ]
        })
            .overrideComponent(hero_detail_component_1.HeroDetailComponent, {
            set: {
                providers: [
                    { provide: hero_detail_service_1.HeroDetailService, useClass: HeroDetailServiceSpy }
                ]
            }
        })
            .compileComponents();
    }));
    var hdsSpy;
    beforeEach(testing_1.async(function () {
        createComponent();
        // get the component's injected HeroDetailServiceSpy
        hdsSpy = fixture.debugElement.injector.get(hero_detail_service_1.HeroDetailService);
    }));
    it('should have called `getHero`', function () {
        expect(hdsSpy.getHero.calls.count()).toBe(1, 'getHero called once');
    });
    it('should display stub hero\'s name', function () {
        expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
    });
    it('should save stub hero change', testing_1.fakeAsync(function () {
        var origName = hdsSpy.testHero.name;
        var newName = 'New Name';
        page.nameInput.value = newName;
        page.nameInput.dispatchEvent(testing_2.newEvent('input')); // tell Angular
        expect(comp.hero.name).toBe(newName, 'component hero has new name');
        expect(hdsSpy.testHero.name).toBe(origName, 'service hero unchanged before save');
        testing_2.click(page.saveBtn);
        expect(hdsSpy.saveHero.calls.count()).toBe(1, 'saveHero called once');
        testing_1.tick(); // wait for async save to complete
        expect(hdsSpy.testHero.name).toBe(newName, 'service hero has new name after save');
        expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    }));
    it('fixture injected service is not the component injected service', testing_1.inject([hero_detail_service_1.HeroDetailService], function (service) {
        expect(service).toEqual({}, 'service injected from fixture');
        expect(hdsSpy).toBeTruthy('service injected into component');
    }));
}
////////////////////
var testing_3 = require("../model/testing");
var model_2 = require("../model");
var firstHero = testing_3.HEROES[0];
function heroModuleSetup() {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [hero_module_1.HeroModule],
            //  declarations: [ HeroDetailComponent ], // NO!  DOUBLE DECLARATION
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: model_2.HeroService, useClass: testing_3.FakeHeroService },
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .compileComponents();
    }));
    describe('when navigate to existing hero', function () {
        var expectedHero;
        beforeEach(testing_1.async(function () {
            expectedHero = firstHero;
            activatedRoute.testParams = { id: expectedHero.id };
            createComponent();
        }));
        it('should display that hero\'s name', function () {
            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
        it('should navigate when click cancel', function () {
            testing_2.click(page.cancelBtn);
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        });
        it('should save when click save but not navigate immediately', function () {
            // Get service injected into component and spy on its`saveHero` method.
            // It delegates to fake `HeroService.updateHero` which delivers a safe test result.
            var hds = fixture.debugElement.injector.get(hero_detail_service_1.HeroDetailService);
            var saveSpy = spyOn(hds, 'saveHero').and.callThrough();
            testing_2.click(page.saveBtn);
            expect(saveSpy.calls.any()).toBe(true, 'HeroDetailService.save called');
            expect(page.navSpy.calls.any()).toBe(false, 'router.navigate not called');
        });
        it('should navigate when click save and save resolves', testing_1.fakeAsync(function () {
            testing_2.click(page.saveBtn);
            testing_1.tick(); // wait for async save to complete
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        }));
        it('should convert hero name to Title Case', function () {
            var inputName = 'quick BROWN  fox';
            var titleCaseName = 'Quick Brown  Fox';
            // simulate user entering new name into the input box
            page.nameInput.value = inputName;
            // dispatch a DOM event so that Angular learns of input value change.
            page.nameInput.dispatchEvent(testing_2.newEvent('input'));
            // Tell Angular to update the output span through the title pipe
            fixture.detectChanges();
            expect(page.nameDisplay.textContent).toBe(titleCaseName);
        });
    });
    describe('when navigate with no hero id', function () {
        beforeEach(testing_1.async(createComponent));
        it('should have hero.id === 0', function () {
            expect(comp.hero.id).toBe(0);
        });
        it('should display empty hero name', function () {
            expect(page.nameDisplay.textContent).toBe('');
        });
    });
    describe('when navigate to non-existant hero id', function () {
        beforeEach(testing_1.async(function () {
            activatedRoute.testParams = { id: 99999 };
            createComponent();
        }));
        it('should try to navigate back to hero list', function () {
            expect(page.gotoSpy.calls.any()).toBe(true, 'comp.gotoList called');
            expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
        });
    });
    // Why we must use `fixture.debugElement.injector` in `Page()`
    it('cannot use `inject` to get component\'s provided HeroDetailService', function () {
        var service;
        fixture = testing_1.TestBed.createComponent(hero_detail_component_1.HeroDetailComponent);
        expect(
        // Throws because `inject` only has access to TestBed's injector
        // which is an ancestor of the component's injector
        testing_1.inject([hero_detail_service_1.HeroDetailService], function (hds) { return service = hds; }))
            .toThrowError(/No provider for HeroDetailService/);
        // get `HeroDetailService` with component's own injector
        service = fixture.debugElement.injector.get(hero_detail_service_1.HeroDetailService);
        expect(service).toBeDefined('debugElement.injector');
    });
}
/////////////////////
var forms_1 = require("@angular/forms");
var title_case_pipe_1 = require("../shared/title-case.pipe");
function formsModuleSetup() {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule],
            declarations: [hero_detail_component_1.HeroDetailComponent, title_case_pipe_1.TitleCasePipe],
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: model_2.HeroService, useClass: testing_3.FakeHeroService },
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .compileComponents();
    }));
    it('should display 1st hero\'s name', testing_1.fakeAsync(function () {
        var expectedHero = firstHero;
        activatedRoute.testParams = { id: expectedHero.id };
        createComponent().then(function () {
            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
    }));
}
///////////////////////
var shared_module_1 = require("../shared/shared.module");
function sharedModuleSetup() {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [shared_module_1.SharedModule],
            declarations: [hero_detail_component_1.HeroDetailComponent],
            providers: [
                { provide: testing_2.ActivatedRoute, useValue: activatedRoute },
                { provide: model_2.HeroService, useClass: testing_3.FakeHeroService },
                { provide: testing_2.Router, useClass: testing_2.RouterStub },
            ]
        })
            .compileComponents();
    }));
    it('should display 1st hero\'s name', testing_1.fakeAsync(function () {
        var expectedHero = firstHero;
        activatedRoute.testParams = { id: expectedHero.id };
        createComponent().then(function () {
            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
    }));
}
/////////// Helpers /////
/** Create the HeroDetailComponent, initialize it, set test variables  */
function createComponent() {
    fixture = testing_1.TestBed.createComponent(hero_detail_component_1.HeroDetailComponent);
    comp = fixture.componentInstance;
    page = new Page();
    // 1st change detection triggers ngOnInit which gets a hero
    fixture.detectChanges();
    return fixture.whenStable().then(function () {
        // 2nd change detection displays the async-fetched hero
        fixture.detectChanges();
        page.addPageElements();
    });
}
var Page = (function () {
    function Page() {
        var router = testing_1.TestBed.get(testing_2.Router); // get router from root injector
        this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
        this.navSpy = spyOn(router, 'navigate');
    }
    /** Add page elements after hero arrives */
    Page.prototype.addPageElements = function () {
        if (comp.hero) {
            // have a hero so these elements are now in the DOM
            var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
            this.saveBtn = buttons[0];
            this.cancelBtn = buttons[1];
            this.nameDisplay = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
            this.nameInput = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        }
    };
    return Page;
}());
//# sourceMappingURL=hero-detail.component.spec.js.map