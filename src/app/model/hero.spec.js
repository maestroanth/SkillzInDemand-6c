"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hero_1 = require("./hero");
describe('Hero', function () {
    it('has name', function () {
        var hero = new hero_1.Hero(1, 'Super Cat');
        expect(hero.name).toBe('Super Cat');
    });
    it('has id', function () {
        var hero = new hero_1.Hero(1, 'Super Cat');
        expect(hero.id).toBe(1);
    });
    it('can clone itself', function () {
        var hero = new hero_1.Hero(1, 'Super Cat');
        var clone = hero.clone();
        expect(hero).toEqual(clone);
    });
});
//# sourceMappingURL=hero.spec.js.map