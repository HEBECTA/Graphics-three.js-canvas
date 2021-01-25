var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
 
import {SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js'

import { TubeGeometry } from 'three/src/geometries/TubeGeometry.js'
import { GUI } from './dat.gui.module.js';
import { Mesh } from 'three';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, true);

var controls = new OrbitControls(camera, renderer.domElement)
var axesHelper = new THREE.AxesHelper( 20 );

camera.position.z = 15;
scene.add(axesHelper);

var texture = new THREE.TextureLoader().load('chess.png');
texture.wrapS = THREE.RepeatWrapping;
//texture.wrapS = THREE.RepeatWrapping;
//texture.wrapT = THREE.RepeatWrapping;

var red = new THREE.MeshBasicMaterial({color:0xff0000});
var green = new THREE.MeshBasicMaterial({color:0x00ff00});
var blue = new THREE.MeshBasicMaterial({color:0x0000ff});
var wireframe = new THREE.MeshBasicMaterial({wireframe: true, color:0x00ff00, side: THREE.DoubleSide});
var textureMat = new THREE.MeshBasicMaterial({map: texture, color: 0xffffff, side: THREE.DoubleSide});
var mat = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.2});

//(1 − v)R1 + vR2
function UV(point){

    var u = (Math.atan2(point.z, point.x));

    if ( u < 0 ){

        u = -u;
    }

    else{

        u = (Math.PI*2) - u;
    }

    var v = (point.y/15)+0.5;

    var answ = [u/(Math.PI*2), v]

    return answ;
}

var points = [];
var uv = [];

var h = 15;
var R1 = 10;
var R2 = 5;


var m = ((R1-R2)*(R1-R2))/(h*h);
var d = ((h/2)*(R1+R2))/(R1-R2);


for (var i = 0; i < 150; ){

    var x = (Math.random() * 30) - 15;
    var y = (Math.random() * 30) - 15;
    var z = (Math.random() * 30) - 15;

    if ( ((x * x) + (z * z) <= m*(y-d)*(y-d)) && (-h/2 <= y && y <= h/2))
    {
        points.push(new THREE.Vector3(x, y, z));

        ++i;
    }
}


var coneGeo = new ConvexGeometry(points);
for (var i = 0; i < coneGeo.faces.length; ++i){

    var u1 = UV(coneGeo.vertices[coneGeo.faces[i].a])[0];
    var v1 = UV(coneGeo.vertices[coneGeo.faces[i].a])[1];
    var u2 = UV(coneGeo.vertices[coneGeo.faces[i].b])[0];
    var v2 = UV(coneGeo.vertices[coneGeo.faces[i].b])[1];
    var u3 = UV(coneGeo.vertices[coneGeo.faces[i].c])[0];
    var v3 = UV(coneGeo.vertices[coneGeo.faces[i].c])[1];

    var rightSide = 0.6;
    var leftSide = 0.3;

    
    if ( u1 > rightSide && u2 < leftSide && u3 < leftSide)
        u1 = u1 - 1;

    else if ( u2 > rightSide && u1 < leftSide && u3 < leftSide)
        u2 = u2 - 1;

    else if ( u3 > rightSide && u1 < leftSide && u2 < leftSide)
        u3 = u3 - 1;


    if ( u1 < leftSide && u2 > rightSide && u3 > rightSide)
        u1 = u1 + 1;

    else if ( u2 < leftSide && u1 > rightSide && u3 > rightSide)
        u2 = u2 + 1;

    else if ( u3 < leftSide && u2 > rightSide && u1 > rightSide)
        u3 = u3 + 1;


    uv.push( [new THREE.Vector2( u1, v1),
        new THREE.Vector2( u2, v2),
        new THREE.Vector2( u3, v3)]);

    coneGeo.faceVertexUvs[0].push(uv[i]);
}


//var mat = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.2});
var cone = SceneUtils.createMultiMaterialObject(coneGeo, [textureMat, wireframe]);
//var cone = new THREE.Mesh(coneGeo, textureMat);
scene.add(cone);

var spGroup = new THREE.Object3D();
for (var i = 0; i < coneGeo.vertices.length; ++i) {

    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, green);
    spMesh.position.set(coneGeo.vertices[i].x, coneGeo.vertices[i].y, coneGeo.vertices[i].z);
    spGroup.add(spMesh);
};
scene.add(spGroup);


// logic
var update = function(){
   

 };
 // draw
var render = function(){
    
    renderer.render(scene, camera);
};

 // run loop: update, render, repeat
 var actionLoop = function(){
     requestAnimationFrame( actionLoop );
     update();
     render();
 };

 // start "looping"
 actionLoop();
          
