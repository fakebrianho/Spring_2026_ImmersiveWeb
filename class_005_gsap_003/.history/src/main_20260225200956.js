import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes, addStandardMeshes } from './addDefaultMeshes'
import { addLight } from './addLight'
import Model from './model'
import gsap from 'gsap'
import { InteractionManager } from 'three.interactive'

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
const interactionManager = new InteractionManager(
	renderer,
	camera,
	renderer.domElement,
)
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

	interactions()
	instances()
	resize()
	animate()
}
function interactions() {
	meshes.default.addEventListener('click', (event) => {
		gsap.to(meshes.default.scale, {
			x: meshes.default.scale.x + 2,
			y: meshes.default.scale.y + 2,
			z: meshes.default.scale.z + 2,
			duration: 1,
			ease: 'power1',
		})
	})
	meshes.flower.addEventListener('click', (event) => {
		gsap.to(meshes.flower.rotation, {
			x: meshes.flower.rotation.x + Math.PI * 2,
			y: meshes.flower.rotation.y + Math.PI * 2,
			y: meshes.flower.rotation.y + Math.PI * 2,
		})
	})
	interactionManager.add(meshes.default)
}

function instances() {
	const flower = new Model({
		url: './flowers.glb',
		scene: scene,
		meshes: meshes,
		scale: new THREE.Vector3(2, 2, 2),
		position: new THREE.Vector3(0, -0.8, 3),
		replace: true,
	})
	flower.init()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	interactionManager.update()
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	meshes.default.rotation.x += 0.01
	meshes.standard.rotation.y += 0.01
}
