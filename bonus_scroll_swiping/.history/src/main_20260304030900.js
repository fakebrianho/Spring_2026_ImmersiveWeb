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

const wheel = new WheelAdaptor({ type: 'discrete' })
wheel.connect()wheel.addEventListener('trigger', () => {
	//increment our counter each time we scroll
	counter = (counter + 1) % arrMatcaps.length
	//check if our meshes.flower exists
	if (meshes.flower) {
		//if meshes.flower exists then we create a new matcap material with the new matcap
		const replacementMaterial = new THREE.MeshMatcapMaterial({
			map: tLoader.load(arrMatcaps[counter]),
		})
		//we traverse the mesh for all meshes since 3d models are often groups of smaller individual 3d models
		//for each mesh we find we replace the material with our new material
		meshes.flower.traverse((child) => {
			if (child.isMesh) {
				child.material = replacementMaterial
			}
		})
	}
	// if (currentSlide < slides.length - 1) {
	// 	currentSlide++
	// } else {
	// 	currentSlide = 0
	// }
	// gsap.to(camera.position, {
	// 	y: currentSlide * -10,
	// 	duration: 2,
	// 	ease: 'back.inOut',
	// })
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
