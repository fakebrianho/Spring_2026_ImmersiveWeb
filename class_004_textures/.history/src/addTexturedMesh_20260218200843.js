import * as THREE from 'three'

export function addTexturedMesh() {
	const geometry = new THREE.SphereGeometry(1, 256, 256)
    const material = new THREE.MeshPhysicalMaterial({
        emissive: 0x0000ff, 
        emissiveIntensity: 1,
        metalness: 0.1,
    })
}
