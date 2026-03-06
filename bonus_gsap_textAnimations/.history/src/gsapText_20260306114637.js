import gsap from 'gsap'

export function gsapText(index) {
	const text = document.querySelectorAll('.info')
	gsap.to(text[index], {
		opacity: 1,
		duration: 1,
		ease: 'power1',
	})
    
}
