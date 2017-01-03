var planeHeightNormal = 20;
var planesList = [];

const PLANE_START_LEFT = 1;
const PLANE_START_RIGHT = 2;

function spawnPlane(whichY, side) {
  var p = new planeClass();
  p.Init(planePic, carShadowPic, whichY, side);
  planesList.push(p);
}

function movePlanes() {
  for (var i = planesList.length - 1; 0 <= i; i--) {
    planesList[i].Move();

    if (planesList[i].readyToRemove) {
      planesList.splice(i, 1);
    }
  }
}

function drawPlanes() {
  for (var i = planesList.length - 1; 0 <= i; i--) {
    planesList[i].Draw();
  }
}

function drawAtBaseScaledPlanes() {
  for (var i = planesList.length - 1; 0 <= i; i--) {
    planesList[i].DrawAtBaseScaled();
  }
}

function planeClass() {
  this.x = 0;
  this.y = 75;
  this.xv = 8;
  this.yv = 0;
  this.z = planeHeightNormal;

  this.readyToRemove = false;

  this.Init = function(whichGraphic, whichShadowGraphic, whichY, side) {
    this.myBitmap = whichGraphic;
    this.myShadowBitmap = whichShadowGraphic;
    this.x = (side == PLANE_START_LEFT) ? 0 : canvas.width;
    this.xv = (side == PLANE_START_LEFT) ? this.xv : -this.xv;
    this.y = whichY;

    this.scaleModifierX = (side == PLANE_START_LEFT) ? -1 : 1;
  };

  this.Move = function() {
    this.x += this.xv;
    this.y += this.yv;

    this.readyToRemove = (this.x < -this.myBitmap.width) || (canvas.width + this.myBitmap.width < this.x);
  };

  this.Draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myShadowBitmap, this.x, this.y, 0 );
  };

  this.DrawAtBaseScaled = function() {
    var planeDot = worldCoordToParCoord(this.x, this.y);
    drawAtBaseScaled(this.myBitmap,
      planeDot.x,
      planeDot.y - p1.heightNow()*planeDot.scaleHere, planeDot.scaleHere * this.scaleModifierX, planeDot.scaleHere);
  };
}
