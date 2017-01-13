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
        activateDragPoints(canvas.cnv, rect.data.points)
      }
    }
  }

  function activateDragPoints (cnv, draggableObj) {
    const dragger = new Dragger(cnv, draggableObj)

    cnv.addEventListener(EVENTS.MOUSE_DOWN, event => {
      if (!state.isMoveState()) return
      dragger.onMouseDown.call(dragger, event)
    }, false)

    cnv.addEventListener(EVENTS.MOUSE_UP, event => {
      if (!state.isMoveState()) return
      dragger.onMouseUp.call(dragger, event)
    }, false)

    cnv.addEventListener(EVENTS.MOUSE_MOVE, event => {
      if (!state.isMoveState()) return
      if (!dragger.isMouseDown) return

      dragger.onMouseMove.call(dragger, event, redraw)
    }, false)

    state.setMoveState()
  }

  function redraw (newPoints) {
    if (newPoints) rect.setPoints(newPoints)
    canvas.clear()

    drawer.drawDot(canvas.ctx, rect.data.points.a)
    drawer.drawDot(canvas.ctx, rect.data.points.b)
    drawer.drawDot(canvas.ctx, rect.data.points.c)

    makeRect(canvas.ctx, rectShape => makeCircle(canvas.ctx, rectShape))
  }

  return redraw
}(Canvas, drawer, Dragger, Rect, Circle));
