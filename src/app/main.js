import { maze, display, displayCanvas } from './maze'

const m = maze(50, 50)
console.log(m)
// console.log(display(m))

const context = c.getContext('2d')
const w = window.innerWidth - 20
const h = window.innerHeight - 20
c.width = w
c.height = h

let screen = 1

const loop = e => {
  switch (screen) {
    case 0: // Main menu
      break
    case 1: // Game screen
      context.clearRect(0, 0, w, h)
      displayCanvas(m, context, c)
      moveChar()
      break
    case 2: // Game over
      break
  }
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

onclick = e => {
  const x = e.pageX
  const y = e.pageY
  switch (screen) {
    case 0: // Main menu
      break
    case 1: // Game screen
      break
    case 2: // Game over
      break
  }
}

const keys = {}
onkeydown = e => t(e, 1)
onkeyup = e => t(e)
const t = (e, v, l, i) => {
  for (i in (l = {
    u: [38, 90, 87],
    r: [39, 68],
    d: [40, 83],
    l: [37, 65, 81],
  }))
    if (l[i].includes(e.keyCode)) keys[i] = v
}

const charPos = { x: 0, y: 0 }
function moveChar() {
  if (keys.r) {
    charPos.x++
  }
  if (keys.l) {
    charPos.x--
  }
  if (keys.u) {
    charPos.y--
  }
  if (keys.d) {
    charPos.y++
  }
  context.beginPath()
  context.arc(charPos.x, charPos.y, 10, 0, 2 * Math.PI)
  context.closePath()
  context.fillStyle = '#ff0000'
  context.fill()
}
