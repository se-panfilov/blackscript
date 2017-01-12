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
    ctx.moveTo(shapeObj.points.a.x, shapeObj.points.a.y)
    ctx.lineTo(shapeObj.points.b.x, shapeObj.points.b.y)
    ctx.lineTo(shapeObj.points.c.x, shapeObj.points.c.y)
    ctx.lineTo(shapeObj.points.d.x, shapeObj.points.d.y)

    ctx.closePath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()

    return shapeObj
  },
  drawCircle (ctx, shapeObj, color = 'yellow', width = 1) {
    ctx.beginPath()
    ctx.arc(shapeObj.points.o.x, shapeObj.points.o.y, shapeObj.props.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()

    return shapeObj
  }
}
