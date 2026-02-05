import * as THREE from 'three'

export function addPlanetOne() {
	const geometry = new THREE.SphereGeometry(0.2, 32, 32)
	const material = new THREE.MeshBasicMaterial({ color: '0xff0000' })
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}
