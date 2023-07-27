const d = document,
	w = window,
	$main = d.querySelector('main'),
	$wrapper = d.querySelector('.wrapper'),
	$sun = d.querySelector('.sun-hidden'),
	$dialog = d.querySelector('.dialog-fixed')

const NUM_STARS = 280
let isPlanetsLoaded = false

function createSun() {
	$sun.classList.remove('sun-hidden')
	$sun.classList.add('sun')
	$sun.setAttribute('data-rotation', '25 a 36')
}

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
			['number-es']: 'primer',
			['name-es']: 'Mercurio',
			size: 15,
			orbitTime: 88,
			rotationTime: 58.6,
		},
		{
			name: 'venus',
			['number-es']: 'segundo',
			['name-es']: 'Venus',
			size: 20,
			orbitTime: 225,
			rotationTime: 243,
		},
		{
			name: 'earth',
			['number-es']: 'tercer',
			['name-es']: 'La Tierra',
			size: 30,
			orbitTime: 365.25,
			rotationTime: 1,
		},
		{
			name: 'mars',
			['number-es']: 'cuarto',
			['name-es']: 'Marte',
			size: 25,
			orbitTime: 687,
			rotationTime: 1.03,
		},
		{
			name: 'jupiter',
			['number-es']: 'quinto',
			['name-es']: 'Júpiter',
			size: 40,
			orbitTime: 4362,
			rotationTime: 0.41,
		},
		{
			name: 'saturn',
			['number-es']: 'sexto',
			['name-es']: 'Saturno',
			size: 35,
			orbitTime: 10759,
			rotationTime: 0.45,
		},
		{
			name: 'uranus',
			['number-es']: 'séptimo',
			['name-es']: 'Urano',
			size: 30,
			orbitTime: 30687,
			rotationTime: 0.72,
		},
		{
			name: 'neptune',
			['number-es']: 'octavo',
			['name-es']: 'Neptuno',
			size: 25,
			orbitTime: 60190,
			rotationTime: 0.67,
		},
	]

	const $template = d.createElement('template')
	let planetOutlineSize = 140
	let MAX_PLANETS = planets.length

	const $planet = d.createElement('div'),
		$outline = d.createElement('div'),
		$name = d.createElement('p')

	//	$planet.appendChild($name)
	$outline.appendChild($planet)

	let planetZindex = planets.length
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
		$clone.style.height = `${planetOutlineSize - 20}px`
		planetOutlineSize += 60

		$clone.style.zIndex = planetZindex
		planetZindex -= 1

		let $img = $clone.querySelector('div')
		$img.style.backgroundImage = `url(assets/${planet.name}.png)`

		$img.style.animation = `${planet.name}-orbit ${planet.orbitTime}s linear infinite`

		$img.style.width = `${planet.size}px`
		$img.style.height = `${planet.size}px`
		$img.setAttribute('data-name-es', planet['name-es'])

		$img.setAttribute('data-number-es', planet['number-es'])
		$img.setAttribute('data-orbit', planet.orbitTime)
		$img.setAttribute('data-rotation', planet.rotationTime)

		// let name = $clone.querySelector('p')
		// name.textContent = planet.name
		$template.content.appendChild($clone)
	})
	$wrapper.appendChild($template.content)
	isPlanetsLoaded = true
}

d.addEventListener('DOMContentLoaded', (e) => {
	setTimeout(() => createSun(), 1000)
	setTimeout(() => createStars(NUM_STARS), 4000)
	setTimeout(() => createPlanets(), 8000)
})
d.addEventListener('click', (e) => {
	if (!isPlanetsLoaded) return
	if (e.target.closest('.planet-wrapper div')) {
		const $title = $dialog.querySelector('h3')
		const $text = $dialog.querySelector('p')
		const planet = e.target.dataset
		$title.classList.add('opacity-off')
		$text.classList.add('opacity-off')

		const name = planet.nameEs
		const number = planet.numberEs
		const orbitTime = planet.orbit
		const rotationTime = planet.rotation
		const day = rotationTime <= 1 ? 'día' : 'días'

		setTimeout(() => {
			$title.textContent = name
			$text.textContent = `Es el ${number} planeta del sistema solar, tarda ${orbitTime} días en orbitar el sol y ${rotationTime} ${day} en rotar sobre su propio eje.`
			$title.classList.remove('opacity-off')
			$text.classList.remove('opacity-off')
		}, 500)
		$dialog.classList.remove('hidden')
	}
	if (e.target.matches('.sun')) {
		const $title = $dialog.querySelector('h3')
		const $text = $dialog.querySelector('p')
		$title.classList.add('opacity-off')
		$text.classList.add('opacity-off')
		const sun = e.target.dataset

		setTimeout(() => {
			$title.textContent = 'El sol'
			$text.textContent = `Es la estrella más grande de nuestro sistema solar, compuesta principalmente de hidrogeno y helio. Tarda aproximadamente ${sun.rotation} días en rotar sobre su propio eje.`
			$title.classList.remove('opacity-off')
			$text.classList.remove('opacity-off')
		}, 500)
		$dialog.classList.remove('hidden')
	}
	if (e.target.matches('.dialog-fixed button')) {
		$dialog.classList.add('hidden')
	}
})
