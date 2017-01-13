const resizer = (function (main) {
  const canvas = document.getElementById('canvas')
  // context = canvas.getContext('2d')

  window.addEventListener('resize', resizeCanvas, false)

  function resizeCanvas () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    main.redraw()
  }

  resizeCanvas()

  function drawStuff () {
    // do your drawing stuff here
  }
})(main);