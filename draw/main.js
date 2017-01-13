const drawFn = (function draw (Canvas, drawer, Dragger, Rect, Circle) {

  const EVENTS = {
    CLICK: 'click',
    MOUSE_DOWN: 'mousedown'
  }

  const canvas = new Canvas('canvas').init()
  canvas.cnv.addEventListener(EVENTS.CLICK, onClick, false)
  canvas.cnv.addEventListener(EVENTS.MOUSE_DOWN, onMouseDown, false)

  const rect = new Rect()
  const circle = new Circle()

  function fillRect (ctx, position) {
    return rect.addPoint(drawer.drawDot(ctx, position))
  }

  function makeRect (ctx, cb) {
    const shape = rect.build()
    drawer.drawRect(ctx, shape)
    rect.setData(shape)
    cb(shape)
  }

  function makeCircle (ctx, rectShape) {
    circle.addPoint(rectShape.props.o)
    const radius = circle.getRadius(rectShape.props.area)
    const shape = circle.build(circle.data, radius)
    circle.setData(shape)

    drawer.drawCircle(ctx, shape)
  }

  // TODO (S.Panfilov)
  let done = false

  function onClick (event) {
    if (!done) {
      const position = canvas.getCursorPosition(canvas.cnv, event)
      if (Object.keys(rect.data.points).length <= 3) fillRect(canvas.ctx, position)

      if (Object.keys(rect.data.points).length === 3) {
        makeRect(canvas.ctx, rectShape => makeCircle(canvas.ctx, rectShape))
        done = true
      }
    }
  }

  function onMouseDown (event) {
    // console.info('onMouseDown')
    // // if (isInPath(Canvas.ctx, Canvas.cnv, event)) {
    // //   selStyle(Canvas.ctx)
    // // }
    //
    // const position = canvas.getCursorPosition(canvas.cnv, event)
    // const closestKey = rect.getClosestPoint(position)
    // console.info(closestKey)
  }

  function isInPath (ctx, cnv, event) {
    // const bb = cnv.getBoundingClientRect()
    // const x = (event.clientX - bb.left) * (cnv.width / bb.width)
    // console.info(x)
    // const y = (event.clientY - bb.top) * (cnv.height / bb.height)

    const rect = cnv.getBoundingClientRect()
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
}(Canvas, drawer, Dragger, Rect, Circle));
