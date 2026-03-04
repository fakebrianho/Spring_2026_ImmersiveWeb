import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes, addStandardMeshes } from './addDefaultMeshes'
import { addLight } from './addLight'
import Model from './model'
import { WheelAdaptor } from 'three-story-controls'
import gsap from 'gsap'
const scene = new THREE.Scene()
//(FOV, ASPECT RATIO, NEAR, FAR)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100,
)
const renderer = new THREE.WebGLRenderer({ antialias: true })

const meshes = {}
const lights = {}

init()
function init() {
	// we do all our setup stuff
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	camera.position.z = 5

	lights.default = addLight()
	scene.add(lights.default)

	//here we populate our meshes container
	meshes.default = addDefaultMeshes()
	meshes.default.position.x = 2
	meshes.default.position.y = -3
	meshes.default.position.z = -3

	meshes.standard = addStandardMeshes()
	meshes.standard.position.x = -2

	//add meshes to our scene
	scene.add(meshes.default)
	scene.add(meshes.standard)

	resize()
	animate()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	meshes.default.rotation.x += 0.01
	meshes.standard.rotation.y += 0.01
}
