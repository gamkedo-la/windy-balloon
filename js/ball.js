var balloonHeightNormal = 20;
var ballonDeviation = 2;
var heightChangePace = 0.04;
var heightChangeDampen = 0.6;
var heightMin = 2;
var heightMax = 50;
var mountainHeight = 30;
var balloonCorrectivePaceRise = 0.1;
var balloonCorrectivePaceSink = 0.5;

function ballClass() {
  this.x = 75;
  this.y = 75;
  this.xv = 5;
  this.yv = -3;
  this.z = balloonHeightNormal;
  this.zv = 0;
  this.heightOscillate = 0.0;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.Init = function(whichGraphic) {
    this.myBitmap = whichGraphic;
    this.Reset();
  }
  
  this.Reset = function() {
    this.Speed = 0;
    this.Ang = -0.5 * Math.PI;
  
    for(var i=0; i<trackGrid.length; i++) {
      if( trackGrid[i] == TRACK_PLAYER) {
        var tileRow = Math.floor(i/TRACK_COLS);
        var tileCol = i%TRACK_COLS;
        this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
        this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
        if(isInEditor == false) {
          trackGrid[i] = TRACK_ROAD;
        }
      } // end of if
    } // end of for
    
    this.x = this.homeX;
    this.y = this.homeY;
    this.xv = 5;
    this.yv = -3;

  } // end of carReset
  
  this.Move = function() {
    var nextX = this.x + this.xv;
    var nextY = this.y + this.yv;
    
    var carRad = 19;

    var hitC = getTrackAtPixelCoord(nextX,nextY);
    
    for(var r=Math.random()*0.1; r < 2*3.14159; r+=0.1) {
      hitR = getTrackAtPixelCoord(nextX+Math.cos(r)*carRad,
                                  nextY+Math.sin(r)*carRad);
      if((hitR == TRACK_MOUNTAINS && this.z < mountainHeight) ||
          hitR == TRACK_OUT_OF_BOUNDS) {
        this.xv -= Math.cos(r)*0.09;
        this.yv -= Math.sin(r)*0.09;
      }
    }
  
    var primaryAxisAccel = 0.7;
    var otherAxisDampen = 0.97;

    switch( hitC ) {
        case TRACK_COOLDOWN:
          if(this.z <= 5 && isCureVialViable != false) {
              cureTemp = 0;
          }
          break;
        case TRACK_LABORATORY:
          if(isCureVialViable == false){
            isCureVialViable = true;
            cureVialCondition = "Viable";
            cureTemp = 0;
            // eventually I'll need to remove the message that directs the player to the lab here
          }
          break;
      case ARROW_U:
        this.yv -= primaryAxisAccel;
        this.xv *= otherAxisDampen;
        break;
      case ARROW_R:
        this.xv += primaryAxisAccel;
        this.yv *= otherAxisDampen;
        break;
      case ARROW_D:
        this.yv += primaryAxisAccel;
        this.xv *= otherAxisDampen;
        break;
      case ARROW_L:
        this.xv -= primaryAxisAccel;
        this.yv *= otherAxisDampen;
        break;
      case TRACK_HEAT:
        this.zv = 5;
        break;
      case TRACK_ICE:
        this.zv = -5;
        break;
      case TRACK_GOAL:
      case TRACK_GOAL_LANDMARK:
          if(isCureVialViable == true){
              nextLevel();
          } else {
              //colorText("Hey! The vial is spoiled! Please head back to base" +
              // " to get another sample.", 600, 100, 'white');
              // }

              // need to figure out how to get this working (Eric)
              break;
          }

        return;
    }

    var speed = Math.sqrt(
        this.xv*this.xv +
        this.yv*this.yv
        );
    var minSpeed = 2.0;
    var maxSpeed = 5.0;
    if(speed < minSpeed) {
      this.xv = minSpeed * (this.xv/speed);
      this.yv = minSpeed * (this.yv/speed);
    }
    if(speed > maxSpeed) {
      this.xv = maxSpeed * (this.xv/speed);
      this.yv = maxSpeed * (this.yv/speed);
    }

    this.heightOscillate += heightChangePace;

    this.x = nextX;
    this.y = nextY;

    this.z += this.zv;
    if(this.z < heightMin) {
      this.z = heightMin;
    }
    if(this.z > heightMax) {
      this.z = heightMax;
    }
    if(this.z < balloonHeightNormal - balloonCorrectivePaceRise && this.zv<balloonCorrectivePaceRise) {
      this.zv = balloonCorrectivePaceRise;
    } else if(this.z > balloonHeightNormal + balloonCorrectivePaceSink && this.zv>-balloonCorrectivePaceSink) {
      this.zv = -balloonCorrectivePaceSink;
    } else {
      this.zv *= heightChangeDampen;
    }
  }

  this.heightNow = function() {
    return this.z + Math.cos(this.heightOscillate) * ballonDeviation;
  }
  
  this.DrawShadow = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0 );
  }
  this.DrawInAir = function () {
    var balloonDot = worldCoordToParCoord(this.x,this.y);
    drawAtBaseScaled(carPic,
      balloonDot.x,
      balloonDot.y - this.heightNow()*balloonDot.scaleHere, balloonDot.scaleHere);
  }

} // end of car class