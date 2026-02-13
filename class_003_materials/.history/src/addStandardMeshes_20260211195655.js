import * as THREE from 'three'

export function addStandardMeshes() {
	const geometry = new THREE.TorusKnotGeometry(0.5, 0.1, 256, 64)
	const material = new THREE.MeshStandardMaterial({
		color: 0xb873333,
		metalness: 0.2,
		roughness: 0.35,
		emissive: 0x0a0a0a,
		emissiveIntensity: 0.2,
	})
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}
