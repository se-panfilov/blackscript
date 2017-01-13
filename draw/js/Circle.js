const Circle = (function () {
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
    shapeObj.props.area = this.getArea(shapeObj.props.radius)

    return shapeObj
  }

  Circle.prototype.getRadius = function (area) {
    return Math.sqrt(area / Math.PI)
  }

  Circle.prototype.getArea = function (radius) {
    return Math.PI * Math.pow(radius, 2)
  }

  Circle.prototype.addPoint = function ({ x, y }) {
    this.data.points.o = { x, y }
  }

  return Circle
}());