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
exports.Flipper = exports.FLIPPER_ORIENTATION = void 0;
var PLANCK = require("planck-js");
var GameElement_1 = require("./GameElement");
var FLIPPER_ORIENTATION;
(function (FLIPPER_ORIENTATION) {
    FLIPPER_ORIENTATION[FLIPPER_ORIENTATION["LEFT"] = -1] = "LEFT";
    FLIPPER_ORIENTATION[FLIPPER_ORIENTATION["RIGHT"] = 1] = "RIGHT";
})(FLIPPER_ORIENTATION = exports.FLIPPER_ORIENTATION || (exports.FLIPPER_ORIENTATION = {}));
var Flipper = (function (_super) {
    __extends(Flipper, _super);
    function Flipper(world, table, config) {
        var _this = _super.call(this, world.createBody({ type: "dynamic", bullet: true })) || this;
        _this.world = world;
        _this.setPosition = function (x, y) {
            _this.m_anchor_element.setPosition(x, y);
            _this.body.setPosition(PLANCK.Vec2(x, y));
            _this.updateJoint();
            _this.update();
        };
        _this.updateJoint = function () {
            if (_this.m_joint) {
                _this.world.destroyJoint(_this.m_joint);
            }
            var lowerAngle, upperAngle;
            if (_this.m_orientation === FLIPPER_ORIENTATION.RIGHT) {
                lowerAngle = -30 * Math.PI / 180.0;
                upperAngle = 15 * Math.PI / 180.0;
            }
            else {
                upperAngle = 30 * Math.PI / 180.0;
                lowerAngle = -15 * Math.PI / 180.0;
            }
            _this.m_joint = PLANCK.RevoluteJoint({
                enableMotor: true,
                enableLimit: true,
                maxMotorTorque: 20000.0,
                motorSpeed: 0,
                lowerAngle: lowerAngle,
                upperAngle: upperAngle,
            }, _this.m_anchor_element.body, _this.body, _this.m_anchor_element.body.getPosition());
            _this.m_joint.setMotorSpeed(_this.m_orientation * -2000.0);
            _this.world.createJoint(_this.m_joint);
        };
        _this.m_orientation = config.orientation;
        var verts = [
            { x: 0, y: -0.5 },
            { x: 0, y: 0.5 },
            { x: -4 * _this.m_orientation, y: 0 },
            { x: -4 * _this.m_orientation, y: -0.5 },
        ];
        var props = { density: 4, restitution: 0.15, friction: 0 };
        _this.addCircle(0.5, props, { x: 0, y: 0 });
        _this.addCircle(0.25, props, { x: -4 * _this.m_orientation, y: -0.25 });
        _this.addPolygon(verts, props);
        _this.m_anchor_element = table.createElement();
        _this.m_anchor_element.addCircle(0.25);
        var KEY_CODE = _this.m_orientation === FLIPPER_ORIENTATION.LEFT ? 'a' : 'd';
        document.addEventListener("keydown", function (evt) {
            if (evt.key === KEY_CODE) {
                _this.m_joint.setMotorSpeed(_this.m_orientation * 16.0);
            }
        });
        document.addEventListener("keyup", function (evt) {
            if (evt.key === KEY_CODE) {
                _this.m_joint.setMotorSpeed(_this.m_orientation * -12.0);
            }
        });
        _this.setPosition(config.x, config.y);
        return _this;
    }
    return Flipper;
}(GameElement_1.default));
exports.Flipper = Flipper;
