import { Controller } from "@hotwired/stimulus"
import * as THREE from 'three';
import { OrbitControls } from 'three/orbit';

// Connects to data-controller="space"
export default class extends Controller {
  connect() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setlPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.setZ(30);
    this.camera.position.setX(-3);

    this.renderer.render(this.scene, this.camera);

    
    document.body.appendChild(this.renderer.domElement);
    
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color:0xFF6347});
    this.torus = new THREE.Mesh( geometry, material );

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5,5,5);

    const ambientLight = new THREE.AmbientLight(0xffffff);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200,50);
    
    this.scene.add(this.torus, pointLight, ambientLight, lightHelper, gridHelper);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    Array(200).fill().forEach(() => this.addStar());
    
    const backgroundTexture = new THREE.TextureLoader().load("/assets/space.jpg");
    this.scene.background = backgroundTexture;  

    const demoTexture = new THREE.TextureLoader().load("/assets/demo.png");

    this.demo = new THREE.Mesh(
      new THREE.BoxGeometry(3,3,3),
      new THREE.MeshBasicMaterial({ map: demoTexture})
    );

    this.demo.position.set(15,15,0);

    this.scene.add(this.demo);

    const moonTexture = new THREE.TextureLoader().load("/assets/moon.jpg");
    const normalTexture = new THREE.TextureLoader().load("/assets/normal.jpg");

    this.moon = new THREE.Mesh(
      new THREE.SphereGeometry(3,32,32),
      new THREE.MeshStandardMaterial({ 
        map: moonTexture,
        normalMap: normalTexture
       })
    );
    
    document.body.onscroll = this.moveCamera.bind(this);
    this.moveCamera();
    
    this.scene.add(this.moon);

    this.moon.position.z = 30;
    this.moon.position.setX(-10);
    
    this.demo.position.z = -5;
    this.demo.position.x = 2;

    this.animate();
    
  }

  moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    this.moon.rotation.x += 0.05;
    this.moon.rotation.y += 0.075;
    this.moon.rotation.z += 0.05;
  
    this.demo.rotation.y += 0.01;
    this.demo.rotation.z += 0.01;
  
    this.camera.position.z = t * -0.01;
    this.camera.position.x = t * -0.0002;
    this.camera.rotation.y = t * -0.0002;
  }

  animate(){
    requestAnimationFrame(this.animate.bind(this));
    
    this.torus.rotation.x += 0.01;
    this.torus.rotation.y += 0.005;
    this.torus.rotation.z += 0.01;

    this.controls.update();
 
    this.renderer.render(this.scene, this.camera);
  }

  addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({ color:0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    this.scene.add(star);

  }
}
