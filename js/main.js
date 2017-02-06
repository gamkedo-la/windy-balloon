var canvas, canvasContext;
var worldDrawCanvas, worldDrawContext;
var scaledCanvas, scaledContext;

var isInEditor = false;
var showParticles = false;
var editIdx = -1;

// 
var parVertSkip = 1.65;
var parVertOffset = 170;
var parHorizStretch = 0.65;
var parHorizBaseWidth = 370;
var parXRangeTop = 0;
var parXRangeBot = 0;
var parYRange = 0;

var cureTemp = 0;
var isCureVialViable = true;
var cureVialCondition = "Viable";
var cureVialMaxTemp = 50;

var arrowAnimFrame = 0;
var arrowAnimFrameTicksDelay = 0;
const TICKS_PER_ANIM = 2;
const ARROW_ANIM_FRAMES = 4;

var parCornerTL = {x:0,y:0};
var parCornerTR = {x:0,y:0};
var parCornerBL = {x:0,y:0};
var parCornerBR = {x:0,y:0};

var videoPlaying = true;

var p1 = new ballClass();

var zombieList=[];
const ZOMBIECOUNT = 150;

window.onload = function() {
  scaledCanvas = document.getElementById('gameCanvas');
  canvas = document.createElement('canvas');
  canvasContext = canvas.getContext('2d');

  worldDrawCanvas = document.createElement('canvas');
  worldDrawContext = worldDrawCanvas.getContext('2d');

  worldDrawCanvas.width = scaledCanvas.width = canvas.width = 800;
  worldDrawCanvas.height = scaledCanvas.height = canvas.height = 600;

  scaledContext = scaledCanvas.getContext('2d');
  scaledContext.fillStyle = "black";

  // Helps it not blur from the scaling:
  canvasContext.mozImageSmoothingEnabled = false;
  canvasContext.imageSmoothingEnabled = false;
  canvasContext.msImageSmoothingEnabled = false;
  canvasContext.imageSmoothingEnabled = false;

  worldDrawContext.mozImageSmoothingEnabled = false;
  worldDrawContext.imageSmoothingEnabled = false;
  worldDrawContext.msImageSmoothingEnabled = false;
  worldDrawContext.imageSmoothingEnabled = false;

  scaledContext.mozImageSmoothingEnabled = false;
  scaledContext.imageSmoothingEnabled = false;
  scaledContext.msImageSmoothingEnabled = false;
  scaledContext.imageSmoothingEnabled = false;
  
  loadImages();
  setParCorners();
  videoElement = document.createElement("video");
  videoDiv = document.createElement('div');
  document.body.appendChild(videoDiv);
  videoDiv.appendChild(videoElement);
  videoDiv.setAttribute("style", "display:none;");
  var videoType = supportedVideoFormat(videoElement);
  videoElement.addEventListener("canplaythrough",
    function() {
      videoElement.play();
    },false);
  videoElement.setAttribute("src", "movie/windy-intro." + videoType);
}
var  videoElement,videoDiv;
function videoLoaded() {
}

// borrowed from:
// http://chimera.labs.oreilly.com/books/1234000001654/ch06.html#displaying_a_video_on_html5_canvas

function supportedVideoFormat(video) {
   var returnExtension = "";
   if (video.canPlayType("video/webm") =="probably" ||
       video.canPlayType("video/webm") == "maybe") {
         returnExtension = "webm";
   } else if(video.canPlayType("video/mp4") == "probably" ||
       video.canPlayType("video/mp4") == "maybe") {
         returnExtension = "mp4";
   }

   return returnExtension;

}

function StartGameOnLevel(selectedLevel){
  currentLevelIdx = selectedLevel;
  //manual control of zombie count for size of zombie-walking-area
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  ParticleSystem.init(scaledCanvas, 1000/framesPerSecond);
  loadLevel();
  initInput(); 
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  ParticleSystem.init(scaledCanvas, 1000/framesPerSecond);

  loadLevel();
  initInput();  
  }

function prevLevel() {
  currentLevelIdx--;
  if(currentLevelIdx < 0) {
    currentLevelIdx = levelOrder.length-1;
  }
  loadLevel();
}
function nextLevel() {
  currentLevelIdx++;
  if(currentLevelIdx >= levelOrder.length) {
    currentLevelIdx = 0;
  }
  loadLevel();
}

function loadLevel() {
  trackNeedsRedraw = true;
  trackGrid = levelOrder[currentLevelIdx].slice();
  p1.Init(carShadowPic);
  setupParticles();
  showParticles = (isInEditor == false);
  isCureVialViable = true;
  cureVialCondition = "Viable";
  cureTemp = 0;
  if(isInEditor) {
    clearZombies();
  } else {
    createEveryZombie();
  }
}

function setupParticles() {
  for(var i=0; i < particleGrid.length; i++) {
    particleGrid[i] != null && ParticleSystem.remove(particleGrid[i]);
  }
  particleGrid = [];
  var cx = TRACK_W / 2, cy = TRACK_H / 2;
  var trackIndex = 0; 
  var pos = [0,-15];
  for(var y=0; y < TRACK_ROWS; y++) {
    for(var x=0; x < TRACK_COLS; x++) {
      var localCluster = null;
      switch(trackGrid[ trackIndex ]) {
        case -1: localCluster = ParticleSystem.add(pos[0]+cx,pos[1]+TRACK_H, {}, "upwind"); break;
        case -2: localCluster = ParticleSystem.add(pos[0],pos[1]+cy, {}, "rightwind"); break;
        case -3: localCluster = ParticleSystem.add(pos[0]+cx,pos[1], {}, "downwind"); break;
        case -4: localCluster = ParticleSystem.add(pos[0]+TRACK_W,pos[1]+cy, {}, "leftwind"); break;
      }
      particleGrid.push(localCluster);
      trackIndex++;
      pos[0] += TRACK_W;
    }
    pos[0] = 0;
    pos[1] += TRACK_H;
  }

}

function cureTempUpdate(){
  if(isInEditor == false) {
    if(cureTemp >= cureVialMaxTemp) {
      if(isCureVialViable) {
        spawnPlane((p1.y+canvas.height/2 +
                    Math.random()*80)%canvas.height,
          Math.random()<0.5?PLANE_START_RIGHT:PLANE_START_LEFT);
        isCureVialViable = false;
        cureTemp = cureVialMaxTemp;
        cureVialCondition = "Spoiled";
      }
    } else {
        cureTemp += 0.03;
        isCureVialViable = true;
    }
  }
}

function moveEverything() {
  if(videoPlaying) {
    return;
  }
  cureTempUpdate();
  movePlanes();

  if(isInEditor == false) {
    p1.Move();
    }
}

function drawEverything() {
  if(videoPlaying) {
    videoPlaying = videoElement.currentTime < videoElement.duration;
    scaledContext.drawImage(videoElement , 0, 0);
    return;
  }

  if(arrowAnimFrameTicksDelay++ > TICKS_PER_ANIM) {
    arrowAnimFrameTicksDelay = 0;
    if(arrowAnimFrame++ >= ARROW_ANIM_FRAMES) {
      arrowAnimFrame= 0 ;
    }
  }

  drawPlanes();
  var backgroundColor = "#003";
  scaledContext.fillStyle = backgroundColor;
  scaledContext.fillRect(0,0,scaledCanvas.width,parCornerTL.y);
  scaledContext.fillRect(0,parCornerBL.y,
    scaledCanvas.width,scaledCanvas.height-parCornerBL.y);
  scaledContext.fillRect(0,parCornerTL.y,
                        parCornerBL.x,parCornerBL.y-parCornerTL.y);
  scaledContext.fillRect(parCornerBR.x,parCornerTL.y,
                        canvas.width-parCornerBR.x,parCornerBL.y-parCornerTL.y);
  
  if(isInEditor || trackNeedsRedraw) {
    trackNeedsRedraw = false;
    worldDrawContext.fillStyle = backgroundColor;
    worldDrawContext.fillRect(0,0,scaledCanvas.width,scaledCanvas.height);
    drawTracks();

    var canvHei = canvas.height;
    var centerX = canvas.width/2;
    for(var i=0;i<canvHei;i+=parVertSkip) {
      var wid = i*parHorizStretch+parHorizBaseWidth;
      worldDrawContext.drawImage(canvas, 0, i, canvas.width, 1,
            centerX-wid/2, i/parVertSkip+parVertOffset, wid, 1);
    }
  }
  scaledContext.drawImage(worldDrawCanvas,
                          parCornerBL.x,parCornerTL.y,
                          parCornerBR.x-parCornerBL.x,
                          parCornerBL.y-parCornerTL.y,
                          parCornerBL.x,parCornerTL.y,
                          parCornerBR.x-parCornerBL.x,
                          parCornerBL.y-parCornerTL.y);
  if(showParticles) {
    ParticleSystem.draw();
  }

  if(isInEditor == false) {
    p1.DrawShadow(); // shadow
  }

  /*
  // anchors for the parallelogram projection
  scaledContext.fillStyle = "red";
  scaledContext.fillRect(parCornerTL.x-1,parCornerTL.y-1,3,3);
  scaledContext.fillRect(parCornerTR.x-1,parCornerTR.y-1,3,3);
  scaledContext.fillRect(parCornerBL.x-1,parCornerBL.y-1,3,3);
  scaledContext.fillRect(parCornerBR.x-1,parCornerBR.y-1,3,3);
  */

  //scaledContext.fillStyle = "red";
  //scaledContext.fillRect(editDot.x-1,editDot.y-1,3,3);
  //console.log(editDot.x,editDot.y);
  if(isInEditor) {
    var editDot = parCoordToWorldCoord(mouseX,mouseY);
    if(editDot.x < 0 || editDot.x >= scaledCanvas.width ||
       editDot.y < 0 || editDot.y >= scaledCanvas.height) {
      editIdx = -1;
    } else {
      var editCol = Math.floor(editDot.x / TRACK_W);
      var editRow = Math.floor(editDot.y / TRACK_H);
      editIdx = editRow*TRACK_COLS + editCol;
    }    
  }

  drawZombie();
  drawTrackSpriteCards();

  if(isInEditor == false) {
    p1.DrawInAir();
  }
  drawAtBaseScaledPlanes();

  colorText("Use comma (<) or period (>) to cycle levels in track.js's levelOrder[] array",50,30,"yellow");
  colorText("Press 'M' to toggle music",canvas.width - 200,canvas.height-40,"yellow");
  if(isInEditor == false){
    colorText("Cure Vial Temperature: " +Math.floor(cureTemp) +"/" +cureVialMaxTemp , 550, 100, 'white');

    colorText("Cure Vial Status: " +cureVialCondition, 550, 80, 'cyan');
    if(isCureVialViable == false) {
      colorText("Hey! The vial is spoiled! Please get a to a local laboratory to pickup another sample.", 200, 575, 'white');
    }
  }

  if(isInEditor) {
    colorText("Editor Mode! Use mouse. R reloads. X eXports. B cycles Background. L to pLaytest",50,50,"yellow");

    colorText("Key guide for number row 1-8, WASD to place arrows, 9 for landmark/goal:",50,70,"yellow");

    var keyTileGuideX = 50;
    var keyTileGuideY = 75;
    scaledContext.drawImage(trackSheet,
      0, 0, // top-left corner of tile art, multiple of tile width
      trackSheet.width, TRACK_H, // get full tile size from source
      keyTileGuideX, keyTileGuideY, // x,y top-left corner for image destination
      trackSheet.width, TRACK_H); // draw full full tile size for destination

    for(var i=0;i<TRACK_HIGHEST_VALID_NUMBER;i++) {
      if(track3dPics[i] != undefined) {
        scaledContext.drawImage(track3dPics[i],
          keyTileGuideX+i*TRACK_W, keyTileGuideY);
      }
    }

  } else {
    colorText("Press R to Restart, Press L for Level Editor Mode",50,50,"yellow");
  }

}

function worldCoordToParCoord(worldX,worldY) {
  var screenPair = {x:0,y:0,scaleHere:1.0};
  var percAcross = worldX / canvas.width;
  var percDown = worldY / canvas.height;
  screenPair.y = parCornerTL.y + parYRange * percDown;
  screenPair.x = 
    (1.0-percDown) * (parCornerTL.x + parXRangeTop * percAcross) +
    (percDown) * (parCornerBL.x + parXRangeBot * percAcross);
  var scaleTop = 0.85;
  var scaleBot = 1.0;
  screenPair.scaleHere = 
    (1.0-percDown) * scaleTop +
    (percDown) * scaleBot;
  return screenPair;
}

function parCoordToWorldCoord(parX,parY) {
  var worldPair = {x:0,y:0};
  var percDown = (parY - parCornerTL.y) / (parCornerBL.y-parCornerTL.y);
  var percAcrossTop = (parX - parCornerTL.x) / (parCornerTR.x-parCornerTL.x);
  var percAcrossBot = (parX - parCornerBL.x) / (parCornerBR.x-parCornerBL.x);
  var percAcross = (1.0-percDown) * percAcrossTop +
    (percDown) * percAcrossBot;

  worldPair.x = percAcross * canvas.width;
  worldPair.y = percDown * canvas.height;
  return worldPair;
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
