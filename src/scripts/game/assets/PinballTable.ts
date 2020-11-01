import GameElement from "./GameElement";
import * as PLANCK from 'planck-js';
import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { LoadTable } from "./TableLoader";
import { Flipper, FLIPPER_ORIENTATION, IFlipperConfig } from "./Flipper";
import Pinball from "./Pinball";

export default class PinballTable {

  public sprite : PIXI.Sprite = new PIXI.Sprite();

  private m_phys_world : planck.World;
  private m_ticker : PIXI.Ticker = new PIXI.Ticker();

  private m_entities : GameElement[] = [];

  private grav_offset = 0;

  constructor (private pixi_app : PIXI.Application) {

    this.sprite.scale.set(1);

    pixi_app.stage.addChild(this.sprite);
    pixi_app.ticker.add(this.update);

    this.m_phys_world = PLANCK.World({
      gravity : PLANCK.Vec2(0, 70)
    });
  }

  public init = () => {

    this.spawnBall();

    this.addFlipper({
      x : 14.25, 
      y : 25, 
      orientation : FLIPPER_ORIENTATION.LEFT 
    });

    this.addFlipper({
      x : 25.75, 
      y : 25, 
      orientation : FLIPPER_ORIENTATION.RIGHT 
    });    

    document.addEventListener('keypress', (evt : KeyboardEvent) => {
      if (evt.key === "b") {
        this.spawnBall();
      }
    })

  }

  public load (path : string) : Promise<void> {
    return LoadTable(path, this);
  }

  private update = (deltaTime : number) => {

    this.m_phys_world.step( this.pixi_app.ticker.deltaMS / 1400 , 20, 10);
    _.forEach(this.m_entities, ent => {
      ent.update();
    })
  }

  private spawnBall = () => {

    let ball = this.addBall(25, 0);
  }

  public addBall = (x : number, y : number) : Pinball => {
    return this.addElement(new Pinball(this.m_phys_world, this, x, y)) as Pinball;
  }

  public addFlipper = (config : IFlipperConfig) : Flipper => {
    return this.addElement(new Flipper(this.m_phys_world, this, config)) as Flipper;
  }

  public createElement = (def ?: PLANCK.BodyDef) : GameElement => {
    let element = new GameElement(this.m_phys_world.createBody(def));
    return this.addElement(element);
  }

  public addElement = (element : GameElement) : GameElement => {
    this.sprite.addChild(element.sprite);
    this.m_entities.push(element);
    return element;

  }

}