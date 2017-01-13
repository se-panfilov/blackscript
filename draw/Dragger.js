const Dragger = (function () {
  function Dragger () {
    this.coords = {
      x: null,
      y: null
    }
    this.isMouseDown = false
  }

  Dragger.prototype.onMouseDown = function (event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    let mouseX = parseInt(event.clientX - x)
    let mouseY = parseInt(event.clientY - y)

    this.coords.x = mouseX
    this.coords.y = mouseY

    this.isMouseDown = true
  }

  Dragger.prototype.onMouseUp = function (event) {
    this.isMouseDown = false
  }

  Dragger.prototype.onMouseMove = function (event, objs) {
    if (!this.isMouseDown) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    let mouseX = parseInt(event.clientX - x)
    let mouseY = parseInt(event.clientY - y)

    // for each obj in the objs array
    // use context.isPointInPath to test if it’s being dragged

    for (let i = 0; i < objs.length; i++) {
      let obj = objs[i]
      drawObj(obj)
      if (ctx.isPointInPath(lastX, lastY)) {

        // if this obj’s being dragged,
        // move it by the change in mouse position from lastXY to currentXY

        obj.x += (mouseX - this.coords.x )
        obj.y += (mouseY - this.coords.y)
        obj.right = obj.x + obj.width
        obj.bottom = obj.y + obj.height
      }
    }

    // update the lastXY to the current mouse position
    this.coords.x = mouseX
    this.coords.y = mouseY

    // draw all ships in their new positions
    drawAllObjs()
  }
  return Dragger
}())