export function maze(x, y) {
  var n = x * y - 1
  if (n < 0) {
    return
  }
  var horiz = []
  for (var j = 0; j < x + 1; j++) horiz[j] = []
  var verti = []
  for (var j = 0; j < y + 1; j++) verti[j] = []
  var here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)]
  var path = [here]
  var unvisited = []
  let next
  for (var j = 0; j < x + 2; j++) {
    unvisited[j] = []
    for (var k = 0; k < y + 1; k++)
      unvisited[j].push(
        j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1)
      )
  }
  while (0 < n) {
    var potential = [
      [here[0] + 1, here[1]],
      [here[0], here[1] + 1],
      [here[0] - 1, here[1]],
      [here[0], here[1] - 1],
    ]
    var neighbors = []
    for (var j = 0; j < 4; j++)
      if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
        neighbors.push(potential[j])
    if (neighbors.length) {
      n = n - 1
      next = neighbors[Math.floor(Math.random() * neighbors.length)]
      unvisited[next[0] + 1][next[1] + 1] = false
      if (next[0] == here[0]) horiz[next[0]][(next[1] + here[1] - 1) / 2] = true
      else verti[(next[0] + here[0] - 1) / 2][next[1]] = true
      path.push((here = next))
    } else here = path.pop()
  }
  return { x: x, y: y, horiz: horiz, verti: verti }
}

export function display(m) {
  var text = []
  for (var j = 0; j < m.x * 2 + 1; j++) {
    var line = []
    if (0 == j % 2)
      for (var k = 0; k < m.y * 4 + 1; k++)
        if (0 == k % 4) line[k] = '+'
        else if (j > 0 && m.verti[j / 2 - 1][Math.floor(k / 4)]) line[k] = ' '
        else line[k] = '-'
    else
      for (var k = 0; k < m.y * 4 + 1; k++)
        if (0 == k % 4)
          if (k > 0 && m.horiz[(j - 1) / 2][k / 4 - 1]) line[k] = ' '
          else line[k] = '|'
        else line[k] = ' '
    if (0 == j) line[1] = line[2] = line[3] = ' '
    if (m.x * 2 - 1 == j) line[4 * m.y] = ' '
    text.push(line.join('') + '\r\n')
  }
  return text.join('')
}

/**
 *
 * @param {*} m
 * @param {CanvasRenderingContext2D} context
 * @param {Canvas} canvas
 */
export function displayCanvas(m, context, canvas) {
  const width = canvas.width
  const height = canvas.height
  const minLen = Math.min(width, height)
  const size = minLen / m.x
  const offsetX = (width - minLen) / 2
  const offsetY = (height - minLen) / 2

  for (let i = 0; i < m.x; i++) {
    for (let j = 0; j < m.y; j++) {
      if (!m.verti[j][i]) {
        context.moveTo(offsetX + i * size, offsetY + (j + 1) * size)
        context.lineTo(offsetX + (i + 1) * size, offsetY + (j + 1) * size)
      }
      if (!m.horiz[j][i]) {
        context.moveTo(offsetX + (i + 1) * size, offsetY + j * size)
        context.lineTo(offsetX + (i + 1) * size, offsetY + (j + 1) * size)
      }
    }
  }
  context.moveTo(0 + offsetX, minLen + offsetY)
  context.lineTo(0 + offsetX, 0 + offsetY)
  context.lineTo(minLen + offsetX, 0 + offsetY)
  context.stroke()
}
