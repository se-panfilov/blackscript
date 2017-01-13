function Circle () {
  this.data = {
    points: {},
    props: {}
  }
}

Circle.prototype.setData = function (obj) {
  this.data = obj
}

Circle.prototype.build = function (obj, radius) {
  const shapeObj = {}
  Object.assign(shapeObj, obj || this.data)
  shapeObj.props.radius = radius || this.data.props.radius

  return shapeObj
}

Circle.prototype.getRadius = function (area) {
  return Math.sqrt(area / Math.PI)
}

Circle.prototype.addPoint = function ({ x, y }) {
  this.data.points.o = { x, y }
}