import './style.css'
import * as THREE from 'three'
import {addDefaultMeshes} from './addDefaultMeshes'

const scene = new THREE.Scene();
//(FOV, ASPECT RATIO, NEAR, FAR)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer({ antialias: true });


const meshes = {}

init()
function init(){
  // we do all our setup stuff
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  camera.position.z = 5

  //here we populate our meshes container 
  meshes.default = addDefaultMeshes();

  scene.add(meshes.default)

  animate()
}

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}