const d = document,
  w = window,
  $main = d.querySelector('main'),
  $footer = d.querySelector('footer'),
  $wrapper = d.querySelector('.wrapper'),
  $sun = d.querySelector('.sun-hidden'),
  $dialog = d.querySelector('.dialog-fixed'),
  $dialogTitle = d.querySelector('.dialog-fixed h3'),
  $dialogText = d.querySelector('.dialog-fixed p'),
  $dialogButton = $dialog.querySelector('button'),
  $eventList = d.querySelector('.event-list'),
  $eventsButton = d.querySelector('.events-button'),
  $planetClone = d.createElement('div'),
  $outlineClone = d.createElement('div'),
  $aboutFooter = d.querySelector('.about-counter'),
  $dialogSignup = d.getElementById('dialog-signup'),
  MAX_NUM_STARS = 280,
  MAX_PLANETS_MOBILE = 4,
  MOBILE_SIZE = 400,
  planets = [
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
  ],
  listEvents = [
    {
      title: 'Eclipse Solar',
      description:
        'Durante un eclipse solar la luna se interpone entre el sol y la tierra creando una gigantesca sombra temporal.',
    },
    {
      title: 'Eclipse Lunar',
      description:
        'Durante un eclipse lunar la Tierra se interpone entre el Sol y la Luna, proyectando su sombra sobre la superficie lunar. Esto causa que la Luna se oscurezca momentáneamente y adopte una tonalidad rojiza, conocida como "Luna de sangre"',
    },
  ]

let isPlanetsLoaded = false,
  isEclipseRunning = false,
  isAllContentLoaded = false,
  $earth = null,
  $moon = null,
  $listPlanets = null,
  footerInterval = null

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
  let $template = d.createElement('template'),
    planetOutlineSize = 140,
    MAX_PLANETS = planets.length,
    planetZindex = MAX_PLANETS

  const orbitIncrease = {
    ['saturn']: 30,
    ['uranus']: 30,
    ['neptune']: 15,
  }

  $outlineClone.appendChild($planetClone)
  planets.forEach((planet, index) => {
    if (w.innerWidth <= 530) MAX_PLANETS = MAX_PLANETS_MOBILE
    if (index >= MAX_PLANETS) return
    let $clone = $outlineClone.cloneNode(true),
      $img = $clone.querySelector('div')

    planetOutlineSize += orbitIncrease[planet.name] ?? 0
    $clone.style.width = `${planetOutlineSize}px`
    $clone.style.height = `${planetOutlineSize - 40}px`
    $clone.style.zIndex = planetZindex
    planetOutlineSize += 60
    planetZindex -= 1

    $img.style.backgroundImage = `url(assets/${planet.name}.png)`
    $img.style.animation = `${planet.name}-orbit ${planet.orbitTime}s linear infinite`
    $img.style.width = `${planet.size}px`
    $img.style.height = `${planet.size}px`

    $img.setAttribute('data-name-es', planet['name-es'])
    $img.setAttribute('data-number-es', planet['number-es'])
    $img.setAttribute('data-orbit', planet.orbitTime)
    $img.setAttribute('data-rotation', planet.rotationTime)
    $img.classList.add('planet-img')
    $clone.classList.add('planet-wrapper', `${planet.name}-outline`)

    $template.content.appendChild($clone)
  })
  $wrapper.appendChild($template.content)

  $earth = d.querySelector('.earth-outline .planet-img')
  $listPlanets = d.querySelectorAll('*[class$=outline]')
  $listPlanets = Array.from($listPlanets)

  $template = null
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
  $moon = $image
}
function restartEarthAnim() {
  $earth.classList.add('earth-solar-eclipse')
  $earth.style.animation = 'none'
  $moon.style.opacity = 0
  $moon.style.animation = 'none'

  setTimeout(() => {
    $earth.style.animation = `earth-orbit ${$earth.dataset.orbit}s linear infinite`
    $moon.style.animation = `moon-orbit ${$moon.dataset.orbit}s linear infinite`
    $moon.style.opacity = 1
  }, 500)
}

function changeDialogPosition({ left = false }) {
  if (!left) {
    $dialog.style.top = 'initial'
    $dialog.style.left = 'initial'
    $dialog.style.bottom = '4vh'
    $dialog.style.right = '4vh'
  } else {
    $dialog.style.top = '4vh'
    $dialog.style.left = '4vh'
    $dialog.style.bottom = 'initial'
    $dialog.style.right = 'initial'
  }
}
function toggleAllButtons({ hidde = false }) {
  if (!hidde) {
    $dialogButton.classList.remove('hidden')
    $eventsButton.classList.remove('hidden')
  } else {
    $dialogButton.classList.add('hidden')
    $eventsButton.classList.add('hidden')
  }
}
function scaleEarth() {
  if (w.innerWidth >= MOBILE_SIZE) {
    $sun.style.transform = 'translate(-50%,-50%) scale(2.5)'
    $earth.parentElement.style.transform = 'translate(-50%,-50%) scale(2)'
  } else {
    $sun.style.transform = 'translate(-50%,-50%) scale(1.5)'
    $earth.parentElement.style.transform = 'translate(-50%,-50%) scale(1.1)'
  }
}
function startDialogEvent(title, description, intervalTime) {
  let timeLeft = Math.round(intervalTime[1] / 1000) - 1,
    interval = null
  restartEarthAnim()
  scaleEarth()
  changeDialogPosition({ left: true })
  toggleAllButtons({ hidde: true })
  $dialogTitle.textContent = title
  $dialogText.textContent = description + ` (${timeLeft}s)`
  interval = setInterval(() => {
    if (timeLeft < 1) {
      clearInterval(interval)
    }
    $dialogText.textContent = description + ` (${timeLeft}s)`
    timeLeft = timeLeft - 1
  }, 1000)
  $dialog.classList.remove('hidden')
}
function dissapearWithOpacity({ listOfEl = null, hidde = true }) {
  listOfEl.forEach((el) => {
    if (hidde) {
      el.style.opacity = 0
      el.classList.add('hidden')
    } else {
      el.style.opacity = 1
      el.classList.remove('hidden')
    }
  })
}
function startSolarEclipse() {
  const { title, description } = listEvents.find((event) => {
    return event.title === 'Eclipse Solar'
  })

  const $planetsHidden = $listPlanets.filter((planet) => {
    let isEarth = planet.classList.contains('earth-outline'),
      isMoon = planet.classList.contains('moon-outline')
    return !isEarth && !isMoon
  })

  const TIME_ECLIPSE_START = 11700,
    TIME_ECLIPSE_END = 17500
  let intervalTime = [TIME_ECLIPSE_START, TIME_ECLIPSE_END]

  dissapearWithOpacity({ listOfEl: $planetsHidden })
  startDialogEvent(title, description, intervalTime)
  setTimeout(
    () => $moon.classList.add('moon-eclipse-solar'),
    TIME_ECLIPSE_START
  )

  setTimeout(() => {
    $moon.classList.remove('moon-eclipse-solar')

    $dialog.classList.add('hidden')
    $dialogTitle.textContent = ''
    $dialogText.textContent = ''
    changeDialogPosition({ left: false })

    $sun.style.transform = 'translate(-50%,-50%)'
    $earth.parentElement.style.transform = 'translate(-50%,-50%)'

    dissapearWithOpacity({ listOfEl: $planetsHidden, hidde: false })
    toggleAllButtons({ hidde: false })
    isEclipseRunning = false
  }, TIME_ECLIPSE_END)
}

function startLunarEclipse() {
  const { title, description } = listEvents.find((event) => {
    return event.title === 'Eclipse Lunar'
  })
  const $planetsHidden = $listPlanets.filter((planet) => {
    let isEarth = planet.classList.contains('earth-outline'),
      isMoon = planet.classList.contains('moon-outline')
    return !isEarth && !isMoon
  })

  const TIME_ECLIPSE_START = 24500,
    TIME_ECLIPSE_END = 27000
  let intervalTime = [TIME_ECLIPSE_START, TIME_ECLIPSE_END]

  dissapearWithOpacity({ listOfEl: $planetsHidden })
  startDialogEvent(title, description, intervalTime)
  setTimeout(
    () => $moon.classList.add('moon-eclipse-lunar'),
    TIME_ECLIPSE_START
  )
  setTimeout(() => {
    $moon.classList.remove('moon-eclipse-lunar')

    $dialog.classList.add('hidden')
    $dialogTitle.textContent = ''
    $dialogText.textContent = ''
    changeDialogPosition({ left: false })

    $sun.style.transform = 'translate(-50%,-50%)'
    $earth.parentElement.style.transform = 'translate(-50%,-50%)'

    dissapearWithOpacity({ listOfEl: $planetsHidden, hidde: false })
    toggleAllButtons({ hidde: false })
    isEclipseRunning = false
  }, TIME_ECLIPSE_END)
}
function showUpFooter(time) {
  let footerCounter = time / 1000

  footerInterval = setInterval(() => {
    $aboutFooter.textContent = ` (${footerCounter}s)`
    footerCounter -= 1
  }, 1000)

  setTimeout(() => ($footer.style.opacity = 0), time)
  setTimeout(() => {
    $footer.classList.add('hidden')
    clearInterval(footerInterval)
  }, time + 1000)
}
d.addEventListener('DOMContentLoaded', (e) => {
  const TIME_FOOTER_HIDDEN = 15000
  setTimeout(() => createSun(), 1000)
  setTimeout(() => createStars(MAX_NUM_STARS), 4000)
  setTimeout(() => createPlanets(), 8000)
  setTimeout(() => createMoon(), 10000)
  showUpFooter(TIME_FOOTER_HIDDEN)
  setTimeout(() => {
    $eventsButton.classList.remove('hidden')
    isAllContentLoaded = true
  }, TIME_FOOTER_HIDDEN + 2000)
})
d.addEventListener('click', (e) => {
  if (!isPlanetsLoaded || isEclipseRunning || !isAllContentLoaded) return
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
      if (w.innerWidth >= 900) {
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
    $eventList.classList.add('hidden')
    $eventsButton.textContent = 'Simular eventos 🕹️'
    startLunarEclipse()
  }
  if (e.target.matches('#signup-button')) {
    if ($dialogSignup.open) {
      $dialogSignup.close()
    } else {
      $dialogSignup.showModal()
    }
  }
})
