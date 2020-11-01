import * as PIXI from "pixi.js";
import * as PLANCK from 'planck-js';
import * as _ from 'lodash';
import { WORLD_SCALE } from "./utils";

export interface IFixtureProperties {
  friction ?: number,
  restitution ?: number,
  density ?: number,
}

const FIXTURE_DEFAULTS : IFixtureProperties = {
  friction : 0,
  restitution : 0.35,
  density : 1,
}

export default class GameElement {

  public sprite : PIXI.Sprite = new PIXI.Sprite();
  private debug : PIXI.Graphics = new PIXI.Graphics();

  constructor (public body : PLANCK.Body) {

    this.sprite.addChild(this.debug);
  } 

  public update = () => {
    let pos = this.body.getPosition();

    this.sprite.position.set(
      pos.x * WORLD_SCALE,
      pos.y * WORLD_SCALE,
    )
    this.sprite.rotation = this.body.getAngle();
  }

  public setPosition = (x : number, y : number) => {
    this.body.setPosition(PLANCK.Vec2(x, y));
    this.update();
  }

  public setAngle = (angle : number) => {
    this.body.setAngle(angle);
  }

  public addBox = (width : number, height : number, props ?: IFixtureProperties) => {
    props = _.defaults(props, FIXTURE_DEFAULTS);

    let fixture = this.body.createFixture(PLANCK.Box(width /2 , height / 2) as any, props as PLANCK.FixtureOpt);
    this.debug
      .beginFill(0xFFFFFF, 0.15)
      .lineStyle(1, 0xFFFFFF, 1)
      .drawRect(width * WORLD_SCALE * -0.5,  height * WORLD_SCALE * -0.5, width * WORLD_SCALE, height * WORLD_SCALE);
  }

  public addPolygon = (points : PLANCK.Vec2[], props ?: IFixtureProperties) => {
    props = _.defaults(props, FIXTURE_DEFAULTS);

    let fixture = this.body.createFixture(PLANCK.Polygon(points) as any, FIXTURE_DEFAULTS as PLANCK.FixtureOpt);

    this.debug
      .beginFill(0xFFFFFF, 0.15)
      .lineStyle(1, 0xFFFFFF, 1)
      .moveTo(points[0].x * WORLD_SCALE, points[0].y * WORLD_SCALE);

      for (let i = 1; i < points.length; i ++) {
        this.debug.lineTo(points[i].x * WORLD_SCALE, points[i].y * WORLD_SCALE)
      }

      this.debug.lineTo(points[0].x * WORLD_SCALE, points[0].y * WORLD_SCALE).endFill();
  }

  
  public addCircle = (radius : number, props ?: IFixtureProperties, position ?: { x : number, y : number}) => {
    props = _.defaults(props, FIXTURE_DEFAULTS);
    position = _.defaults(position, {x : 0, y : 0});

    let fixture = this.body.createFixture(PLANCK.Circle(position as any, radius) as any, props as PLANCK.FixtureOpt);

    this.debug
      .beginFill(0xFFFFFF, 0.15)
      .lineStyle(1, 0xFFFFFF, 1)
      .drawCircle(position.x * WORLD_SCALE,  position.y * WORLD_SCALE, radius * WORLD_SCALE);
  }
}