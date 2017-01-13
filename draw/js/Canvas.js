const Canvas = (function () {
  function Canvas (name) {
    this.ctx = null
    this.cnv = null
    this.CANVAS_ID = name
  }

  Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
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
    const canvas = this.getCanvas()
    this.cnv = canvas
    this.ctx = canvas.getContext("2d")

    return this
  }

  return Canvas
}());