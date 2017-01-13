function CIRCLE () {
  this.data = {}
  this.data.points = {}
  this.data.props = {}
}

CIRCLE.prototype.build = function (obj, radius) {
  const shapeObj = {}
  Object.assign(shapeObj, obj)
  shapeObj.props.radius = radius

  return shapeObj
}

CIRCLE.prototype.getRadius = function (area) {
  return Math.sqrt(area / Math.PI)
}

CIRCLE.prototype.addPoint = function ({ x, y }) {
  this.data.points.o = { x, y }
}