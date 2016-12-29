var canvas, canvasContext;
var scaledCanvas, scaledContext;

// 
var parVertSkip = 1.65;
var parVertOffset = 170;
var parHorizStretch = 0.65;
var parHorizBaseWidth = 370;
var parXRangeTop = 0;
var parXRangeBot = 0;
var parYRange = 0;
var balloonHeight = 30;
var maxHeight = 33;
var minHeight = 27;
var heightChangeScalar = 0.25;

var arrowAnimFrame = 0;
var arrowAnimFrameTicksDelay = 0;
const TICKS_PER_ANIM = 2;
const ARROW_ANIM_FRAMES = 4;

var parCornerTL = {x:0,y:0};
var parCornerTR = {x:0,y:0};
var parCornerBL = {x:0,y:0};
var parCornerBR = {x:0,y:0};

var p1 = new ballClass();

window.onload = function() {
  scaledCanvas = document.getElementById('gameCanvas');
  canvas = document.createElement('canvas');
  canvasContext = canvas.getContext('2d');

  scaledCanvas.width = canvas.width = 800;
  scaledCanvas.height = canvas.height = 600;

  scaledContext = scaledCanvas.getContext('2d');
  scaledContext.fillStyle = "black";

  // Helps it not blur from the scaling:
  canvasContext.mozImageSmoothingEnabled = false;
  canvasContext.imageSmoothingEnabled = false;
  canvasContext.msImageSmoothingEnabled = false;
  canvasContext.imageSmoothingEnabled = false;
  scaledContext.mozImageSmoothingEnabled = false;
  scaledContext.imageSmoothingEnabled = false;
  scaledContext.msImageSmoothingEnabled = false;
  scaledContext.imageSmoothingEnabled = false;
  
  loadImages();
  setParCorners();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  p1.Init(carShadowPic);
  initInput();  
}

function moveEverything() {
  p1.Move();
}

function drawEverything() {
  if(arrowAnimFrameTicksDelay++ > TICKS_PER_ANIM) {
    arrowAnimFrameTicksDelay = 0;
    if(arrowAnimFrame++ >= ARROW_ANIM_FRAMES) {
      arrowAnimFrame= 0 ;
    }
  }

  drawTracks();
  
  p1.Draw();

  scaledContext.fillStyle = "#003"; // background color
  scaledContext.fillRect(0,0,scaledCanvas.width,scaledCanvas.height);

  var canvHei = canvas.height;
  var centerX = canvas.width/2;
  for(var i=0;i<canvHei;i+=parVertSkip) {
    var wid = i*parHorizStretch+parHorizBaseWidth;
    scaledContext.drawImage(canvas, 0, i, canvas.width, 1,
          centerX-wid/2, i/parVertSkip+parVertOffset, wid, 1);
  }
  /*
  // anchors for the parallelogram projection
  scaledContext.fillStyle = "red";
  scaledContext.fillRect(parCornerTL.x-1,parCornerTL.y-1,3,3);
  scaledContext.fillRect(parCornerTR.x-1,parCornerTR.y-1,3,3);
  scaledContext.fillRect(parCornerBL.x-1,parCornerBL.y-1,3,3);
  scaledContext.fillRect(parCornerBR.x-1,parCornerBR.y-1,3,3);
  */

  for(var i=0;i<mtPos.length;i++) {
    var mtDot = worldCoordToParCoord(mtPos[i].x,mtPos[i].y);
    scaledContext.drawImage(mountainPic,
      mtDot.x-mountainPic.width/2,
      mtDot.y-mountainPic.height);
  }

  var balloonDot = worldCoordToParCoord(p1.X,p1.Y);
  // scaledContext.fillRect(balloonDot.x-3,balloonDot.y-3,7,7);
  balloonHeight += Math.random() * heightChangeScalar
                 - Math.random() * heightChangeScalar;
  if(balloonHeight < minHeight) {
    balloonHeight = minHeight;
  }
  if(balloonHeight > maxHeight) {
    balloonHeight = maxHeight;
  }
  scaledContext.drawImage(carPic,
    balloonDot.x-carPic.width/2,
    balloonDot.y-carPic.height - balloonHeight);
}

function worldCoordToParCoord(worldX,worldY) {
  var screenPair = {x:0,y:0};
  var percAcross = worldX / canvas.width;
  var percDown = worldY / canvas.height;
  screenPair.y = parCornerTL.y + parYRange * percDown;
  screenPair.x = 
    (1.0-percDown) * (parCornerTL.x + parXRangeTop * percAcross) +
    (percDown) * (parCornerBL.x + parXRangeBot * percAcross);
  return screenPair;
}

function setParCorners() {
  var canvHei = canvas.height;
  var centerX = canvas.width/2;

  var wid = parHorizBaseWidth;
  parCornerTL.x = centerX-wid/2;
  parCornerTL.y = parVertOffset;
  
  parCornerTR.x = centerX+wid/2;
  parCornerTR.y = parCornerTL.y;
  
  wid = canvHei*parHorizStretch+parHorizBaseWidth;
  parCornerBL.x = centerX-wid/2;
  parCornerBL.y = canvHei/parVertSkip+parVertOffset;

  parCornerBR.x = centerX+wid/2;
  parCornerBR.y = parCornerBL.y;

  parXRangeTop = parCornerTR.x - parCornerTL.x;
  parXRangeBot = parCornerBR.x - parCornerBL.x;
  parYRange = parCornerBL.y - parCornerTL.y;
}
