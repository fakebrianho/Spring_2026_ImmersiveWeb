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
function dynamicTexture() {
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
	})
	const panel = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), material)
	scene.add(panel)
// }
function drawCard(data) {
	// background
	ctx.clearRect(0, 0, texW, texH)
	ctx.fillStyle = '#0f1115'
	ctx.fillRect(0, 0, texW, texH)

	// header bar
	ctx.fillStyle = '#1b1f2a'
	ctx.fillRect(0, 0, texW, 90)

	// text
	ctx.fillStyle = '#ffffff'
	ctx.font = '600 48px system-ui'
	ctx.fillText('API Status', 40, 60)

	ctx.fillStyle = '#cbd5e1'
	ctx.font = '400 32px system-ui'
	ctx.fillText(`Updated: ${new Date().toLocaleTimeString()}`, 40, 140)

	// main value
	ctx.fillStyle = '#ffffff'
	ctx.font = '700 92px system-ui'
	ctx.fillText(`${data.value}`, 40, 260)

	ctx.fillStyle = '#94a3b8'
	ctx.font = '500 30px system-ui'
	ctx.fillText(data.label ?? 'Example metric', 44, 310)

	// simple bar
	const pct = Math.max(0, Math.min(1, data.value / 100))
	ctx.fillStyle = '#243042'
	ctx.fillRect(40, 360, 944, 44)
	ctx.fillStyle = '#60a5fa'
	ctx.fillRect(40, 360, 944 * pct, 44)

	// tell Three to upload updated pixels to GPU
	texture.needsUpdate = true
}
async function fetchData() {
	// Replace with your API call:
	// const res = await fetch("https://your-api.com/endpoint");
	// return await res.json();

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

// Update on a timer (or use websockets, events, etc.)
update()
setInterval(update, 2000)
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
