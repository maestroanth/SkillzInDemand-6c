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
var HighlightDirective = (function () {
    function HighlightDirective(el) {
        this.el = el;
        this.defaultColor = 'rgb(211, 211, 211)'; // lightgray
        el.nativeElement.style.customProperty = true;
    }
    HighlightDirective.prototype.ngOnChanges = function () {
        this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
    };
    return HighlightDirective;
}());
__decorate([
    core_1.Input('highlight'),
    __metadata("design:type", String)
], HighlightDirective.prototype, "bgColor", void 0);
HighlightDirective = __decorate([
    core_1.Directive({ selector: '[highlight]' })
    /** Set backgroundColor for the attached element to highlight color
     *  and set the element's customProperty to true */
    ,
    __metadata("design:paramtypes", [core_1.ElementRef])
], HighlightDirective);
exports.HighlightDirective = HighlightDirective;
//# sourceMappingURL=highlight.directive.js.map