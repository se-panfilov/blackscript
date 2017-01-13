const Dragger = (function () {
  function Dragger (canvas, obj = {}) {
    this.canvas = canvas
    this.draggableObjects = obj
    this.closestObjName = null
    this.coords = {
      x: null,
      y: null
    }
    this.isMouseDown = false
  }

  // TODO (S.Panfilov) possible duplicate (rect)
  Dragger.prototype.getLength = function (begin, end) {
    return Math.sqrt(Math.pow(end.x - begin.x, 2) + Math.pow(end.y - begin.y, 2))
  }

  Dragger.prototype.getClosestPoint = function (position) {
    const arr = []

    for (let prop in this.draggableObjects) {
      if (this.draggableObjects.hasOwnProperty(prop)) {
        arr.push({ name: prop, val: this.getLength(this.draggableObjects[prop], position) })
      }
    }

    return arr.sort((a, b) => a.val - b.val)[0].name
  }

  Dragger.prototype.onMouseDown = function (event) {
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    this.coords.x = x
    this.coords.y = y
    this.isMouseDown = true

    this.closestObjName = this.getClosestPoint({ x, y })
    return this.closestObjName
  }

  Dragger.prototype.onMouseUp = function () {
    this.isMouseDown = false
  }

  Dragger.prototype.onMouseMove = function (event, cb) {
    if (!this.isMouseDown) return

    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    this.draggableObjects[this.closestObjName].x = x
    this.draggableObjects[this.closestObjName].y = y

    this.coords.x = x
    this.coords.y = y

    return cb(this.draggableObjects)
  }

  return Dragger
}())