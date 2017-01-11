const utils = (function () {
  return {
    CANVAS_ID: 'canvas',
    getCanvas (){
      return document.getElementById(this.CANVAS_ID)
    },
    getCursorPosition (canvas, event) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      return { x, y }
    }
  }
}());


const drawer = {
  drawDot (ctx, position, radius = 5.5, color = 'red', width = 1) {
    ctx.beginPath()
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()

    return position
  },
  drawRect (ctx, shapeObj, color = 'blue', width = 1) {
    ctx.beginPath()
    ctx.moveTo(shapeObj.a.x, shapeObj.a.y)
    ctx.lineTo(shapeObj.b.x, shapeObj.b.y)
    ctx.lineTo(shapeObj.c.x, shapeObj.c.y)
    ctx.lineTo(shapeObj.d.x, shapeObj.d.y)

    ctx.closePath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()

    return shapeObj
  },
  drawCircle (ctx, shapeObj, color = 'yellow', width = 1) {
    ctx.beginPath()
    ctx.arc(shapeObj.o.x, shapeObj.o.y, shapeObj.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()

    return shapeObj
  }
}

const drawFn = (function draw (utils, drawer) {

  const EVENTS = {
    CLICK: 'click'
  }

  const canvas = utils.getCanvas(event)
  canvas.addEventListener(EVENTS.CLICK, onClick, false)

  const shapeCounting = {
    common: {
      getSideLength (begin, end) {
        return Math.sqrt(Math.pow(end.x - begin.x, 2) + Math.pow(end.y - begin.y, 2))
      },
      getAngle (start, end, center) {
        const startToCenter = this.getSideLength(start, center)
        const endToCenter = this.getSideLength(end, center)
        const startToEnd = this.getSideLength(start, end)
        const angle = Math.acos((endToCenter * endToCenter + startToCenter * startToCenter - startToEnd * startToEnd) / (2 * endToCenter * startToCenter))

        return angle * (180 / Math.PI)
      },
      getRadians (degrees) {
        return degrees * (Math.PI / 180)
      },
      getArea (ab, bc, alpha) {
        //   return ((ac / 2) * bd) * Math.sin(this.getRadians(alpha))
        return ab * bc * Math.sin(this.getRadians(alpha))
      },
      buildShape (type, pointsArr, ...rest) {
        return shapeCounting[type].build(pointsArr, rest)
        // throw 'buildShape: Unknown shape'
      }
    },
    rect: {
      TYPE: 'rect',
      build (pointsObj) {
        const shapeObj = {}
        Object.assign(shapeObj, pointsObj)

        //Get 4-th point 
        shapeObj.d = this.getLastPoint(pointsObj)

        //Center
        shapeObj.o = this.getCenter(shapeObj)

        //Area
        const alphaAngle = shapeCounting.common.getAngle(shapeObj.b, shapeObj.d, shapeObj.a)
        shapeObj.area = this.getArea(shapeObj, alphaAngle)

        return shapeObj
      },
      getLastPoint ({ a, b, c }){
        const dX = a.x - b.x + c.x
        const dY = a.y - b.y + c.y

        return { x: dX, y: dY }
      },
      getArea({ a, b, c }, angle) {
        const ab = shapeCounting.common.getSideLength(a, b)
        const bc = shapeCounting.common.getSideLength(b, c)
        return shapeCounting.common.getArea(ab, bc, angle)
      },
      getCenter ({ c, a }) {
        return { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 }
      }
    },
    circle: {
      TYPE: 'circle',
      build (pointsObj, radius) {
        const shapeObj = {}
        Object.assign(shapeObj, pointsObj)
        shapeObj.radius = radius

        return shapeObj
      },
      getRadius (area) {
        return Math.sqrt(area / Math.PI)
      }
    }
  }

  const shapeData = {
    rect: {
      data: {},
      // pointsLimit: 4,
      addPoint ({ x, y }) {
        // if (Object.keys(this.data).length >= this.pointsLimit) throw 'RECT: To much points'

        if (!this.data.a) this.data.a = { x, y }
        else if (!this.data.b) this.data.b = { x, y }
        else if (!this.data.c) this.data.c = { x, y }
        else if (!this.data.d) this.data.d = { x, y }
      }
    },
    circle: {
      data: {},
      radius: 0,
      addPoint ({ x, y }) {
        this.data.o = { x, y }
      }
    }
  }

  function fillRect (ctx, position) {
    return shapeData.rect.addPoint(drawer.drawDot(ctx, position))
  }

  function makeRect (ctx, cb) {
    const shape = shapeCounting.common.buildShape(shapeCounting.rect.TYPE, shapeData.rect.data)
    drawer.drawRect(ctx, shape)
    shapeData.rect.data = shape
    cb(shape)
  }

  function makeCircle (ctx, rectShape) {
    shapeData.circle.addPoint(rectShape.o)
    const radius = shapeCounting.circle.getRadius(rectShape.area)
    const shape = shapeCounting.common.buildShape(shapeCounting.circle.TYPE, shapeData.circle.data, radius)
    shapeData.circle.data = shape

    drawer.drawCircle(ctx, shape)
  }

  function init (canvasName, event) {
    const position = utils.getCursorPosition(canvasName, event)
    const ctx = canvas.getContext("2d")

    return { position, ctx }
  }

  function onClick (event) {
    const { ctx, position } = init(utils.getCanvas(), event)
    if (Object.keys(shapeData.rect.data).length <= 3) fillRect(ctx, position)

    if (Object.keys(shapeData.rect.data).length === 3) {
      makeRect(ctx, rectShape => makeCircle(ctx, rectShape))
    }

  }

  return function draw () {
    // makeRect(ctx, rectShape => makeCircle(ctx, rectShape))
  }
}(utils, drawer));
