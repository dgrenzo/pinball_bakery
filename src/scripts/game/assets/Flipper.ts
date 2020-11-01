import * as PIXI from "pixi.js";
import * as PLANCK from 'planck-js';
import * as _ from 'lodash';
import { WORLD_SCALE } from "./utils";
import GameElement from "./GameElement";
import PinballTable from "./PinballTable";

export enum FLIPPER_ORIENTATION {
  LEFT = -1,
  RIGHT = 1,
}

export interface IFlipperConfig {
  orientation : FLIPPER_ORIENTATION,
  x : number,
  y : number,
}

export class Flipper extends GameElement {

  private m_orientation : FLIPPER_ORIENTATION;

  private m_anchor_element : GameElement;

  private m_joint : PLANCK.RevoluteJoint;

  constructor (private world : PLANCK.World, table : PinballTable, config : IFlipperConfig) {
    super (world.createBody({type : "dynamic", bullet : true}));

    this.m_orientation = config.orientation;

    this.addBox(4, 0.5, {density : 4, restitution : 0.15, friction : 0});

    this.m_anchor_element = table.createElement();
    this.m_anchor_element.addCircle(0.25);


    let KEY_CODE = this.m_orientation === FLIPPER_ORIENTATION.LEFT ? 'a' : 'd';

    document.addEventListener("keydown", (evt : KeyboardEvent) => {
      if (evt.key === KEY_CODE) {
        this.m_joint.setMotorSpeed(this.m_orientation * 12.0);
      }
    })
    document.addEventListener("keyup", (evt : KeyboardEvent) => {
      if (evt.key === KEY_CODE) {
        this.m_joint.setMotorSpeed(this.m_orientation * -12.0);
      }
    })

    this.setPosition(config.x, config.y);
  }

  
  public setPosition = (x : number, y : number) => {   
    this.m_anchor_element.setPosition(x, y);
    this.body.setPosition(PLANCK.Vec2(x - (this.m_orientation * 2), y));
    this.updateJoint();

    this.update();
  }

  private updateJoint = () => {
    if (this.m_joint) {
      this.world.destroyJoint(this.m_joint as any);
    }

    let lowerAngle : number, upperAngle : number;
    if (this.m_orientation === FLIPPER_ORIENTATION.RIGHT) {
      lowerAngle = -30 * Math.PI / 180.0;
      upperAngle = 15 * Math.PI / 180.0;
    } else {
      upperAngle = 30 * Math.PI / 180.0;
      lowerAngle = -15 * Math.PI / 180.0;
    }

    this.m_joint = PLANCK.RevoluteJoint(
      {
        enableMotor : true,
        enableLimit : true,
        maxMotorTorque : 25000.0,
        motorSpeed : 0,
        lowerAngle,
        upperAngle,
      } as any,
      this.m_anchor_element.body,
      this.body,
      this.m_anchor_element.body.getPosition()
    )

    this.m_joint.setMotorSpeed(this.m_orientation * -2000.0);
    this.world.createJoint(this.m_joint as any);

  }
}