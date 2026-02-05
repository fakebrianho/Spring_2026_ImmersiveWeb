import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes } from './addDefaultMeshes'
import { addSphereMesh } from './addSphereMesh'
import { addTorusMesh } from './addTorusMesh'

const scene = new THREE.Scene()
//(FOV, ASPECT RATIO, NEAR, FAR)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
const renderer = new THREE.WebGLRenderer({ antialias: true })

const meshes = {}

init()
function init() {
	// we do all our setup stuff
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	camera.position.z = 5

	//here we populate our meshes container
	meshes.default = addDefaultMeshes()
	meshes.default.position.x = 2

	meshes.default2 = addDefaultMeshes()
	meshes.default2.position.x = -2

	meshes.default3 = addDefaultMeshes()
	meshes.default3.position.y = 2

	meshes.sphere = addSphereMesh()
	meshes.torus = addTorusMesh()

	//add meshes to our scene
	scene.add(meshes.default)
	scene.add(meshes.default2)
	scene.add(meshes.default3)
	scene.add(meshes.sphere)
	scene.add(meshes.torus)

	animate()
}

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	meshes.default.rotation.x += 0.01
	meshes.default2.rotation.y -= 0.1
	meshes.default3.rotation.z += 0.1
	meshes.torus.rotation.x += 0.01
  meshes.sphere
}
