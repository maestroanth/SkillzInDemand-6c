"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var hero_list_component_1 = require("./hero-list.component");
var hero_detail_component_1 = require("./hero-detail.component");
var routes = [
    { path: '', component: hero_list_component_1.HeroListComponent },
    { path: ':id', component: hero_detail_component_1.HeroDetailComponent }
];
exports.routedComponents = [hero_detail_component_1.HeroDetailComponent, hero_list_component_1.HeroListComponent];
var HeroRoutingModule = (function () {
    function HeroRoutingModule() {
    }
    return HeroRoutingModule;
}());
HeroRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], HeroRoutingModule);
exports.HeroRoutingModule = HeroRoutingModule;
//# sourceMappingURL=hero-routing.module.js.map