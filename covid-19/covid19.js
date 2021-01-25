var THREE = require('three');

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { TubeGeometry } from 'three/src/geometries/TubeGeometry.js'
import { GUI } from './dat.gui.module.js';
//import { StreamCopyUsage } from 'three';

var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', function(){
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, true);

        var controls = new OrbitControls(camera, renderer.domElement);

        var axesHelper = new THREE.AxesHelper( 20 );
        

        camera.position.z = 15;
        scene.add(axesHelper);

        var localPlane = new THREE.Plane( new THREE.Vector3( 0, 0, -1 ), 0 );

        renderer.localClippingEnabled = true;

        var ambientLight = new THREE.AmbientLight(0xffffff, 2);
        //scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xf9f9f9);
        spotLight.position.set(0, 0, -30);
        spotLight.power = 2;
        spotLight.castShadow = true;
        //spotLight.shadowCameraRight     =  5;
        //spotLight.shadowCameraLeft     = -5;
        //spotLight.shadowCameraTop      =  5;
        //spotLight.shadowCameraBottom   = -5;
        //spotLight.shadowDarkness = 0.5;
        scene.add(spotLight);

        var spotLight2 = new THREE.SpotLight(0xf9f9f9);
        spotLight2.position.set(15, -15, -7);
        spotLight2.castShadow = true;
        spotLight2.power = 2;
        //spotLight2.shadowDarkness = 0.5;
        scene.add(spotLight2);

        var spotLight3 = new THREE.SpotLight(0xf9f9f9);
        spotLight3.position.set(-20, 15, 15);
        spotLight3.castShadow = true;
        spotLight3.power = 10;
        //spotLight3.shadowCameraRight     =  5;
        //spotLight3.shadowCameraLeft     = -5;
        //spotLight3.shadowCameraTop      =  5;
        //spotLight3.shadowCameraBottom   = -5;
        //spotLight3.shadowDarkness = 0.5;
        spotLight3.shadowCameraVisible = true;
        scene.add(spotLight3);

        // A P V A L K A L A S

        var envelopeGeo = new THREE.IcosahedronGeometry(10, 1);
        var envelopeMat = new THREE.MeshPhongMaterial({color: 0xFF0000, wireframe: false,
             side: THREE.DoubleSide, clippingPlanes:[localPlane],
             shadowSide: THREE.FrontSide});
        var envelope = new THREE.Mesh(envelopeGeo, envelopeMat);
        var envelopeGeo2 = new THREE.IcosahedronGeometry(9.5, 1);
        var envelope2 = new THREE.Mesh(envelopeGeo2, new THREE.MeshPhongMaterial({color: 0xFF3333, wireframe: false,
            side: THREE.DoubleSide, clippingPlanes:[localPlane],
        shadowSide: THREE.BackSide}));
        envelope.receiveShadow  = true;
        envelope2.receiveShadow  = true;
        scene.add(envelope);
        scene.add(envelope2);

       // S P I K E   G L Y C O P R O T E I N
       var spikeGlycoproteinMaterial = new THREE.MeshPhongMaterial( {color: 0xFF00FF});

       var spikeGlycoproteinGeoBot = new THREE.CylinderGeometry( 1, 0.25, 1.5, 3 );
       var spikeGlycoproteinBot = new THREE.Mesh( spikeGlycoproteinGeoBot, spikeGlycoproteinMaterial );
       spikeGlycoproteinBot.position.y = 0.3;
       spikeGlycoproteinBot.castShadow=true;
       var spikeGlycoproteinGeoTop = new THREE.ConeGeometry( 1, 0.5, 3 );
       var spikeGlycoproteinTop = new THREE.Mesh( spikeGlycoproteinGeoTop, spikeGlycoproteinMaterial );
       spikeGlycoproteinTop.position.y = 1.3;
       spikeGlycoproteinTop.castShadow=true;

       var spikeGlycoprotein = new THREE.Group();
       spikeGlycoprotein.add(spikeGlycoproteinBot);
       spikeGlycoprotein.add(spikeGlycoproteinTop);
       spikeGlycoprotein.scale.multiplyScalar( 1.7 );
       //spikeGlycoprotein.position.y = 10;

       // M - P R O T E I N
       var mProteinMaterial = new THREE.MeshPhongMaterial( {color: 0x008000} );
    
       var mProteinGeoBot = new THREE.TorusGeometry( 0.5, 0.2, 5, 16, Math.PI );
       var mProteinBot = new THREE.Mesh( mProteinGeoBot, mProteinMaterial );
       mProteinBot.rotation.x = Math.PI;
       mProteinBot.castShadow=true;
       mProteinBot.receiveShadow  = true;

       var mProteinGeoTop1 = new THREE.SphereGeometry( 0.4, 12, 4 );
       var mProteinTop1 = new THREE.Mesh( mProteinGeoTop1, mProteinMaterial );
       mProteinTop1.position.y = 0.25;
       mProteinTop1.position.x = 0.5;
       mProteinTop1.castShadow=true;
       mProteinTop1.receiveShadow  = true;
 
       var mProteinGeoTop2 = new THREE.SphereGeometry( 0.4, 12, 4 );
       var mProteinTop2 = new THREE.Mesh( mProteinGeoTop2, mProteinMaterial );
       mProteinTop2.position.y = 0.25;
       mProteinTop2.position.x = -0.5;
       mProteinTop2.castShadow=true;
       mProteinTop2.receiveShadow  = true;

       var mProtein = new THREE.Group();
       mProtein.add(mProteinBot);
       mProtein.add(mProteinTop1);
       mProtein.add(mProteinTop2); 

       // H E M A G G L U T I N I N - E S T E R A S E    D I M E R
       var dimerMaterial = new THREE.MeshPhongMaterial( {color: 0x87CEEB, side: THREE.DoubleSide} );
    
       var dimerGeoBot = new THREE.CylinderGeometry( 0.5, 0.25, 1, 4, 1, true );
       var dimerBot = new THREE.Mesh( dimerGeoBot, dimerMaterial );
       dimerBot.castShadow=true;
       dimerBot.receiveShadow  = true;

       var dimerGeoTop = new THREE.RingGeometry( 0.2, 1, 6 );
       var dimerTop = new THREE.Mesh( dimerGeoTop, dimerMaterial );
       dimerTop.rotation.x = Math.PI/2;
       dimerTop.position.y = 0.5;
       dimerTop.castShadow=true;
       dimerTop.receiveShadow  = true;

       var dimer = new THREE.Group();
       dimer.add(dimerBot);
       dimer.add(dimerTop);
    
       // E - P R O T E I N
       var eProteinMaterial = new THREE.MeshPhongMaterial( {color: 0xFFFF00} );

       var eProteinGeoBot = new THREE.CylinderGeometry( 0.5, 0.25, 1, 5 );
       var eProteinBot = new THREE.Mesh( eProteinGeoBot, eProteinMaterial );
       eProteinBot.castShadow=true;
       eProteinBot.receiveShadow = true;

       var eProteinGeoTop = new THREE.CylinderGeometry( 0.25, 1, 0.5, 5 );
       var eProteinTop = new THREE.Mesh( eProteinGeoTop, eProteinMaterial );
       eProteinTop.position.y = 0.5;
       eProteinTop.castShadow=true;
       eProteinTop.receiveShadow = true;

       var eProtein = new THREE.Group();
       eProtein.add(eProteinBot);
       eProtein.add(eProteinTop);

       // R N A  &  N   P R O T E I N

       function CustomSinCurve( scale ) {

        THREE.Curve.call( this );
    
        this.scale = ( scale === undefined ) ? 1 : scale;
    
        }

        var steps = 16;

        var r = 6;

        var l = (Math.PI*2*r)/steps;
        
        CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
        CustomSinCurve.prototype.constructor = CustomSinCurve;
        
        CustomSinCurve.prototype.getPoint = function ( t ) {
        
            var tx = Math.cos( 2.2 * Math.PI * t)*1.5;
            var ty = Math.sin( 2.1 * Math.PI * t)*1.5;
            var tz = t * (l+0.7) - l/2;
         
    
            return new THREE.Vector3( tx, ty, tz );//.multiplyScalar( this.scale );
        };
        
        var path = new CustomSinCurve( 1 );
        var geometry = new THREE.TubeGeometry( path, 64, 0.5, 64, false );

        var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        var spiral = [];

        var t = 1/steps;

        var inrc = 0;

        var rnaProtein = new THREE.Group();
    
        for (var i = 0; i < steps; ++i){

            spiral.push(mesh.clone());

            spiral[i].position.x = Math.cos(2 * Math.PI * inrc)*r;
            spiral[i].position.y = Math.sin(2 * Math.PI * inrc)*r;

            spiral[i].rotateX(Math.PI/2);

            spiral[i].rotateY(Math.PI*2*inrc);

            inrc += t;

            //scene.add(spiral[i]);
            rnaProtein.add(spiral[i]);
        }
        rnaProtein.remove( spiral[steps*3/4] );

       // ***********************************************************************************************

       var spikeGlycoproteins = [];
       
       for ( var i = 0; i < envelopeGeo.vertices.length ; ++i){

        spikeGlycoproteins.push(spikeGlycoprotein.clone());

        spikeGlycoproteins[i].position.x = envelopeGeo.vertices[i].x;
        spikeGlycoproteins[i].position.y = envelopeGeo.vertices[i].y;
        spikeGlycoproteins[i].position.z = envelopeGeo.vertices[i].z;

        var rotationAxis = new THREE.Vector3(spikeGlycoproteins[i].position.x, spikeGlycoproteins[i].position.y, spikeGlycoproteins[i].position.z);

        rotationAxis.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/2);

        if ( !(rotationAxis.x == 0 && rotationAxis.z == 0 && rotationAxis.y < 0)){

            rotationAxis.y = 0;

            rotationAxis.normalize();

            spikeGlycoproteins[i].rotateOnAxis(rotationAxis, spikeGlycoproteins[i].position.angleTo(new THREE.Vector3(0, 1, 0)));
        }

        else{

            spikeGlycoproteins[i].rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI);
        }

        if (spikeGlycoproteins[i].position.z <= 0)
            scene.add(spikeGlycoproteins[i]);
       }

       var otherProteins = [];

       for (var i = 0; i < envelopeGeo.faces.length; ++i){

        if ( i % 3 == 0 ){
            otherProteins.push(mProtein.clone());
        }
        else if (i % 3 == 1){
            otherProteins.push(dimer.clone());
        }
        else{
            otherProteins.push(eProtein.clone());
        }

        otherProteins[i].position.x = envelopeGeo.faces[i].normal.x*9.3; 
        otherProteins[i].position.y = envelopeGeo.faces[i].normal.y*9.3; 
        otherProteins[i].position.z = envelopeGeo.faces[i].normal.z*9.3; 

        var rotationAxis = new THREE.Vector3(otherProteins[i].position.x, otherProteins[i].position.y, otherProteins[i].position.z);

        rotationAxis.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/2);

        rotationAxis.y = 0;

        rotationAxis.normalize();
   

        otherProteins[i].rotateOnAxis(rotationAxis, otherProteins[i].position.angleTo(new THREE.Vector3(0, 1, 0)));

        if (otherProteins[i].position.z <= 0)
            scene.add(otherProteins[i]);
       }

       scene.add(rnaProtein);


       var gui = new GUI(),
					//folderLocal = gui.addFolder( 'Local Clipping' ),
					propsLocal = {

						get 'Enabled'() {

							return renderer.localClippingEnabled;

						},
						set 'Enabled'( v ) {

                            if ( v ){
                                addHalf();
                            }
                            else{
                                addAll();
                            }

							renderer.localClippingEnabled = v;

						},
                    };
gui.add(propsLocal, 'Enabled');
                    //folderLocal.add( propsLocal, 'Enabled' );

        function addAll(){
            for(var i = 0; i < envelopeGeo.vertices.length ; ++i){
                if ( spikeGlycoproteins[i].position.z > 0 ){
                    scene.add(spikeGlycoproteins[i]);
                }
            }
            for (var i = 0; i < envelopeGeo.faces.length; ++i){
                if ( otherProteins[i].position.z > 0 ){
                    scene.add(otherProteins[i]);
                }
            }
        }

        function addHalf(){
            for(var i = 0; i < envelopeGeo.vertices.length ; ++i){
                if ( spikeGlycoproteins[i].position.z > 0 ){
                    scene.remove(spikeGlycoproteins[i]);
                }
            }
            for (var i = 0; i < envelopeGeo.faces.length; ++i){
                if ( otherProteins[i].position.z > 0 ){
                    scene.remove(otherProteins[i]);
                }
            }
        }

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
 
