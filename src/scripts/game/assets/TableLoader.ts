import * as PLANCK from 'planck-js';
import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import PinballTable from './PinballTable';

interface IPolygon {
  vertices : {x : number, y : number}[];
}

interface ITableDef {
  static_elements : IPolygon[];
}

export function LoadTable(path : string, table : PinballTable) : Promise<void> {
  return LoadJSON<ITableDef>("assets/json/" + path)
    .then( (data : ITableDef) => {
      _.forEach(data.static_elements, element => {
        
        let table_element = table.createElement();

        let vertices : PLANCK.Vec2[] = [];
        _.forEach(element.vertices, vertex => {
          vertices.push(PLANCK.Vec2(vertex[0], vertex[1]));
        })

        table_element.addPolygon(vertices);
      })
     });
  
}

export function LoadJSON<JSONType>(path : string) : Promise<JSONType> {
  path = path + "?t=" + Date.now();
  return new Promise<JSONType>((resolve) => {
    new PIXI.Loader()
    .add(path)
    .load( (loader : PIXI.Loader, resources : PIXI.IResourceDictionary) => {
      resolve(resources[path].data as JSONType);
    })
  })
}