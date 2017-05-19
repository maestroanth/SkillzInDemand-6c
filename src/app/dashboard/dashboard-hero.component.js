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
var DashboardHeroComponent = (function () {
    function DashboardHeroComponent() {
        this.selected = new core_1.EventEmitter();
    }
    DashboardHeroComponent.prototype.click = function () { this.selected.emit(this.hero); };
    return DashboardHeroComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", model_1.Hero)
], DashboardHeroComponent.prototype, "hero", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DashboardHeroComponent.prototype, "selected", void 0);
DashboardHeroComponent = __decorate([
    core_1.Component({
        selector: 'dashboard-hero',
        templateUrl: './dashboard-hero.component.html',
        styleUrls: ['./dashboard-hero.component.css']
    })
], DashboardHeroComponent);
exports.DashboardHeroComponent = DashboardHeroComponent;
//# sourceMappingURL=dashboard-hero.component.js.map