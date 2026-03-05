import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export async function envMap(renderer, scene) {
	const ktx2 = new KTX2Loader().setTranscoderPath('/basis/')
	ktx2.detectSupport(renderer)
	const bg = await ktx2.loadAsync('/bg_2048.ktx2')
	bg.mapping = THREE.EquirectangularReflectionMapping
	bg.colorSpace = THREE.SRGBColorSpace

	const hdrTex = await ktx2.loadAsync('/env_1024.ktx2')
	hdrTex.mapping = THREE.EquirectangularReflectionMapping

	const pmrem = new THREE.PMREMGenerator(renderer)
	pmrem.compileEquirectangularShader()

	// Convert KTX2 equirectangular to cubemap for background (CompressedTexture
	// doesn't work with WebGLCubeMaps' equirect→cubemap path)
	const bgRT = pmrem.fromEquirectangular(bg)
	scene.background = bgRT.texture

	const envRT = pmrem.fromEquirectangular(hdrTex)
	scene.environment = envRT.texture

	bg.dispose()
	hdrTex.dispose()
	pmrem.dispose()
}
