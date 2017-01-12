function Canvas (name) {
  this.ctx = null
  this.canvas = null
  this.CANVAS_ID = name
}

Canvas.prototype.getCanvas = function () {
  return document.getElementById(this.CANVAS_ID)
}

Canvas.prototype.getCursorPosition = function (canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  return { x, y }
}

Canvas.prototype.init = function () {
  this.ctx = this.getContext("2d")
  this.canvas = this.getCanvas()

  return this
}
