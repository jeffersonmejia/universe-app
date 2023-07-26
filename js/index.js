const d = document,
	w = window,
	$main = d.querySelector('main'),
	$wrapper = d.querySelector('.wrapper'),
	$sun = d.querySelector('.sun-hidden')

const ORBIT_TIME_DIFFERENCE = 10

function createStars(numStars) {
	const colors = ['#FFD700', '#FFA500', '#FF4500', '#fff']
	const numStarsWithColor = Math.floor(numStars * 0.05)
	const $template = d.createElement('template')

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
		$template.content.appendChild($star)
	}
	$main.appendChild($template.content)
}

function createPlanets() {
	const planets = [
		{
			name: 'mercury',
			size: 15,
			orbitTime: 88,
		},
		{
			name: 'venus',
			size: 20,
			orbitTime: 225,
		},
		{
			name: 'earth',
			size: 30,
			orbitTime: 365,
		},
		{
			name: 'mars',
			size: 25,
			orbitTime: 687,
		},
		{
			name: 'jupiter',
			distance: [0, 1],
			size: 40,
			orbitTime: 4362,
		},
		{
			name: 'saturn',
			distance: [0, 1],
			size: 35,
			orbitTime: 10759,
		},
		{
			name: 'uranus',
			distance: [0, 1],
			size: 30,
			orbitTime: 30687,
		},
		{
			name: 'neptune',
			distance: [0, 1],
			size: 25,
			orbitTime: 60190,
		},
	]
	const $planet = d.createElement('div'),
		$outline = d.createElement('div'),
		$name = d.createElement('p')

	$planet.appendChild($name)
	$outline.appendChild($planet)
	const $template = d.createElement('template')
	let planetOutlineSize = 140

	let MAX_PLANETS = planets.length
	planets.forEach((planet, index) => {
		if (window.innerWidth <= 530) MAX_PLANETS = 4

		if (index >= MAX_PLANETS) return
		let $clone = $outline.cloneNode(true)

		$clone.classList.add('planet-wrapper', `${planet.name}-outline`)

		if (planet.name === 'saturn' || planet.name === 'uranus') {
			planetOutlineSize += 30
		}
		if (planet.name === 'neptune') {
			planetOutlineSize += 15
		}
		$clone.style.width = `${planetOutlineSize}px`
		$clone.style.height = `${planetOutlineSize}px`
		planetOutlineSize += 60

		let $img = $clone.querySelector('div')
		$img.style.backgroundImage = `url(../assets/${planet.name}.png)`

		$img.style.animation = `${planet.name}-orbit ${planet.orbitTime}s linear infinite`

		$img.style.width = `${planet.size}px`
		$img.style.height = `${planet.size}px`
		$img.setAttribute('arial-label', planet.orbitTime)

		// let name = $clone.querySelector('p')
		// name.textContent = planet.name
		$template.content.appendChild($clone)
	})
	$wrapper.appendChild($template.content)
}

d.addEventListener('DOMContentLoaded', (e) => {
	setTimeout(() => {
		$sun.classList.remove('sun-hidden')
		$sun.classList.add('sun')
	}, 1000)
	setTimeout(() => createStars(280), 4000)
	setTimeout(() => createPlanets(), 8000)
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
