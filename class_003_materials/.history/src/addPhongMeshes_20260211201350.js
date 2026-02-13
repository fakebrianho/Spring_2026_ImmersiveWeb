import * as THREE from 'three'

export function addPhongMeshes() {
	const geometry = new THREE.TorusKnotGeometry(0.5, 0.1, 256, 64)
	const material = new THREE.MeshPhongMaterial({
		color: 0x3d9cff,
		emissive: 0x050816,
		specular: 0xffffff,
		shininess: 120,
		reflectivity: 1,
		flatShading: false,
	})
}
