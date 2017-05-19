"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// re-export for tester convenience
var hero_1 = require("../hero");
exports.Hero = hero_1.Hero;
var hero_service_1 = require("../hero.service");
exports.HeroService = hero_service_1.HeroService;
var hero_2 = require("../hero");
exports.HEROES = [
    new hero_2.Hero(41, 'Bob'),
    new hero_2.Hero(42, 'Carol'),
    new hero_2.Hero(43, 'Ted'),
    new hero_2.Hero(44, 'Alice'),
    new hero_2.Hero(45, 'Speedy'),
    new hero_2.Hero(46, 'Stealthy')
];
var FakeHeroService = (function () {
    function FakeHeroService() {
        this.heroes = exports.HEROES.map(function (h) { return h.clone(); });
    }
    FakeHeroService.prototype.getHero = function (id) {
        if (typeof id === 'string') {
            id = parseInt(id, 10);
        }
        var hero = this.heroes.find(function (h) { return h.id === id; });
        return this.lastPromise = Promise.resolve(hero);
    };
    FakeHeroService.prototype.getHeroes = function () {
        return this.lastPromise = Promise.resolve(this.heroes);
    };
    FakeHeroService.prototype.updateHero = function (hero) {
        return this.lastPromise = this.getHero(hero.id).then(function (h) {
            return h ?
                Object.assign(h, hero) :
                Promise.reject("Hero " + hero.id + " not found");
        });
    };
    return FakeHeroService;
}());
exports.FakeHeroService = FakeHeroService;
//# sourceMappingURL=fake-hero.service.js.map