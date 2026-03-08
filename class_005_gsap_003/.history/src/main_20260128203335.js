import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();
//(FOV, ASPECT RATIO, NEAR, FAR)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer({ antialias: true });

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

init()
function init(){
  // we do all our setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  
  animate()
}

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}