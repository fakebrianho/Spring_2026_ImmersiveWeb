import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes, addStandardMeshes } from './addDefaultMeshes'
import { addLight } from './addLight'
import { addParticles } from './addParticles'
import Model from './model'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

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
const controls = new OrbitControls(camera, renderer.domElement)
const clock = new THREE.Clock()

init()
function init() {
	// we do all our setup stuff
	renderer.setSize(window.innerWidth, window.innerHeight)
	const container = document.querySelector('container')
	document.body.appendChild(renderer.domElement)
	camera.position.z = 5

	lights.default = addLight()
	scene.add(lights.default)

	//here we populate our meshes container
	meshes.default = addDefaultMeshes()
	// meshes.default.position.x = 2

	meshes.standard = addStandardMeshes()
	meshes.standard.position.x = -2

	meshes.points = addParticles()

	//add meshes to our scene
	scene.add(meshes.points)
	scene.add(meshes.default)

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
	const t = clock.getElapsedTime()
	const { count, positions, baseX, baseZ, sineAmp, sineFreq, positionAttr } =
		meshes.points.userData

	const floatDownSpeed = 0.6
	const respawnY = 5

	for (let i = 0; i < count; i++) {
		const i3 = i * 3
		positions[i3] = baseX[i] + sineAmp[i] * Math.sin(t * sineFreq[i])
		positions[i3 + 2] = baseZ[i] + sineAmp[i] * Math.cos(t * sineFreq[i])
		positions[i3 + 1] -= floatDownSpeed * 0.013
		if (positions[i3 + 1] < -5) {
			positions[i3 + 1] = respawnY
		}
	}

	positionAttr.needsUpdate = true

	controls.update()
	renderer.render(scene, camera)
}
