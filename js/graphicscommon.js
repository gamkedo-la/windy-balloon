function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorRectOutline(topLeftX, topLeftY, boxWidth, boxHeight, lineColor) {
  canvasContext.strokeStyle = lineColor;
  canvasContext.lineWidth = 5;
  canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawAtBaseScaledSheet(graphic, idx, atX, atY, forScaleX, forScaleY) {
  if (forScaleY == undefined) {
    forScaleY = forScaleX;
  }
  scaledContext.save(); 
  var dimPerFrame = graphic.height;
  scaledContext.translate(atX-forScaleX*dimPerFrame/2,
                          atY-forScaleY*dimPerFrame*1.2);
  scaledContext.scale(forScaleX,forScaleY);
  scaledContext.drawImage(graphic,
    idx * TRACK_W, 0,
    TRACK_W, TRACK_H,
    0, 0,
    TRACK_W, TRACK_H);
  scaledContext.restore();
}

function drawAtBaseScaled(graphic, atX, atY, forScaleX, forScaleY) {
  if (forScaleY == undefined) {
    forScaleY = forScaleX;
  }
  scaledContext.save(); 
  scaledContext.translate(atX,atY);
  scaledContext.scale(forScaleX,forScaleY);
  scaledContext.drawImage(graphic,-graphic.width/2,-graphic.height);
  scaledContext.restore();
}
  
function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle, atScale) {
  if(atScale == undefined) {
    atScale = 1.0;
  }
  scaledContext.save(); // allows us to undo translate movement and rotate spin
  var parPt = worldCoordToParCoord( atX, atY );
  scaledContext.translate(parPt.x,parPt.y); // sets the point where our graphic will go
  var scaleExagg = parPt.scaleHere*atScale;
  scaledContext.scale(scaleExagg,scaleExagg);
  scaledContext.rotate(withAngle); // sets the rotation
  scaledContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  scaledContext.restore(); // undo the translation movement and rotation since save()
}

function colorText(showWords, textX,textY, fillColor, font) {
  if(font){
    scaledContext.font = font;
  }else{
    scaledContext.font = "16px Arial";
  }
  scaledContext.fillStyle = fillColor;
  scaledContext.fillText(showWords, textX, textY);
}