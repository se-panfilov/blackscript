const resizer = (function (drawFn) {
  const canvas = document.getElementById('canvas')
  // context = canvas.getContext('2d')

  window.addEventListener('resize', resizeCanvas, false)

  function resizeCanvas () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    drawFn()
  }

  resizeCanvas()

  function drawStuff () {
    // do your drawing stuff here
  }
})(drawFn);