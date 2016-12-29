// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
var scaledCanvas, scaledContext;

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
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  p1.Init(carPic);
  initInput();  
}

function moveEverything() {
  p1.Move();
}

function drawEverything() {
  drawTracks();
  
  p1.Draw();

  scaledContext.fillStyle = "black";
  scaledContext.fillRect(0,0,scaledCanvas.width,scaledCanvas.height);

  var canvHei = canvas.height;
  var centerX = canvas.width/2;
  var vertSkip = 1.65;
  var parVertOffset = 170;
  var parHorizStretch = 0.65;
  var parHorizBaseWidth = 370;
  for(var i=0;i<canvHei;i+=vertSkip) {
    var wid = i*parHorizStretch+parHorizBaseWidth;
    scaledContext.drawImage(canvas, 0, i, canvas.width, 1,
          centerX-wid/2, i/vertSkip+parVertOffset, wid, 1);
  }
}