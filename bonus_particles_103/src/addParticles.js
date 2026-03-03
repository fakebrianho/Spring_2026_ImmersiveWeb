import * as THREE from 'three'

export function addParticles() {
	const count = 1000

	const positions = new Float32Array(count * 3)
	const baseX = new Float32Array(count)
	const baseZ = new Float32Array(count)
	const sineAmp = new Float32Array(count)
	const sineFreq = new Float32Array(count)

	const tLoader = new THREE.TextureLoader()
	const particlesTexture = tLoader.load('/10.png')
	particlesTexture.colorSpace = THREE.SRGBColorSpace

	for (let i = 0; i < count; i++) {
		const i3 = i * 3

		baseX[i] = (Math.random() - 0.5) * 16
		baseZ[i] = (Math.random() - 0.5) * 16
		positions[i3] = baseX[i]
		positions[i3 + 1] = (Math.random() - 0.5) * 10
		positions[i3 + 2] = baseZ[i]

		sineAmp[i] = 0.3 + Math.random() * 0.6
		sineFreq[i] = 0.3 + Math.random() * 0.8
	}

	const geometry = new THREE.BufferGeometry()
	const positionAttr = new THREE.BufferAttribute(positions, 3)
	positionAttr.setUsage(THREE.DynamicDrawUsage)
	geometry.setAttribute('position', positionAttr)

	const material = new THREE.PointsMaterial({
		color: 0xffffff,
		size: 0.1,
		map: particlesTexture,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
	})

	const points = new THREE.Points(geometry, material)

	points.userData = {
		count,
		positions,
		baseX,
		baseZ,
		sineAmp,
		sineFreq,
		positionAttr,
	}

	return points
}
