import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

let sky // keep a reference if you want to rotate/tint later

export async function envMap(renderer, scene) {
	const ktx2 = new KTX2Loader().setTranscoderPath('/basis/')
	ktx2.detectSupport(renderer)

	// ---------- VISIBLE BACKGROUND (LDR KTX2) ----------
	const bg = await ktx2.loadAsync('/bg_2048.ktx2')
	bg.colorSpace = THREE.SRGBColorSpace
	bg.needsUpdate = true

	// Skydome (always works with CompressedTexture)
	const geo = new THREE.SphereGeometry(50, 64, 32)
	geo.scale(-1, 1, 1)

	const mat = new THREE.MeshBasicMaterial({ map: bg })
	sky = new THREE.Mesh(geo, mat)
	sky.frustumCulled = false
	scene.add(sky)

	// IMPORTANT: don’t rely on scene.background for the image
	scene.background = null

	// ---------- LIGHTING (HDR KTX2 -> PMREM) ----------
	const hdrTex = await ktx2.loadAsync('/env_1024.ktx2')
	hdrTex.mapping = THREE.EquirectangularReflectionMapping
	hdrTex.needsUpdate = true

	const pmrem = new THREE.PMREMGenerator(renderer)
	const envRT = pmrem.fromEquirectangular(hdrTex)
	scene.environment = envRT.texture

	// cleanup
	hdrTex.dispose()
	pmrem.dispose()

	return { sky }
}
