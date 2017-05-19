"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hero = (function () {
    function Hero(id, name) {
        if (id === void 0) { id = 0; }
        if (name === void 0) { name = ''; }
        this.id = id;
        this.name = name;
    }
    Hero.prototype.clone = function () { return new Hero(this.id, this.name); };
    return Hero;
}());
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map