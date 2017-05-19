"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var model_1 = require("../model");
var HeroDetailService = (function () {
    function HeroDetailService(heroService) {
        this.heroService = heroService;
    }
    // Returns a clone which caller may modify safely
    HeroDetailService.prototype.getHero = function (id) {
        if (typeof id === 'string') {
            id = parseInt(id, 10);
        }
        return this.heroService.getHero(id).then(function (hero) {
            return hero ? Object.assign({}, hero) : null; // clone or null
        });
    };
    HeroDetailService.prototype.saveHero = function (hero) {
        return this.heroService.updateHero(hero);
    };
    return HeroDetailService;
}());
HeroDetailService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [model_1.HeroService])
], HeroDetailService);
exports.HeroDetailService = HeroDetailService;
//# sourceMappingURL=hero-detail.service.js.map