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

  Dragger.prototype.onMouseMove = function (event, drawCb) {
    if (!this.isMouseDown) return

    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // let mouseX = parseInt(event.clientX - x)
    // let mouseY = parseInt(event.clientY - y)

    this.draggableObjects[this.closestObjName].x = x
    this.draggableObjects[this.closestObjName].y = y

    // for each obj in the objs array
    // use context.isPointInPath to test if it’s being dragged

    // for (let i = 0; i < objs.length; i++) {
    //   let obj = objs[i]
    //   drawObj(obj)
    //   if (ctx.isPointInPath(lastX, lastY)) {
    //
    //     // if this obj’s being dragged,
    //     // move it by the change in mouse position from lastXY to currentXY
    //
    //     obj.x += (mouseX - this.coords.x )
    //     obj.y += (mouseY - this.coords.y)
    //     obj.right = obj.x + obj.width
    //     obj.bottom = obj.y + obj.height
    //   }
    // }

    // update the lastXY to the current mouse position
    // this.coords.x = mouseX
    this.coords.x = x
    // this.coords.y = mouseY
    this.coords.y = y

    // console.info( this.draggableObjects.b.x)
    return this.draggableObjects

    // draw all ships in their new positions
    // drawCb()
  }

  return Dragger
}())