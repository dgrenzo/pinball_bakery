"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameElement_1 = require("./GameElement");
var Pinball = (function (_super) {
    __extends(Pinball, _super);
    function Pinball(world, table, x, y) {
        var _this = _super.call(this, world.createBody({ type: "dynamic", bullet: true, linearDamping: 0.05 })) || this;
        _this.world = world;
        _this.addCircle(0.5, { density: 1, restitution: 0.65 });
        _this.setPosition(x, y);
        return _this;
    }
    return Pinball;
}(GameElement_1.default));
exports.default = Pinball;
