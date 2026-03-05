import './style.css'
import * as THREE from 'three'
import { addDefaultMeshes, addStandardMeshes } from './addDefaultMeshes'
import { addLight } from './addLight'
import Model from './model'
import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import { toCanvas } from 'html-to-image'

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

	resize()
	animate()
}
// function dynamicTexture() {
const texCanvas = document.createElement('canvas')
const texW = 1024,
	texH = 512
texCanvas.width = texW
texCanvas.height = texH
const ctx = texCanvas.getContext('2d')
const texture = new THREE.CanvasTexture(texCanvas)
texture.colorSpace = THREE.SRGBColorSpace
texture.minFilter = THREE.LinearFilter

const material = new THREE.MeshStandardMaterial({
	map: texture,
	roughness: 0.7,
	metalness: 0,
	side: THREE.DoubleSide,
})
const panel = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), material)
meshes.panel = panel
scene.add(meshes.panel)
// }
function drawCard(data) {
	// background
	ctx.clearRect(0, 0, texW, texH)
	ctx.fillStyle = '#0f1115'
	ctx.fillRect(0, 0, texW, texH)

	// text
	ctx.fillStyle = '#ffffff'
	ctx.font = '600 48px system-ui'
	ctx.fillText('API Status', 40, 60)

	// main value
	ctx.fillStyle = '#ffffff'
	ctx.font = '700 92px system-ui'
	ctx.fillText(`${data.value}`, 40, 260)

	// tell Three to upload updated pixels
	texture.needsUpdate = true
}
async function fetchData() {

	// Demo data:
	return {
		value: Math.floor(Math.random() * 101),
		label: 'Completion %',
	}
}

async function update() {
	try {
		const data = await fetchData()
		drawCard(data)
	} catch (e) {
		drawCard({ value: 0, label: 'Fetch failed' })
	}
}

// Update on a timer for sake of simulating 
update()
setInterval(update, 2000)

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	if (meshes.panel) {
		meshes.panel.rotation.y += 0.01
	}
	renderer.render(scene, camera)
}
