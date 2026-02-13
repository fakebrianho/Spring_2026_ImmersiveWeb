import * as THREE from 'three'

export function addLambertMeshes() {
	const geometry = new THREE.TorusKnotGeometry(0.5, 0.1, 256, 64)
	const material = new THREE.MeshLambertMaterial({
		color: 0x77aaff,
		emissive: 0x223355,
		emissiveIntensity: 0.3,
		flatShading: true,
	})
}
