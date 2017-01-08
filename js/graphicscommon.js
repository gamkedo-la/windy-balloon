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
  
function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colorText(showWords, textX,textY, fillColor) {
  scaledContext.fillStyle = fillColor;
  scaledContext.fillText(showWords, textX, textY);
}