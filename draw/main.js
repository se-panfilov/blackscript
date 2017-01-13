const drawFn = (function draw (Canvas, drawer, Dragger) {

  const EVENTS = {
    CLICK: 'click',
    MOUSE_DOWN: 'mousedown'
  }

  const canvasData = new Canvas('canvas').init()
  // const canvas = canvasData.getCanvas(event)

  canvasData.canvas.addEventListener(EVENTS.CLICK, onClick, false)
  canvasData.canvas.addEventListener(EVENTS.MOUSE_DOWN, onMouseDown, false)



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
