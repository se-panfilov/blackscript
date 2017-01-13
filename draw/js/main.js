const main = (function draw (Canvas, drawer, Dragger, Rect, Circle) {

  const main = {
    EVENTS: {
      CLICK: 'click',
      MOUSE_DOWN: 'mousedown',
      MOUSE_UP: 'mouseup',
      MOUSE_MOVE: 'mousemove'
    },
    STATES: {
      draw: 'draw',
      move: 'move'
    },
    state: {
      current: 'draw',
      setDrawState () {
        this.current = main.STATES.draw
      },
      setMoveState () {
        this.current = main.STATES.move
      },
      isDrawState () {
        return this.current === main.STATES.draw
      },
      isMoveState () {
        return this.current === main.STATES.move
      }
    },
    canvas: new Canvas('canvas').init(),
    rect: new Rect(),
    circle: new Circle(),
    dragger: null,
    fillRect (ctx, position) {
      const dotPosition = drawer.drawDot(ctx, position)
      this.drawCoords(ctx, dotPosition)
      return this.rect.addPoint(dotPosition)
    },
    drawCoords (ctx, dotPosition, radius = 5.5) {
      const textPosition = {
        x: dotPosition.x,
        y: dotPosition.y - (radius + 10)
      }

      drawer.drawText(ctx, textPosition, `(x: ${dotPosition.x}, y: ${dotPosition.y})`)
    },
    makeRect (ctx, cb) {
      const shape = this.rect.build()
      drawer.drawRect(ctx, shape)
      const label = `■ Area: ${Number.parseInt(this.rect.data.props.area)}`
      const color = 'blue'
      const labelPosition = {
        x:  this.rect.data.props.o.x,
        y:  this.rect.data.props.o.y + 10
      }
      drawer.drawText(this.canvas.ctx, labelPosition, label, color)
      this.rect.setData(shape)
      cb(shape)
    },
    makeCircle (ctx, rectShape) {
      this.circle.addPoint(rectShape.props.o)
      const radius = this.circle.getRadius(rectShape.props.area)
      const shape = this.circle.build(this.circle.data, radius)
      this.circle.setData(shape)

      drawer.drawCircle(ctx, shape)
      console.info(this.circle.data.props)
      const label = `● Area: ${Number.parseInt(this.circle.data.props.area)}, ● Radius: ${Number.parseInt(this.circle.data.props.radius)}`
      const color = '#fff448'
      const labelPosition = {
        x:  this.circle.data.points.o.x,
        y:  this.circle.data.points.o.y - 10
      }
      drawer.drawText(this.canvas.ctx, labelPosition, label, color)
    },
    redraw (newPoints) {
      if (Object.keys(this.rect.data.points).length === 0) return
      if (newPoints) this.rect.setPoints(newPoints)
      this.canvas.clear()

      drawer.drawDot(this.canvas.ctx, this.rect.data.points.a)
      this.drawCoords(this.canvas.ctx, this.rect.data.points.a)

      drawer.drawDot(this.canvas.ctx, this.rect.data.points.b)
      this.drawCoords(this.canvas.ctx, this.rect.data.points.b)

      drawer.drawDot(this.canvas.ctx, this.rect.data.points.c)
      this.drawCoords(this.canvas.ctx, this.rect.data.points.c)

      this.drawCoords(this.canvas.ctx, this.rect.data.points.d)

      // drawer.drawText(this.canvas.ctx, this.rect.data.props.o, `Area: ${Number.parseInt(this.rect.data.props.area)}`, 'blue')
      this.makeRect(this.canvas.ctx, rectShape => this.makeCircle(this.canvas.ctx, rectShape))
    },
    reset () {
      this.canvas.clear()
      this.canvas = new Canvas('canvas').init()
      this.rect = new Rect()
      this.circle = new Circle()
      this.state.setDrawState()

      this.canvas.cnv.removeEventListener(this.EVENTS.CLICK, this.Handlers.onClick)
      this.canvas.cnv.removeEventListener(this.EVENTS.MOUSE_DOWN, this.Handlers.onMouseDown)
      this.canvas.cnv.removeEventListener(this.EVENTS.MOUSE_UP, this.Handlers.onMouseUp)
      this.canvas.cnv.removeEventListener(this.EVENTS.MOUSE_MOVE, this.Handlers.onMouseMove)

      init()
    },
    Handlers: {
      onMouseDown (event) {
        if (!main.state.isMoveState()) return
        main.dragger.onMouseDown.call(main.dragger, event)
      },
      onMouseUp (event) {
        if (!main.state.isMoveState()) return
        main.dragger.onMouseUp.call(main.dragger, event)
      },
      onMouseMove (event) {
        if (!main.state.isMoveState()) return
        if (!main.dragger.isMouseDown) return

        main.dragger.onMouseMove.call(main.dragger, event, main.redraw.bind(main))
      },
      onClick (event) {
        if (main.state.isDrawState()) {
          const position = main.canvas.getCursorPosition(main.canvas.cnv, event)
          if (Object.keys(main.rect.data.points).length <= 3) main.fillRect(main.canvas.ctx, position)

          if (Object.keys(main.rect.data.points).length === 3) {
            main.makeRect(main.canvas.ctx, rectShape => main.makeCircle(main.canvas.ctx, rectShape))
            activateDragPoints(main.canvas.cnv, main.rect.data.points)
          }
        }
      }
    }
  }

  function init () {
    main.canvas.cnv.addEventListener(main.EVENTS.CLICK, main.Handlers.onClick, false)
    return main
  }


  function activateDragPoints (cnv, draggableObj) {
    main.dragger = new Dragger(cnv, draggableObj)

    cnv.addEventListener(main.EVENTS.MOUSE_DOWN, main.Handlers.onMouseDown, false)
    cnv.addEventListener(main.EVENTS.MOUSE_UP, main.Handlers.onMouseUp, false)
    cnv.addEventListener(main.EVENTS.MOUSE_MOVE, main.Handlers.onMouseMove, false)

    main.state.setMoveState()
  }

  return init()
}(Canvas, drawer, Dragger, Rect, Circle));
