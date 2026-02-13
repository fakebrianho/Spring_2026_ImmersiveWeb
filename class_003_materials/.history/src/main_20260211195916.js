import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes } from './addDefaultMeshes'
import { addStandardMeshes } from './addStandardMeshes'

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

init()
function init() {
	// we do all our setup stuff
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	camera.position.z = 20

	//Lights
	const keyLight = new THREE.DirectionalLight(0xffffff, 2)
	keyLight.position.set(5, 5, 5)
	scene.add(keyLight)
	const keyHelper = new THREE.DirectionalLightHelper(keyLight, 5)
	scene.add(keyHelper)

	const rimLight = new THREE.PointLight(0xff77ff, 5, 20)
	rimLight.position.set(-3, 2, 7)
	scene.add(rimLight)

	const fillLight = new THREE.PointLight(0xffffff, 1)
	fillLight.position.set(2, 2, 2)
	scene.add(fillLight)

	//here we populate our meshes container
	meshes.default = addDefaultMeshes()
	meshes.default.position.x = 2

	meshes.default2 = addDefaultMeshes()
	meshes.default2.position.x = -2

	meshes.default3 = addDefaultMeshes()
	meshes.default3.position.y = 2

	//Materials Test
	meshes.standard = addStandardMeshes()

	//add meshes to our scene
	scene.add(meshes.default)
	scene.add(meshes.default2)
	scene.add(meshes.default3)
	scene.add(meshes.standard)

	animate()
}

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	meshes.default.rotation.x += 0.01
	meshes.default2.rotation.y -= 0.1
	meshes.default3.rotation.z += 0.1
	meshes.standard.rotation.y += 0.05
}
