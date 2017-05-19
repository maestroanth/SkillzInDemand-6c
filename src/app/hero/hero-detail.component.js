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
/* tslint:disable:member-ordering */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var model_1 = require("../model");
var hero_detail_service_1 = require("./hero-detail.service");
var HeroDetailComponent = (function () {
    function HeroDetailComponent(heroDetailService, route, router) {
        this.heroDetailService = heroDetailService;
        this.route = route;
        this.router = router;
    }
    HeroDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get hero when `id` param changes
        this.route.params.subscribe(function (p) { return _this.getHero(p && p['id']); });
    };
    HeroDetailComponent.prototype.getHero = function (id) {
        var _this = this;
        // when no id or id===0, create new hero
        if (!id) {
            this.hero = new model_1.Hero();
            return;
        }
        this.heroDetailService.getHero(id).then(function (hero) {
            if (hero) {
                _this.hero = hero;
            }
            else {
                _this.gotoList(); // id not found; navigate to list
            }
        });
    };
    HeroDetailComponent.prototype.save = function () {
        var _this = this;
        this.heroDetailService.saveHero(this.hero).then(function () { return _this.gotoList(); });
    };
    HeroDetailComponent.prototype.cancel = function () { this.gotoList(); };
    HeroDetailComponent.prototype.gotoList = function () {
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    return HeroDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", model_1.Hero)
], HeroDetailComponent.prototype, "hero", void 0);
HeroDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-hero-detail',
        templateUrl: './hero-detail.component.html',
        styleUrls: ['./hero-detail.component.css'],
        providers: [hero_detail_service_1.HeroDetailService]
    }),
    __metadata("design:paramtypes", [hero_detail_service_1.HeroDetailService,
        router_1.ActivatedRoute,
        router_1.Router])
], HeroDetailComponent);
exports.HeroDetailComponent = HeroDetailComponent;
//# sourceMappingURL=hero-detail.component.js.map