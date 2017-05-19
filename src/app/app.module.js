"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var about_component_1 = require("./about.component");
var banner_component_1 = require("./banner.component");
var model_1 = require("./model");
var twain_service_1 = require("./shared/twain.service");
var welcome_component_1 = require("./welcome.component");
var dashboard_module_1 = require("./dashboard/dashboard.module");
var shared_module_1 = require("./shared/shared.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            dashboard_module_1.DashboardModule,
            app_routing_module_1.AppRoutingModule,
            shared_module_1.SharedModule
        ],
        providers: [model_1.HeroService, twain_service_1.TwainService, model_1.UserService],
        declarations: [app_component_1.AppComponent, about_component_1.AboutComponent, banner_component_1.BannerComponent, welcome_component_1.WelcomeComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map