const d = document,
	w = window,
	$main = d.querySelector('main'),
	$wrapper = d.querySelector('.wrapper'),
	$wrapperEarth = d.createElement('div'),
	$earth = d.createElement('img'),
	$moon = d.createElement('img'),
	$sun = d.createElement('img')

function createStars(numStars) {
	const colors = ['#FFD700', '#FFA500', '#FF4500', '#fff']
	const numStarsWithColor = Math.floor(numStars * 0.05)

	for (let i = 0; i < numStars; i++) {
		const $star = d.createElement('div')
		$star.classList.add('star')
		$star.classList.add('star-twinkle')
		$star.style.left = `${Math.random() * 100}%`
		$star.style.top = `${Math.random() * 100}%`
		$star.style.animationDelay = `${Math.random() * 5}s`

		if (i < numStarsWithColor) {
			const randomColor = colors[Math.floor(Math.random() * colors.length)]
			$star.style.backgroundColor = randomColor
		}
		$main.appendChild($star)
	}
}

function createMoon() {
	$moon.classList.add('moon')
	$moon.src = '../assets/moon.png'
	$wrapperEarth.appendChild($moon)
}

function createEarth() {
	$wrapper.appendChild($wrapperEarth)
	$earth.classList.add('earth')
	$earth.src = '../assets/earth.png'
	$wrapperEarth.classList.add('wrapper-earth')
	$wrapperEarth.appendChild($earth)
}

function createSun() {
	$sun.classList.add('sun')
	$sun.src = '../assets/sun.png'
	$wrapper.appendChild($sun)
}

function rotateEarth() {
	const sun = $sun.getBoundingClientRect()
	const wrapper = $wrapper.getBoundingClientRect()
	const centerPlanetX = sun.left - sun.right
}

d.addEventListener('DOMContentLoaded', (e) => {
	createStars(280)
	createSun()
	createEarth()
	createMoon()
	rotateEarth()
})

d.addEventListener('visibilitychange', (e) => {
	$main.querySelectorAll('star-twinkle').forEach((el) => {
		if (d.hidden) {
			el.classList.remove('star-twinkle')
		} else {
			el.classList.add('star-twinkle')
		}
	})
})
