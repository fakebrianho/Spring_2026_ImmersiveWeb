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
  meshes.default.position.x = 2

  meshes.default2 = addDefaultMeshes();
  meshes.default2.position.x = -2

  meshes.default3 = addDefaultMeshes();
  meshes.default3.position.y = 2

  //add meshes to our scene 
  scene.add(meshes.default)
  scene.add(meshes.default2)
  scene.add(meshes.default3)

  animate()
}

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  meshes.default.rotation.x += 0.01
}