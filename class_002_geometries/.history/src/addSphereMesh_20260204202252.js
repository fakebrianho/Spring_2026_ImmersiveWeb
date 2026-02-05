import * as THREE from 'three'

export function addSphereMesh() {
	const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
	const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
}
