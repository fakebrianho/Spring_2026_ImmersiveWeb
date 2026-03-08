import * as THREE from 'three'

export function addTexturedMesh() {
	const tLoader = new THREE.TextureLoader()
    
	const geometry = new THREE.SphereGeometry(1, 256, 256)
	const material = new THREE.MeshPhysicalMaterial({
		emissive: 0x0000ff,
		emissiveIntensity: 1,
		metalness: 0.1,
		roughness: 0,
		transimission: 0.5,
		ior: 2.33,
	})
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}
