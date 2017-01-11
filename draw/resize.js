(function(drawFn, utils) {
  const canvas = utils.getCanvas()
    // context = canvas.getContext('2d')

  window.addEventListener('resize', resizeCanvas, false)

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    drawFn()
  }
  resizeCanvas()

  function drawStuff() {
    // do your drawing stuff here
  }
})(drawFn, utils);