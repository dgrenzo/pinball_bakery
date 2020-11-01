"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadJSON = exports.LoadTable = void 0;
var PLANCK = require("planck-js");
var PIXI = require("pixi.js");
var _ = require("lodash");
function LoadTable(path, table) {
    return LoadJSON("assets/json/" + path)
        .then(function (data) {
        _.forEach(data.static_elements, function (element) {
            var table_element = table.createElement();
            var vertices = [];
            _.forEach(element.vertices, function (vertex) {
                vertices.push(PLANCK.Vec2(vertex[0], vertex[1]));
            });
            table_element.addPolygon(vertices);
        });
    });
}
exports.LoadTable = LoadTable;
function LoadJSON(path) {
    path = path + "?t=" + Date.now();
    return new Promise(function (resolve) {
        new PIXI.Loader()
            .add(path)
            .load(function (loader, resources) {
            resolve(resources[path].data);
        });
    });
}
exports.LoadJSON = LoadJSON;
