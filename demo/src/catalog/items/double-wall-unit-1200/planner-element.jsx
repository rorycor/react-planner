import {BoxHelper, Box3, ObjectLoader} from 'three';
import {loadObjWithMaterial} from '../../utils/load-obj';
import path from 'path';
import convert from 'convert-units';

import React from 'react';

import {hinges, textOffsetBD, xOffset1, xOffset2, doorOffset1, doorOffset2, kickboardOffset, textOffset1, textOffset2} from '../../utils/obj-exports';
import {sceneValues, dwu1200GableArrays} from '../../utils/mtl-exports';

let globalTexture;
let worktopTexture;
let dwu1200GableLeftValue;
let dwu1200GableRightValue;
let pelmetValue;
let corniceValue;
let hingeNumber;

const mtl = require('./double-wall-unit-1200.mtl');
const obj = require('./double-wall-unit-1200.obj');
const img1 = require('../../textures/white.jpg');
const img2 = require('../../textures/beech.jpg');
const img3 = require('../../textures/ivory.jpg');
const img4 = require('../../textures/light-oak.jpg');
const img5 = require('../../textures/lissa-oak.jpg');
const img6 = require('../../textures/maple.jpg');
const img7 = require('../../textures/medium-walnut.jpg');
const img8 = require('../../textures/natural-oak.jpg');
const img9 = require('../../textures/pippy-oak.jpg');
const img10 = require('../../textures/cream.jpg');
const img11 = require('../../textures/metal.jpg');

const width = {length: 1200, unit: 'mm'};
const depth = {length: 300, unit: 'mm'};
const height = {length: 720, unit: 'mm'};

let cachedJSONDoubleWallUnit1200 = null;

export default {
  name: 'Double Wall Unit 1200',
  prototype: 'items',

  info: {
    title: 'DWU 1200',
    tag: ['double', 'wall'],
    description: 'Double Wall Unit 1200',
    image: require('../../images/DWU-1200.png')
  },

  properties: {
    width: {
      label: 'width',
      type: 'hidden',
      defaultValue: {
        length: 1200,
        unit: 'mm'
      }
    },
    depth: {
      label: 'depth',
      type: 'hidden',
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    height: {
      label: 'height',
      type: 'hidden',
      defaultValue: {
        length: 720,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'altitude',
      type: 'hidden',
      defaultValue: {
        length: 1400,
        unit: 'mm'
      }
    },
    patternColor: {
      label: '2D color',
      type: 'color',
      defaultValue: '#FEF9E7'
    },
	  gableLeft: {
		  label: 'Gabel Left',
		  type: 'checkbox',
		  defaultValue: false,
		  checked: true
	  },
	  gableRight: {
		  label: 'Gable Right',
		  type: 'checkbox',
		  defaultValue: false,
		  checked: true
    },
    hingeSide: {
      label: 'Hinge Side',
      type: 'enum',
      defaultValue: hinges[0],
      values: hinges
    },
    pelmet: {
      label: 'Pelmet',
      type: 'checkbox',
      defaultValue: true,
      checked: false
    },
    cornice: {
      label: 'Cornice',
      type: 'checkbox',
      defaultValue: true,
      checked: false
    },
    comment: {
      label: 'Comment',
      type: 'string',
      defaultValue: ''
    },
    numberOfHandles: {
      label: 'Number of Handles',
      type: 'hidden',
      defaultValue: 2
    }
  },

  render2D: function (element, layer, scene) {

    globalTexture = scene.globalTexture;
    worktopTexture = scene.worktopTexture;
    sceneValues(globalTexture, worktopTexture);

    dwu1200GableLeftValue = element.properties.get('gableLeft');
    dwu1200GableRightValue = element.properties.get('gableRight');
    dwu1200GableArrays(dwu1200GableLeftValue, dwu1200GableRightValue);

    pelmetValue = element.properties.get('pelmet');
    corniceValue = element.properties.get('cornice');

    hingeNumber = element.properties.get('hingeSide');

    let newWidth = element.properties.getIn(['width', 'length']) * 0.1;
    let newDepth = element.properties.getIn(['depth', 'length']) * 0.1;
    let fillValue = element.selected ? '#99c3fb' : element.properties.get('patternColor');
    let angle = element.rotation + 90;

    let textOffsetA = 7.5;
	  let textOffsetC = 5;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;

      textOffsetA = 5;
	    textOffsetC = 7.5;
    }

    let doorInvert1 = 0;
    
    if (hingeNumber == 1) {

      doorInvert1 = doorOffset1;
    }

    let lineStyle = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '1px' };
    let lineStyleB = { stroke: '#000', strokeWidth: '0px' };
    let lineStyleD = { stroke: '#000', strokeWidth: '0px' };
    let pelmetLineStyle = { stroke: '#E74C3C', strokeWidth: '0px' };
    let corniceLineStyle = { stroke: '#E74C3C', strokeWidth: '0px' };
    
    if (true == dwu1200GableLeftValue) {
	    lineStyleB = { stroke: '#000', strokeWidth: '1px' };
    }
    
    if (true == dwu1200GableRightValue) {
	    lineStyleD = { stroke: '#000', strokeWidth: '1px' };
    }
    
    if (true == pelmetValue) {
	    pelmetLineStyle = { stroke: '#E74C3C', strokeWidth: '1px' };
    }

    if (true == corniceValue) {
	    corniceLineStyle = { stroke: '#E74C3C', strokeWidth: '1px' };
    }

    return (
      <g transform={`translate(${-newWidth / 1},${-newDepth / 1}) scale(2,2)`}>
        <rect key='1' x='0' y='0' width={newWidth} height={newDepth}
          style={{ stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '1px', fill: fillValue }} />
        //D Side X
		    <line 
		      x1={newWidth}
		      y1={newDepth / 2 - xOffset1}
		      x2={newWidth - xOffset2}
		      y2={newDepth / 2 + xOffset1}
          style={lineStyleD}
		    />
		    <line 
		      x1={newWidth}
		      y1={newDepth / 2 + xOffset1}
		      x2={newWidth - xOffset2}
		      y2={newDepth / 2 - xOffset1}
          style={lineStyleD}
		    />
		    //B Side X
		    <line 
		      x1={0}
		      y1={newDepth / 2 + xOffset1}
		      x2={0 + xOffset2}
		      y2={newDepth / 2 - xOffset1}
          style={lineStyleB}
		    />
		    <line 
		      x1={0}
		      y1={newDepth / 2 - xOffset1}
		      x2={0 + xOffset2}
		      y2={newDepth / 2 + xOffset1}
          style={lineStyleB}
		    />
        //Door
		    <line
		      x1={0 + doorInvert1}
		      y1={0 - doorInvert1}
		      x2={newWidth / 2 - doorOffset1 + doorInvert1} 
		      y2={0 - doorOffset1 + doorInvert1}
          style={lineStyle}
		    />
		    <line
		      x1={newWidth - doorInvert1}
		      y1={0 - doorInvert1}
		      x2={newWidth / 2 + doorOffset1 - doorInvert1} 
		      y2={0 - doorOffset1 + doorInvert1}
          style={lineStyle}
		    />
        //Pelmet
        <line
		      x1={0}
		      y1={0 + kickboardOffset}
		      x2={newWidth} 
		      y2={0 + kickboardOffset}
          style={pelmetLineStyle}
		    />
        //Cornice
        <line
		      x1={0}
		      y1={0}
		      x2={newWidth} 
		      y2={0}
          style={corniceLineStyle}
		    />
        <text key='2' x='0' y='0'
          transform={`translate(${newWidth / 2}, ${0 + textOffset1}) scale(0.5,-0.5) rotate(${textRotation})`}
          style={{ textAnchor: 'middle', fontSize: '11px' }}>
          {element.name}
        </text>
        <text key='3' x='0' y='0'
          transform={`translate(${newWidth / 2}, ${0 - textOffsetA}) scale(0.5,-0.5) rotate(${textRotation})`}
          style={{ textAnchor: 'middle', fontSize: element.selected ? '11px' : '0px' }}>
          {"A"}
        </text>
		    <text key='4' x='0' y='0'
          transform={`translate(${0 - textOffsetBD}, ${newDepth / 2}) scale(0.5,-0.5) rotate(${textRotation})`}
          style={{ textAnchor: 'middle', fontSize: element.selected ? '11px' : '0px' }}>
          {"B"}
        </text>
		    <text key='5' x='0' y='0'
          transform={`translate(${newWidth / 2}, ${newDepth + textOffsetC}) scale(0.5,-0.5) rotate(${textRotation})`}
          style={{ textAnchor: 'middle', fontSize: element.selected ? '11px' : '0px' }}>
          {"C"}
        </text>
		    <text key='6' x='0' y='0'
          transform={`translate(${newWidth + textOffsetBD}, ${newDepth / 2}) scale(0.5,-0.5) rotate(${textRotation})`}
          style={{ textAnchor: 'middle', fontSize: element.selected ? '11px' : '0px' }}>
          {"D"}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let onLoadItem = (object) => {
      let newWidth = element.properties.getIn(['width', 'length']);
      let newDepth = element.properties.getIn(['depth', 'length']);
      let newHeight = element.properties.getIn(['height', 'length']);
      let newAltitude = element.properties.getIn(['altitude', 'length']) * 2 / 10;

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      let box = new BoxHelper(object, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      box.visible = element.selected;
      object.add(box);

      // Normalize the origin of this item
      let boundingBox = new Box3().setFromObject(object);

      let center = [
        (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
        (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
        (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y += newHeight / 10 + newAltitude - 73;
      object.position.z -= center[2];

      return object;
    };

    if (cachedJSONDoubleWallUnit1200) {
      let loader = new ObjectLoader();
      let object = loader.parse(cachedJSONDoubleWallUnit1200);
      return Promise.resolve(onLoadItem(object));
    }

    return loadObjWithMaterial(mtl, obj, path.dirname(img1) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img2) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img3) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img4) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img5) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img6) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img7) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img8) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img9) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img10) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
	  
	  return loadObjWithMaterial(mtl, obj, path.dirname(img11) + '/')
      .then(object => {
        cachedJSONDoubleWallUnit1200 = object.toJSON();
        let loader = new ObjectLoader();
        return onLoadItem(loader.parse(cachedJSONDoubleWallUnit1200))
      });
  },

  updateRender3D: ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) => {

    let noPerf = () => { selfDestroy(); return selfBuild(); };

    if( differences.indexOf('selected') !== -1 )
    {
      mesh.traverse(( child ) => {
        if ( child instanceof BoxHelper ) {
          child.visible = element.selected;
        }
      });

      return Promise.resolve(mesh);
    }

    if( differences.indexOf('rotation') !== -1 ) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve(mesh);
    }

    return noPerf();
  }
};
