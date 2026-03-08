import * as THREE from 'three'

export function addTexturedMesh() {
	const tLoader = new THREE.TextureLoader()
	const color = tLoader.load('/color.png')
	const normal = tLoader.load('/normal.png')
	const displace = tLoader.load('/displace.png')
	const ao = tLoader.load('/ao.png')

	const geometry = new THREE.SphereGeometry(1, 256, 256)

	geometry.setAttribute(
		'uv2',
		new THREE.BufferAttribute(geometry.attributes.uv.array, 2),
	)

	const material = new THREE.MeshPhysicalMaterial({
		map: color,
		normalMap: normal,
		emissive: 0x0000ff,
		displacementMap: displace,
		displacementScale: 0.3,
		emissiveIntensity: 1,
		metalness: 0.1,
		roughness: 0,
		transimission: 0.5,
		ior: 2.33,
	})
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}
