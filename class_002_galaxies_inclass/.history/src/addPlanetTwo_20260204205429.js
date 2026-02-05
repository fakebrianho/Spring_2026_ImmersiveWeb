import * as THREE from 'three'
export function addPlanetTwo() {
	const geometry = new THREE.SphereGeometry(0.4, 32, 32)
	const material = new THREE.MeshBasicMaterial({ color: '0x00ff00' })
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}
