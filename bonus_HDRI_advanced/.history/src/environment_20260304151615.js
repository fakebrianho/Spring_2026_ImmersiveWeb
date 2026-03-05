import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

async function envMap(renderer, scene) {
	const ktx2 = new KTX2Loader().setTranscoderPath('/basis/')
	ktx2.detectSupport(renderer)

	const hdrTex = await ktx2.loadAsync('/bg_2048.ktx2')
	hdrTex.mapping = THREE.EquirectangularReflectionMapping

	const pmrem = new THREE.PMREMGenerator(renderer)
	pmrem.compileEquirectangularShader()

	const envRT = pmrem.fromEquirectangular(hdrTex)
	scene.environment = envRT.texture

	hdrTex.dispose()
	pmrem.dispose()
}
