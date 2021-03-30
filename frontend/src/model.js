import React, { Component } from "react";

import THREE from "./three";


class Model extends Component {
    componentDidMount() {

        var scene = new THREE.Scene();

        var WIDTH = window.innerWidth/2-150;
        var HEIGHT = window.innerHeight-150;

        var camera = new THREE.PerspectiveCamera(70,WIDTH / HEIGHT,0.1,10000);
        // camera.position.z = 0;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);

        this.mount.appendChild(renderer.domElement);

        window.onload=function(){
            this.controls = new THREE.OrbitControls(camera);
        }



        // ADD OBJECT
        // var geometry = new THREE.BoxGeometry(2, 2, 2);
        // var material = new THREE.MeshPhongMaterial( {
        //     color: 0x156289,
        //     emissive: 0x072534,
        //     side: THREE.DoubleSide,
        //     flatShading: true
        // } );
        var sphereMaterial = new THREE.MeshLambertMaterial( {
            color: 0xCC0000,
            wireframe: false
        });

        var RADIUS = 30;
        var SEGMENTS = 30;
        var RINGS = 120;

        // var cube = new THREE.Mesh(geometry, material);
        var sphere = new THREE.Mesh(new THREE.CylinderGeometry(RADIUS,SEGMENTS,RINGS),sphereMaterial);
        // scene.add(cube);

        sphere.position.x = 15;
        sphere.position.y = -20;
        sphere.position.z = -300;

        scene.add(sphere);

        // ADD  LIGHTS
        var lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );



        // SCALE ON RESIZE
        var tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
        var windowHeight = window.innerHeight;
        window.addEventListener( 'resize', onWindowResize, false );
        function onWindowResize( event ) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );

            camera.updateProjectionMatrix();
            camera.lookAt( scene.position );

            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.render( scene, camera );
        }


        // ANIMATE THE SCENE
        var animate = function() {
            requestAnimationFrame(animate);
            sphere.rotation.x = THREE.Math.degToRad(80);
            sphere.rotation.y = THREE.Math.degToRad(110);
            sphere.rotation.z = THREE.Math.degToRad(90);

            renderer.render(scene, camera);
        };

        animate();
    }

    render() {return <div ref={ref => (this.mount = ref)} />;}
}
export default Model
