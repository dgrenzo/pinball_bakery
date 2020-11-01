import * as PIXI from "pixi.js";
import { AssetManager } from "./game/assets/AssetManager";
import PinballTable from "./game/assets/PinballTable";

let pixi_app : PIXI.Application = new PIXI.Application({
  forceCanvas : true,
  backgroundColor : 0x222233,
  view : <HTMLCanvasElement>document.getElementById('game_canvas')
});


AssetManager.LoadAssets().then(() => {
  let table = new PinballTable(pixi_app);
  table.load("board_1.json").then(table.init);
});