const drawFn = (function draw (Canvas, drawer, Dragger) {

  const EVENTS = {
    CLICK: 'click',
    MOUSE_DOWN: 'mousedown'
  }

  const canvasData = new Canvas('canvas').init()
  // const canvas = canvasData.getCanvas(event)

  canvasData.canvas.addEventListener(EVENTS.CLICK, onClick, false)
  canvasData.canvas.addEventListener(EVENTS.MOUSE_DOWN, onMouseDown, false)

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
      }
    },
    rect: {
      TYPE: 'rect',
      build (obj) {
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
      build (obj, radius) {
        const shapeObj = {}
        Object.assign(shapeObj, obj)
        shapeObj.props.radius = radius

        return shapeObj
      },
      getRadius (area) {
        return Math.sqrt(area / Math.PI)
      }
    }
  }

  const shapeData = {
    rect: {
      data: {
        points: {},
        props: {}
      },
      // pointsLimit: 4,
      addPoint ({ x, y }) {
        // if (Object.keys(this.data).length >= this.pointsLimit) throw 'RECT: To much points'

        if (!this.data.points.a) this.data.points.a = { x, y }
        else if (!this.data.points.b) this.data.points.b = { x, y }
        else if (!this.data.points.c) this.data.points.c = { x, y }
        else if (!this.data.points.d) this.data.points.d = { x, y }
      },
      getLength (begin, end) {
        return Math.sqrt(Math.pow(end.x - begin.x, 2) + Math.pow(end.y - begin.y, 2))
      },
      getClosestPoint (coords) {
        const arr = []

        for (let prop in this.data.points) {
          if (this.data.points.hasOwnProperty(prop)) {
            arr.push({ name: prop, val: this.getLength(this.data.points[prop], coords) })
          }
        }

        console.info(arr.sort((a, b) => a.val - b.val)[0])
        return arr.sort((a, b) => a.val - b.val)[0].name
      }
    },
    circle: {
      data: {
        points: {},
        props: {}
      },
      radius: 0,
      addPoint ({ x, y }) {
        this.data.points.o = { x, y }
      }
    }
  }

  function fillRect (ctx, position) {
    return shapeData.rect.addPoint(drawer.drawDot(ctx, position))
  }

  function makeRect (ctx, cb) {
    const shape = shapeCounting.rect.build(shapeData.rect.data)
    console.info(shape)
    drawer.drawRect(ctx, shape)
    shapeData.rect.data = shape
    cb(shape)
  }

  function makeCircle (ctx, rectShape) {
    shapeData.circle.addPoint(rectShape.props.o)
    const radius = shapeCounting.circle.getRadius(rectShape.props.area)
    const shape = shapeCounting.circle.build(shapeData.circle.data, radius)
    shapeData.circle.data = shape

    drawer.drawCircle(ctx, shape)
  }

  // TODO (S.Panfilov)
  let done = false

  function onClick (event) {
    if (!done) {
      const position = canvasData.getCursorPosition(canvasData.canvas, event)
      if (Object.keys(shapeData.rect.data.points).length <= 3) fillRect(canvasData.ctx, position)

      if (Object.keys(shapeData.rect.data.points).length === 3) {
        makeRect(canvasData.ctx, rectShape => makeCircle(canvasData.ctx, rectShape))
        done = true
      }
    }
  }

  function onMouseDown (event) {
    // console.info('onMouseDown')
    // if (isInPath(Canvas.ctx, Canvas.canvas, event)) {
    //
    //   selStyle(Canvas.ctx)
    // }

    const position = canvasData.getCursorPosition(canvasData.canvas, event)
    const closestKey = shapeData.rect.getClosestPoint(position)
    console.info(closestKey)
  }

  function isInPath (ctx, canvas, event) {
    // const bb = canvas.getBoundingClientRect()
    // const x = (event.clientX - bb.left) * (canvas.width / bb.width)
    // console.info(x)
    // const y = (event.clientY - bb.top) * (canvas.height / bb.height)

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // console.info(`x: ${x}, y ${y}`)
    // console.info(ctx.isPointInPath(x, y))
    return ctx.isPointInPath(x, y)
  }

  function selStyle (ctx) {
    ctx.lineWidth = 2
    ctx.strokeStyle = "brown"
    ctx.fillStyle = "cyan"
  }

  return function draw () {
    // makeRect(ctx, rectShape => makeCircle(ctx, rectShape))
  }
}(Canvas, drawer, Dragger));
