const drawFn = (function draw (Canvas, drawer, Dragger, Rect, Circle) {

  const EVENTS = {
    CLICK: 'click',
    MOUSE_DOWN: 'mousedown',
    MOUSE_UP: 'mouseup',
    MOUSE_MOVE: 'mousemove'
  }

  const canvas = new Canvas('canvas').init()
  canvas.cnv.addEventListener(EVENTS.CLICK, onClick, false)

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

  const STATES = {
    // pure: 'pure',
    draw: 'draw',
    move: 'move'
  }

  const state = {
    current: STATES.draw,
    // setPureState () {
    //   this.current = STATES.pure
    // },
    setDrawState () {
      this.current = STATES.draw
    },
    setMoveState () {
      this.current = STATES.move
    },
    isDrawState () {
      return this.current === STATES.draw
    },
    isMoveState () {
      return this.current === STATES.move
    }
  }

  function onClick (event) {
    if (state.isDrawState()) {
      const position = canvas.getCursorPosition(canvas.cnv, event)
      if (Object.keys(rect.data.points).length <= 3) fillRect(canvas.ctx, position)

      if (Object.keys(rect.data.points).length === 3) {
        makeRect(canvas.ctx, rectShape => makeCircle(canvas.ctx, rectShape))
        prepareDrag(canvas.cnv, rect.data.points)
      }
    }
  }

  function prepareDrag (cnv, draggableObj) {
    const dragger = new Dragger(cnv, draggableObj)
    let isMouseDown = false

    cnv.addEventListener(EVENTS.MOUSE_DOWN, event => {
      if (!state.isMoveState()) return
      dragger.onMouseDown.call(dragger, event)
      isMouseDown = true
    }, false)

    cnv.addEventListener(EVENTS.MOUSE_UP, event => {
      if (!state.isMoveState()) return
      dragger.onMouseUp.call(dragger, event)
      isMouseDown = false
    }, false)

    cnv.addEventListener(EVENTS.MOUSE_MOVE, event => {
      if (!state.isMoveState()) return
      if (!isMouseDown) return
      // TODO (S.Panfilov) return when mouse not pressed

      const newPoints = dragger.onMouseMove.call(dragger, event, draggableObj)
      rect.setPoints(newPoints)

      canvas.ctx.clearRect(0, 0, cnv.width, cnv.height);

      console.info(`${rect.data.points.b.y} `)

      drawer.drawDot(canvas.ctx, rect.data.points.a)
      drawer.drawDot(canvas.ctx, rect.data.points.b)
      drawer.drawDot(canvas.ctx, rect.data.points.c)
      makeRect(canvas.ctx, rectShape => makeCircle(canvas.ctx, rectShape))

    }, false)

    state.setMoveState()
  }

  // function onMouseDown (event) {
  //   console.info('onMouseDown')
  //   // if (isInPath(Canvas.ctx, Canvas.cnv, event)) {
  //   //   selStyle(Canvas.ctx)
  //   // }
  //
  //   const position = canvas.getCursorPosition(canvas.cnv, event)
  //   const closestKey = rect.getClosestPoint(position)
  //   console.info(closestKey)
  // }
  //
  // function isInPath (ctx, cnv, event) {
  //   // const bb = cnv.getBoundingClientRect()
  //   // const x = (event.clientX - bb.left) * (cnv.width / bb.width)
  //   // console.info(x)
  //   // const y = (event.clientY - bb.top) * (cnv.height / bb.height)
  //
  //   const rect = cnv.getBoundingClientRect()
  //   const x = event.clientX - rect.left
  //   const y = event.clientY - rect.top
  //
  //   // console.info(`x: ${x}, y ${y}`)
  //   // console.info(ctx.isPointInPath(x, y))
  //   return ctx.isPointInPath(x, y)
  // }
  //
  // function selStyle (ctx) {
  //   ctx.lineWidth = 2
  //   ctx.strokeStyle = "brown"
  //   ctx.fillStyle = "cyan"
  // }

  return function draw () {
    // makeRect(ctx, rectShape => makeCircle(ctx, rectShape))
  }
}(Canvas, drawer, Dragger, Rect, Circle));
