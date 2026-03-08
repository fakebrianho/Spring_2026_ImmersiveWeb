import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes, addStandardMeshes } from './addDefaultMeshes'
import { addLight } from './addLight'
import Model from './model'
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

let counter = 0

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

	// instances()
	interactions()
	resize()
	animate()
}

function interactions() {
	window.addEventListener('click', () => {
		counter++
		if (counter == 1) {
			gsap.to(meshes.default.scale, {
				x: 2,
				y: 2,
				z: 2,
				duration: 1,
				ease: 'power1',
			})
		}else if(counter == 2){
			gsap.to(meshes.default.position, {
				x: 0,
				y: 2,
				z: 0,
				duration: 1,
				ease: 'power1',
			})
		}else{
			counter = 0
			gsap.to(meshes.default.scale, {
				x: 1,
				y: 1,
				z: 1,
				duration: 1,
				ease: 'power1',
			})
			gsap.to(meshes.default.position, {
				x: 2, y: 0, z: 0,
				duration: 1,
				ease: 'power1'
			})
		}
	
	
	})
	//
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
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	meshes.default.rotation.x += 0.01
	meshes.standard.rotation.y += 0.01
}
