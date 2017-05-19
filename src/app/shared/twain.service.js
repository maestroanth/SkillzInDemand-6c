"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var quotes = [
    'Always do right. This will gratify some people and astonish the rest.',
    'I have never let my schooling interfere with my education.',
    'Don\'t go around saying the world owes you a living. The world owes you nothing. It was here first.',
    'Whenever you find yourself on the side of the majority, it is time to pause and reflect.',
    'If you tell the truth, you don\'t have to remember anything.',
    'Clothes make the man. Naked people have little or no influence on society.',
    'It\'s not the size of the dog in the fight, it\'s the size of the fight in the dog.',
    'Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn\'t.',
    'The man who does not read good books has no advantage over the man who cannot read them.',
    'Get your facts first, and then you can distort them as much as you please.',
];
var TwainService = (function () {
    function TwainService() {
        this.next = 0;
    }
    // Imaginary todo: get quotes from a remote quote service
    // returns quote after delay simulating server latency
    TwainService.prototype.getQuote = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(_this.nextQuote()); }, 500);
        });
    };
    TwainService.prototype.nextQuote = function () {
        if (this.next === quotes.length) {
            this.next = 0;
        }
        return quotes[this.next++];
    };
    return TwainService;
}());
TwainService = __decorate([
    core_1.Injectable()
], TwainService);
exports.TwainService = TwainService;
//# sourceMappingURL=twain.service.js.map