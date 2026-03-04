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
//We need to set alpha to true so that we can overlay the canvas and our HTML Elements
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
// Scrollable container element (holds the scrollable content)
const container = document.querySelector('.container')
const clock = new THREE.Clock()
const objectDistance = 50 // Vertical spacing between each scroll section in world units
const sectionMeshes = [] // List of meshes, one per scroll section

// =============================================================================
// SPATIAL AUDIO SETUP (3D positional sound)
// =============================================================================
// AudioListener hears sound based on camera position—attached to camera so audio
// changes as you "move" through the scene
const listener = new THREE.AudioListener()
camera.add(listener)

// Load and configure audio for section 1
audioLoader.load('/1.mp3', function (buffer) {
	sound1.setBuffer(buffer)
	sound1.setRefDistance(10) // Distance at which volume is 100%
	sound1.setRolloffFactor(5) // How quickly volume decreases with distance
	sound1.setMaxDistance(200) // Beyond this, no sound is heard
	sound1.setDistanceModel('exponential') // Falloff curve for realistic 3D audio
})

// Load and configure audio for section 2
audioLoader.load('/2.mp3', function (buffer) {
	sound2.setBuffer(buffer)
	sound2.setRefDistance(10)
	sound2.setRolloffFactor(5)
	sound2.setMaxDistance(200)
	sound2.setDistanceModel('exponential')
})

// Load and configure audio for section 3
audioLoader.load('/3.mp3', function (buffer) {
	sound3.setBuffer(buffer)
	sound3.setRefDistance(10)
	sound3.setRolloffFactor(5)
	sound3.setMaxDistance(200)
	sound3.setDistanceModel('exponential')
})

// =============================================================================
// SCROLL STATE (synced with container scroll position)
// =============================================================================
let scrollY = 0 // Current scroll offset in pixels
let currentSection = 0 // Which section (0, 1, or 2) is currently in view

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
	meshes.standard = addStandardMesh()
	meshes.standard2 = addStandardMesh()
	meshes.standard3 = addStandardMesh()

	// Stack section meshes vertically with spacing (objectDistance units apart)
	meshes.standard.position.y = objectDistance * 0 // Top section
	meshes.standard2.position.y = -objectDistance * 1 // Middle section
	meshes.standard3.position.y = -objectDistance * 2 // Bottom section

	// Attach each audio source to its section mesh (sound emits from mesh position)
	meshes.standard.add(sound1)
	meshes.standard2.add(sound2)
	meshes.standard3.add(sound3)

	sectionMeshes.push(meshes.standard)
	sectionMeshes.push(meshes.standard2)
	sectionMeshes.push(meshes.standard3)

	// Click anywhere to start all three audio tracks (unmutes for autoplay policies)
	window.addEventListener('click', () => {
		sound1.play()
		sound2.play()
		sound3.play()
	})

	//add meshes to our scene
	scene.add(meshes.standard)
	scene.add(meshes.standard2)
	scene.add(meshes.standard3)

	resize()
	animate()
}

function initScrolling() {
	container.addEventListener('scroll', () => {
		scrollY = container.scrollTop

		// Derive section index from scroll (each viewport height = one section)
		const section = Math.round(scrollY / window.innerHeight)

		// When entering a new section, trigger a rotation "pop" on that section's mesh
		if (section != currentSection) {
			currentSection = section
			gsap.to(sectionMeshes[section].rotation, {
				duration: 1.5,
				ease: 'power3.inOut',
				x: '+=6', // Add 6 radians rotation on X axis
				y: '+=3', // Add 3 radians rotation on Y axis
			})
		}
	})
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
	meshes.standard.rotation.y += 0.01
}
