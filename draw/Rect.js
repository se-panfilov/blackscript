function RECT () {
  this.data = {}
  this.data.points = {}
  this.data.props = {}
}

RECT.prototype.addPoint = function ({ x, y }) {
  if (!this.data.points.a) this.data.points.a = { x, y }
  else if (!this.data.points.b) this.data.points.b = { x, y }
  else if (!this.data.points.c) this.data.points.c = { x, y }
  else if (!this.data.points.d) this.data.points.d = { x, y }
}

RECT.prototype.getLength = function (begin, end) {
  return Math.sqrt(Math.pow(end.x - begin.x, 2) + Math.pow(end.y - begin.y, 2))
}

RECT.prototype.getClosestPoint = function (coords) {
  const arr = []

  for (let prop in this.data.points) {
    if (this.data.points.hasOwnProperty(prop)) {
      arr.push({ name: prop, val: this.getLength(this.data.points[prop], coords) })
    }
  }

  console.info(arr.sort((a, b) => a.val - b.val)[0])
  return arr.sort((a, b) => a.val - b.val)[0].name
}

RECT.prototype.getSideLength = function (begin, end) {
  return Math.sqrt(Math.pow(end.x - begin.x, 2) + Math.pow(end.y - begin.y, 2))
}

RECT.prototype.getAngle = function (start, end, center) {
  const startToCenter = this.getSideLength(start, center)
  const endToCenter = this.getSideLength(end, center)
  const startToEnd = this.getSideLength(start, end)
  const angle = Math.acos((endToCenter * endToCenter + startToCenter * startToCenter - startToEnd * startToEnd) / (2 * endToCenter * startToCenter))

  return angle * (180 / Math.PI)
}

RECT.prototype.getRadians = function (degrees) {
  return degrees * (Math.PI / 180)
}

RECT.prototype.getArea = function (ab, bc, alpha) {
  //   return ((ac / 2) * bd) * Math.sin(this.getRadians(alpha))
  return ab * bc * Math.sin(this.getRadians(alpha))
}

RECT.prototype.build = function (obj) {
  const shapeObj = {}
  Object.assign(shapeObj, obj)

  //Get 4-th point
  shapeObj.points.d = this.getLastPoint(obj.points)

  //Center
  shapeObj.props.o = this.getCenter(shapeObj.points)

  //Area
  const alphaAngle = shapeCounting.common.getAngle(shapeObj.points.b, shapeObj.points.d, shapeObj.points.a)
  shapeObj.props.area = this.getArea(shapeObj.points, alphaAngle)

  return shapeObj
}
RECT.prototype.getLastPoint = function ({ a, b, c }) {
  const dX = a.x - b.x + c.x
  const dY = a.y - b.y + c.y

  return { x: dX, y: dY }
}
RECT.prototype.getArea = function ({ a, b, c }, angle) {
  const ab = shapeCounting.common.getSideLength(a, b)
  const bc = shapeCounting.common.getSideLength(b, c)
  return shapeCounting.common.getArea(ab, bc, angle)
}
RECT.prototype.getCenter = function ({ c, a }) {
  return { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 }
}