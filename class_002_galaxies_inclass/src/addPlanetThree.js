import * as THREE from 'three'
export function addPlanetThree() {
	const geometry = new THREE.SphereGeometry(0.6, 32, 32)
	const material = new THREE.MeshBasicMaterial({ color: '0x0000ff' })
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}
