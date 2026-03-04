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
const positions = [
	{ x: 3, y: 1, z: -3 },
	{ x: -3, y: 1, z: -3 },
	{ x: 0, y: -0.5, z: 1 },
]
let counter = 0

// WheelAdaptor: listens for scroll/swipe gestures; 'discrete' fires one trigger per gesture (not continuous)
const wheel = new WheelAdaptor({ type: 'discrete' })
// connect() attaches the adapter to the DOM so it can detect wheel/touch events
wheel.connect()
// 'trigger' fires each time the user scrolls or swipes
wheel.addEventListener('trigger', () => {
	// advance counter (0→1→2→0...) to track which "rotation phase" we're in
	counter = (counter + 1) % positions.length

	// assign each mesh to the next slot: mesh i goes to position (i + counter) so they rotate
	const meshList = [meshes.default, meshes.standard, meshes.three]
	meshList.forEach((mesh, i) => {
		const pos = positions[(i + counter) % positions.length]
		// animate mesh to its new position with a smooth ease-out
		gsap.to(mesh.position, {
			x: pos.x,
			y: pos.y,
			z: pos.z,
			duration: 0.4,
			ease: 'power2.out',
		})
	})
})
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
	meshes.default.position.x = 3
	meshes.default.position.y = 1
	meshes.default.position.z = -3

	meshes.standard = addStandardMeshes()
	meshes.standard.position.x = -3
	meshes.standard.position.y = 1
	meshes.standard.position.z = -3

	meshes.three = addStandardMeshes()
	meshes.three.position.z = 1
	meshes.three.position.y = -0.5

	//add meshes to our scene
	scene.add(meshes.default)
	scene.add(meshes.standard)
	scene.add(meshes.three)

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
	meshes.three.rotation.z += 0.01
}
