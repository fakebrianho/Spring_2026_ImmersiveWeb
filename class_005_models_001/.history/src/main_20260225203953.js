import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes, addStandardMeshes } from './addDefaultMeshes'
import { addLight } from './addLight'
import Model from './model'

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

	meshes.standard = addStandardMeshes()
	meshes.standard.position.x = -2

	//add meshes to our scene
	scene.add(meshes.default)
	scene.add(meshes.standard)

	instances()
	resize()
	animate()
}

function instances() {
	// const flower = new Model({
	// 	url: './flowers.glb',
	// 	scene: scene,
	// 	meshes: meshes,
	// 	scale: new THREE.Vector3(2, 2, 2),
	// 	position: new THREE.Vector3(0, -0.8, 3),
	// 	replace: true,
	// })
	// flower.init()
	const car1 = new Model({
		url: './car1.glb',
		scene: scene,
		meshes: meshes,
		name: 'car1',
		scale: new THREE.Vector3(50, 50, 50),
		position: new THREE.Vector3(0, -0.2, 0),
	})
	car1.init()
	const car2 = new Model({
		url: './car2.glb',
		scene: scene,
		meshes: meshes,
		name: 'car2',
		scale: new THREE.Vector3(0.25, 0.25, 0.25),
		position: new THREE.Vector3(0, 3, 0)
	})
	car2.init()
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
