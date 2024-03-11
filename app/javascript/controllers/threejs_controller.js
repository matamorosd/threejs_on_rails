import { Controller } from "@hotwired/stimulus"
import * as THREE from 'three';
import { OrbitControls } from 'three/orbit';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Connects to data-controller="threejs"
export default class extends Controller {
  connect() {
    console.log("Hello Stimulus!", this.element);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: false
    });

    this.originCube = this.createCube(0,0,0);
    this.offsetCube = this.createCube(3,3,-2);

    this.pointLight = new THREE.PointLight(0xffffff);
    this.pointLight.position.set(1,1,0);

    this.lightHelper = new THREE.PointLightHelper(this.pointLight);
    this.gridHelper = new THREE.GridHelper(100,100);

    this.scene.add(
      this.lightHelper,
      this.gridHelper,
      this.originCube,
      this.offsetCube,
      this.pointLight
      );

    const backgroundTexture = new THREE.TextureLoader().load("/assets/image.jpg");
    this.scene.background = backgroundTexture;  

    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.animate();
  }

  animate(){
    requestAnimationFrame(this.animate.bind(this));

    this.originCube.rotation.x += 0.01;
    this.originCube.rotation.y += 0.01;

    this.offsetCube.rotation.x -= 0.01;
    this.offsetCube.rotation.y -= 0.01;

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  createCube(x,y,z){
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x,y,z);
    return cube;
  }
}
