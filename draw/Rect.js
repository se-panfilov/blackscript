const Rect = (function () {
    function Rect () {
      this.data = {
        points: {},
        props: {}
      }
    }

    const POINTS = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    }

    Rect.prototype.setData = function (obj) {
      this.data = obj
    }

    Rect.prototype.addPoint = function ({ x, y }) {
      if (!this.data.points.a) return this.setPointA({ x, y })
      if (!this.data.points.b) return this.setPointB({ x, y })
      if (!this.data.points.c) return this.setPointC({ x, y })
      if (!this.data.points.d) return this.setPointD({ x, y })
      throw new Error('RECT: To much points')
    }

    Rect.prototype.setPoint = function (name, { x, y }) {
      this.data.points[name] = { x, y }
    }

    Rect.prototype.setPointA = function ({ x, y }) {
      this.setPoint(POINTS.a, { x, y })
    }

    Rect.prototype.setPointB = function ({ x, y }) {
      this.setPoint(POINTS.b, { x, y })
    }

    Rect.prototype.setPointC = function ({ x, y }) {
      this.setPoint(POINTS.c, { x, y })
    }

    Rect.prototype.setPointD = function ({ x, y }) {
      this.setPoint(POINTS.d, { x, y })
    }

    Rect.prototype.getLength = function (begin, end) {
      return Math.sqrt(Math.pow(end.x - begin.x, 2) + Math.pow(end.y - begin.y, 2))
    }

    Rect.prototype.getClosestPoint = function (position) {
      const arr = []

      for (let prop in this.data.points) {
        if (this.data.points.hasOwnProperty(prop)) {
          arr.push({ name: prop, val: this.getLength(this.data.points[prop], position) })
        }
      }

      console.info(arr.sort((a, b) => a.val - b.val)[0])
      return arr.sort((a, b) => a.val - b.val)[0].name
    }

    Rect.prototype.getSideLength = function (begin, end) {
      return Math.sqrt(Math.pow(end.x - begin.x, 2) + Math.pow(end.y - begin.y, 2))
    }

    Rect.prototype.getAngle = function (start, end, center) {
      const startToCenter = this.getSideLength(start, center)
      const endToCenter = this.getSideLength(end, center)
      const startToEnd = this.getSideLength(start, end)
      const angle = Math.acos((endToCenter * endToCenter + startToCenter * startToCenter - startToEnd * startToEnd) / (2 * endToCenter * startToCenter))

      return angle * (180 / Math.PI)
    }

    Rect.prototype.getRadians = function (degrees) {
      return degrees * (Math.PI / 180)
    }

    Rect.prototype.getArea = function (ab, bc, alpha) {
      return ab * bc * Math.sin(this.getRadians(alpha))
    }

    Rect.prototype.build = function (obj) {
      const shapeObj = {}
      Object.assign(shapeObj, obj || this.data)

      //Get 4-th point
      shapeObj.points.d = this.getLastPoint(shapeObj.points)

      //Center
      shapeObj.props.o = this.getCenter(shapeObj.points)

      //Area
      const alphaAngle = this.getAngle(shapeObj.points.b, shapeObj.points.d, shapeObj.points.a)
      const ab = this.getSideLength(shapeObj.points.a, shapeObj.points.b)
      const bc = this.getSideLength(shapeObj.points.b, shapeObj.points.c)
      shapeObj.props.area = this.getArea(ab, bc, alphaAngle)

      return shapeObj
    }

    Rect.prototype.getLastPoint = function ({ a, b, c }) {
      const dX = a.x - b.x + c.x
      const dY = a.y - b.y + c.y

      return { x: dX, y: dY }
    }

    Rect.prototype.getCenter = function ({ c, a }) {
      return { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 }
    }

    return Rect
  }()
);