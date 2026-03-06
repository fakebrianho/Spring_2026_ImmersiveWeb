import gsap from 'gsap'

export function gsapText(index) {
	const text = document.querySelectorAll('.info')
	gsap.to(text[index], {
		opacity: 1,
		duration: 1,
		ease: 'power1',
	})
    gsap.to(text, {
        opacity: (i) => (i === index ? 1 : 0),
        duration: 0.6,
        ease: 'power1.out',
        overwrite: 'auto',
      })

}
