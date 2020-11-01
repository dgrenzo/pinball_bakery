import GameElement from "./GameElement";
import * as PIXI from "pixi.js";
import * as PLANCK from 'planck-js';
import * as _ from 'lodash';
import PinballTable from "./PinballTable";


export default class Pinball extends GameElement {

  constructor (private world : PLANCK.World, table : PinballTable, x, y) {
    super (world.createBody({type : "dynamic", bullet : true, linearDamping : 0.05}));
    this.addCircle(0.5, {density : 1, restitution : 0.65});
    this.setPosition(x, y);

  }

}