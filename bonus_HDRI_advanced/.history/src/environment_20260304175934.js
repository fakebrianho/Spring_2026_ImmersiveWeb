import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export async function envMap(renderer, scene) {
	const ktx2 = new KTX2Loader().setTranscoderPath('/basis/')
	ktx2.detectSupport(renderer)

	// -------------------------
	// BACKGROUND (LDR KTX2) -> cubemap (sharp)
	// -------------------------
	const bg = await ktx2.loadAsync('/bg_2048.ktx2')
	bg.colorSpace = THREE.SRGBColorSpace
	bg.mapping = THREE.EquirectangularReflectionMapping
	bg.needsUpdate = true

	// Convert to a cubemap explicitly (shader path, avoids WebGLCubeMaps guard)
	const bgCubeRT = new THREE.WebGLCubeRenderTarget(1024, {
		generateMipmaps: true,
		minFilter: THREE.LinearMipmapLinearFilter,
		colorSpace: THREE.SRGBColorSpace,
	})
	bgCubeRT.fromEquirectangularTexture(renderer, bg)
	scene.background = bgCubeRT.texture

	// -------------------------
	// ENVIRONMENT (HDR KTX2) -> PMREM (correct roughness)
	// -------------------------
	const hdrTex = await ktx2.loadAsync('/env_1024.ktx2')
	hdrTex.mapping = THREE.EquirectangularReflectionMapping
	hdrTex.needsUpdate = true

	const pmrem = new THREE.PMREMGenerator(renderer)
	const envRT = pmrem.fromEquirectangular(hdrTex)
	scene.environment = envRT.texture

	// cleanup
	bg.dispose()
	hdrTex.dispose()
	pmrem.dispose()
	// IMPORTANT: keep bgCubeRT alive; do NOT dispose it while in use
	// return it if you want to dispose later:
	return { bgCubeRT }
}
