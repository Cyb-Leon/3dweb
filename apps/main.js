import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(25);

renderer.render(scene, camera);

//adding objects
//moon
const moonTexture = new THREE.TextureLoader().load('/img/moon-map-model.jpg');
const normalTexture = new THREE.TextureLoader().load('/img/NormalMap.png');
const normalmoonTexture = new THREE.TextureLoader().load('/img/normal-map.png');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map: moonTexture,
  normalMap:normalmoonTexture})
); 
moon.position.setZ(25);
moon.position.setX(-10);
scene.add(moon);

//Avatar
const grayCloudLogoTexture = new THREE.TextureLoader().load('/img/GRAYCLOUD_v1.2.png');
const grayCloudLogo = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshStandardMaterial({map: grayCloudLogoTexture,
    normalMap: normalTexture})
); 
scene.add(grayCloudLogo);

//--torus-object
const geomerty = new THREE.TorusGeometry(10, 3, 16, 100, 6.283185307179586);
const material = new THREE.MeshStandardMaterial({ color: 0x005B41 });
const torus = new THREE.Mesh(geomerty, material);

//--stars-object
function addStar() {
  const geomerty = new THREE.SphereGeometry(
    .25,
    3,
    24,
    0,
    6.1261056745001,
    6.283185307179586,
    6.283185307179586
  );
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const stars = new THREE.Mesh(geomerty, material);
     stars.position.y = 0.1;

     stars.position.x = 0.6;
     const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

 stars.position.set(x,z,y);
 scene.add(stars);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('/img/bg.jpg');
scene.background = spaceTexture;

scene.add(torus);
//adding light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(3, 3, 7);
pointLight.intensity = 200;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

//scene controls (with mouse)
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

//onscroll
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  grayCloudLogo.rotation.y += 0.01;
  grayCloudLogo.rotation.x += 0.01;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

animate();
