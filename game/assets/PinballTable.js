"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameElement_1 = require("./GameElement");
var PLANCK = require("planck-js");
var PIXI = require("pixi.js");
var _ = require("lodash");
var TableLoader_1 = require("./TableLoader");
var Flipper_1 = require("./Flipper");
var PinballTable = (function () {
    function PinballTable(pixi_app) {
        var _this = this;
        this.pixi_app = pixi_app;
        this.sprite = new PIXI.Sprite();
        this.m_ticker = new PIXI.Ticker();
        this.m_entities = [];
        this.init = function () {
            _this.spawnBall();
            _this.addFlipper({
                x: 14,
                y: 25,
                orientation: Flipper_1.FLIPPER_ORIENTATION.LEFT
            });
            _this.addFlipper({
                x: 26,
                y: 25,
                orientation: Flipper_1.FLIPPER_ORIENTATION.RIGHT
            });
            document.addEventListener('keypress', function (evt) {
                if (evt.key === "b") {
                    _this.spawnBall();
                }
            });
        };
        this.update = function (deltaTime) {
            _this.m_phys_world.step(_this.pixi_app.ticker.deltaMS / 1000, 20, 10);
            _.forEach(_this.m_entities, function (ent) {
                ent.update();
            });
        };
        this.spawnBall = function () {
            var ball = _this.createElement({
                type: "dynamic",
                bullet: true,
                linearDamping: 0.01,
            });
            ball.setPosition(25, 0);
            ball.addCircle(0.5, { density: 4, restitution: 0.85 });
        };
        this.addFlipper = function (config) {
            return _this.addElement(new Flipper_1.Flipper(_this.m_phys_world, _this, config));
        };
        this.createElement = function (def) {
            var element = new GameElement_1.default(_this.m_phys_world.createBody(def));
            return _this.addElement(element);
        };
        this.addElement = function (element) {
            _this.sprite.addChild(element.sprite);
            _this.m_entities.push(element);
            return element;
        };
        pixi_app.stage.addChild(this.sprite);
        pixi_app.ticker.add(this.update);
        this.m_phys_world = PLANCK.World({
            gravity: PLANCK.Vec2(0, 30)
        });
    }
    PinballTable.prototype.load = function (path) {
        return TableLoader_1.LoadTable(path, this);
    };
    return PinballTable;
}());
exports.default = PinballTable;
