import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes } from './addDefaultMeshes'
import { addStandardMeshes } from './addStandardMeshes'
import { addPhongMeshes } from './addPhongMeshes'
import { addLambertMeshes } from '.addLambertMeshes'

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
	camera.position.z = 5

	//Lights
	const keyLight = new THREE.DirectionalLight(0xffffff, 2)
	keyLight.position.set(5, 5, 5)
	scene.add(keyLight)
	const keyHelper = new THREE.DirectionalLightHelper(keyLight, 5)
	scene.add(keyHelper)

	const rimLight = new THREE.PointLight(0xff77ff, 5, 20)
	rimLight.position.set(-3, 2, 7)
	scene.add(rimLight)
	const rimLightHelper = new THREE.PointLightHelper(rimLight, 0.6)
	scene.add(rimLightHelper)

	const fillLight = new THREE.PointLight(0xffffff, 1)
	fillLight.position.set(2, 2, 2)
	scene.add(fillLight)

	//here we populate our meshes container
	//Materials Test
	meshes.standard = addStandardMeshes()
	scene.add(meshes.standard)

	meshes.phong = addPhongMeshes()
	meshes.phong.position.x = 2
	scene.add(meshes.phong)

	//add meshes to our scene

	animate()
}

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	meshes.standard.rotation.y += 0.05
	meshes.phong.rotation.y += 0.05
}
