"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/http/testing");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var http_hero_service_1 = require("./http-hero.service");
var makeHeroData = function () { return [
    { id: 1, name: 'Windstorm' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Magneta' },
    { id: 4, name: 'Tornado' }
]; };
////////  Tests  /////////////
describe('Http-HeroService (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                http_hero_service_1.HttpHeroService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        })
            .compileComponents();
    }));
    it('can instantiate service when inject service', testing_1.inject([http_hero_service_1.HttpHeroService], function (service) {
        expect(service instanceof http_hero_service_1.HttpHeroService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http], function (http) {
        expect(http).not.toBeNull('http should be provided');
        var service = new http_hero_service_1.HttpHeroService(http);
        expect(service instanceof http_hero_service_1.HttpHeroService).toBe(true, 'new service should be ok');
    }));
    it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
        expect(backend).not.toBeNull('backend should be provided');
    }));
    describe('when getHeroes', function () {
        var backend;
        var service;
        var fakeHeroes;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new http_hero_service_1.HttpHeroService(http);
            fakeHeroes = makeHeroData();
            var options = new http_1.ResponseOptions({ status: 200, body: { data: fakeHeroes } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake heroes (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getHeroes().toPromise()
                .then(function (heroes) {
                expect(heroes.length).toBe(fakeHeroes.length, 'should have expected no. of heroes');
            });
        })));
        it('should have expected fake heroes (Observable.do)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getHeroes()
                .do(function (heroes) {
                expect(heroes.length).toBe(fakeHeroes.length, 'should have expected no. of heroes');
            })
                .toPromise();
        })));
        it('should be OK returning no heroes', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { data: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getHeroes()
                .do(function (heroes) {
                expect(heroes.length).toBe(0, 'should have no heroes');
            })
                .toPromise();
        })));
        it('should treat 404 as an Observable error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getHeroes()
                .do(function (heroes) {
                fail('should not respond with heroes');
            })
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Observable_1.Observable.of(null); // failure is the expected test result
            })
                .toPromise();
        })));
    });
});
//# sourceMappingURL=http-hero.service.spec.js.map