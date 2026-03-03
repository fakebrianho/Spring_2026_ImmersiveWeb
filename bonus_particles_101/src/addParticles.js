import * as THREE from 'three'

export function addParticles() {
	const count = 1000
	const positions = new Float32Array(count * 3)

	for (let i = 0; i < count * 3; i++) {
		positions[i] = (Math.random() - 0.5) * 10
	}
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

	// Material
	const material = new THREE.PointsMaterial({
		color: 0xffffff,
		size: 0.1,
	})
	return new THREE.Points(geometry, material)
}
