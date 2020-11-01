"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var PLANCK = require("planck-js");
var _ = require("lodash");
var utils_1 = require("./utils");
var FIXTURE_DEFAULTS = {
    friction: 0,
    restitution: 0.35,
    density: 1,
};
var GameElement = (function () {
    function GameElement(body) {
        var _this = this;
        this.body = body;
        this.sprite = new PIXI.Sprite();
        this.debug = new PIXI.Graphics();
        this.update = function () {
            var pos = _this.body.getPosition();
            _this.sprite.position.set(pos.x * utils_1.WORLD_SCALE, pos.y * utils_1.WORLD_SCALE);
            _this.sprite.rotation = _this.body.getAngle();
        };
        this.setPosition = function (x, y) {
            _this.body.setPosition(PLANCK.Vec2(x, y));
            _this.update();
        };
        this.setAngle = function (angle) {
            _this.body.setAngle(angle);
        };
        this.addBox = function (width, height, props) {
            props = _.defaults(props, FIXTURE_DEFAULTS);
            var fixture = _this.body.createFixture(PLANCK.Box(width / 2, height / 2), props);
            _this.debug
                .beginFill(0xFFFFFF, 0.15)
                .lineStyle(1, 0xFFFFFF, 1)
                .drawRect(width * utils_1.WORLD_SCALE * -0.5, height * utils_1.WORLD_SCALE * -0.5, width * utils_1.WORLD_SCALE, height * utils_1.WORLD_SCALE);
        };
        this.addPolygon = function (points, props) {
            props = _.defaults(props, FIXTURE_DEFAULTS);
            var fixture = _this.body.createFixture(PLANCK.Polygon(points), FIXTURE_DEFAULTS);
            _this.debug
                .beginFill(0xFFFFFF, 0.15)
                .lineStyle(1, 0xFFFFFF, 1)
                .moveTo(points[0].x * utils_1.WORLD_SCALE, points[0].y * utils_1.WORLD_SCALE);
            for (var i = 1; i < points.length; i++) {
                _this.debug.lineTo(points[i].x * utils_1.WORLD_SCALE, points[i].y * utils_1.WORLD_SCALE);
            }
            _this.debug.lineTo(points[0].x * utils_1.WORLD_SCALE, points[0].y * utils_1.WORLD_SCALE).endFill();
        };
        this.addCircle = function (radius, props, position) {
            props = _.defaults(props, FIXTURE_DEFAULTS);
            position = _.defaults(position, { x: 0, y: 0 });
            var fixture = _this.body.createFixture(PLANCK.Circle(position, radius), props);
            _this.debug
                .beginFill(0xFFFFFF, 0.15)
                .lineStyle(1, 0xFFFFFF, 1)
                .drawCircle(position.x * utils_1.WORLD_SCALE, position.y * utils_1.WORLD_SCALE, radius * utils_1.WORLD_SCALE);
        };
        this.sprite.addChild(this.debug);
    }
    return GameElement;
}());
exports.default = GameElement;
