const d = document,
	w = window,
	$main = d.querySelector('main'),
	$wrapper = d.querySelector('.wrapper'),
	$sun = d.querySelector('.sun-hidden'),
	$dialog = d.querySelector('.dialog-fixed'),
	$dialogTitle = d.querySelector('.dialog-fixed h3'),
	$dialogText = d.querySelector('.dialog-fixed p'),
	$eventList = d.querySelector('.event-list'),
	$eventsButton = d.querySelector('.events-button')

const NUM_STARS = 280
let isPlanetsLoaded = false,
	isEclipseRunning = false

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
		$clone.style.height = `${planetOutlineSize - 40}px`
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
		$img.classList.add('planet-img')

		$template.content.appendChild($clone)
	})
	$wrapper.appendChild($template.content)
	isPlanetsLoaded = true
}

function createMoon() {
	const $earth = d.querySelector('.earth-outline div'),
		$outline = d.createElement('div'),
		$image = d.createElement('div')

	const description = {
		['name-es']: 'La Luna',
		size: 10,
		orbitTime: 27.3,
		rotationTime: 27.3,
	}

	$outline.classList.add('moon-outline')
	$image.style.backgroundImage = 'url(assets/moon.png)'
	$image.style.width = `${description.size}px`
	$image.style.height = `${description.size}px`
	$image.style.animation = `moon-orbit ${description.orbitTime}s linear infinite`
	$image.setAttribute('data-name', description['name-es'])
	$image.setAttribute('data-orbit', description.orbitTime)
	$image.setAttribute('data-rotation', description.rotationTime)

	$outline.appendChild($image)
	$earth.appendChild($outline)
}

function startSolarEclipse() {
	const $earth = d.querySelector('.earth-outline .planet-img'),
		$moon = d.querySelector('.moon-outline div'),
		$dialogButton = $dialog.querySelector('button')

	$eventsButton.classList.add('hidden')
	$earth.classList.add('earth-solar-eclipse')
	$earth.style.animation = 'none'
	$moon.style.opacity = 0
	$moon.style.animation = 'none'
	setTimeout(() => {
		$earth.style.animation = `earth-orbit ${$earth.dataset.orbit}s linear infinite`
		$moon.style.animation = `moon-orbit ${$moon.dataset.orbit}s linear infinite`
		$moon.style.opacity = 1
	}, 500)

	$dialogTitle.textContent = 'Eclipse Solar'
	$dialogText.textContent =
		'Durante un eclipse solar la luna se interpone entre el sol y la tierra creando una gigantesca sombra temporal.'
	$dialogButton.classList.add('hidden')
	$eventsButton.classList.add('hidden')
	$dialog.classList.remove('hidden')

	setTimeout(() => {
		$moon.classList.add('moon-eclipse-solar')
	}, 11700)

	setTimeout(() => {
		$moon.classList.remove('moon-eclipse-solar')
		$dialogTitle.textContent = ''
		$dialogText.textContent = ''
		$dialog.classList.add('hidden')
		$dialogButton.classList.remove('hidden')
		$eventsButton.classList.remove('hidden')
		isEclipseRunning = false
	}, 17500)
}

d.addEventListener('DOMContentLoaded', (e) => {
	setTimeout(() => createSun(), 1000)
	setTimeout(() => createStars(NUM_STARS), 4000)
	setTimeout(() => createPlanets(), 8000)
	setTimeout(() => createMoon(), 10000)
	setTimeout(() => $eventsButton.classList.remove('hidden'), 12000)
})
d.addEventListener('click', (e) => {
	if (!isPlanetsLoaded || isEclipseRunning) return
	if (e.target.matches('.planet-img') || e.target.matches('.moon-outline')) {
		const planet = e.target.matches('.moon-outline')
			? e.target.parentElement.dataset
			: e.target.dataset
		const name = planet.nameEs
		const number = planet.numberEs
		const orbitTime = planet.orbit
		const rotationTime = planet.rotation
		const day = rotationTime <= 1 ? 'día' : 'días'

		$dialogTitle.textContent = name
		$dialogText.textContent = `Es el ${number} planeta del sistema solar, tarda ${orbitTime} días en orbitar el sol y ${rotationTime} ${day} en rotar sobre su propio eje.`
		$eventsButton.classList.add('hidden')
		$dialog.classList.remove('hidden')
	}
	if (e.target.closest('.sun')) {
		const sun = e.target.dataset
		$dialogTitle.textContent = 'El sol'
		$dialogText.textContent = `Es la estrella más grande de nuestro sistema solar, compuesta principalmente de hidrogeno y helio. Tarda aproximadamente ${sun.rotation} días en rotar sobre su propio eje.`
		$eventsButton.classList.add('hidden')
		$dialog.classList.remove('hidden')
	}
	if (e.target.matches('.moon-outline div')) {
		const moon = e.target.dataset
		$dialogTitle.textContent = 'La Luna'
		$dialogText.textContent = `Es el único satélite natural de la Tierra y es uno de los objetos más familiares en el cielo nocturno. Tarda aproximadamente ${moon.orbit} días en orbitar la tierra y ${moon.rotation} días en rotar sobre su propio eje.`
		$eventsButton.classList.add('hidden')
		$dialog.classList.remove('hidden')
	}
	if (e.target.matches('.dialog-fixed button')) {
		$dialog.classList.add('hidden')
		$eventsButton.classList.remove('hidden')
	}
	if (e.target.matches('.events-button')) {
		if ($eventList.classList.contains('hidden')) {
			e.target.textContent = 'Cerrar'
			$eventList.classList.remove('hidden')
			if (window.innerWidth >= 900) {
				e.target.classList.add('hidden')
			}
		} else {
			e.target.textContent = 'Simular eventos 🕹️'
			$eventList.classList.add('hidden')
		}
	}
	if (e.target.matches('.events-button-list')) {
		$eventsButton.textContent = 'Simular eventos 🕹️'
		$eventList.classList.add('hidden')
		$eventsButton.classList.remove('hidden')
	}
	if (e.target.matches('#solar-eclipse-button')) {
		isEclipseRunning = true
		$eventList.classList.add('hidden')
		$eventsButton.textContent = 'Simular eventos 🕹️'
		startSolarEclipse()
	}
	if (e.target.matches('#lunar-eclipse-button')) {
		isEclipseRunning = true
		$dialogTitle.textContent = 'Eclipse lunar'
		$dialogText.textContent = 'Disponible proximamante...'
		$eventList.classList.add('hidden')
		$eventsButton.classList.add('hidden')
		$dialog.querySelector('button').classList.add('hidden')
		$dialog.classList.remove('hidden')
		setTimeout(() => {
			$eventsButton.classList.remove('hidden')
			$eventsButton.textContent = 'Simular eventos 🕹️'
			$dialog.querySelector('button').classList.remove('hidden')
			$dialog.classList.add('hidden')
			isEclipseRunning = false
		}, 3000)
	}
})
