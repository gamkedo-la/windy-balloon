var balloonHeightNormal = 20;
var ballonDeviation = 2;
var heightChangePace = 0.04;
var heightChangeDampen = 0.6;
var heightMin = 2;
var heightMax = 60;
var cityHeight = 15;
var mountainHeight = 30;
var balloonCorrectivePaceRise = 0.1;
var balloonCorrectivePaceSink = 0.5;
var event=false;//at true twister position -1000,-1000

function ballClass() {
  this.x;
  this.y;
  this.xv;
  this.yv;
  this.z;
  this.zv;
  this.heightOscillate;

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
    this.x = 75;
    this.y = 75;
    this.xv = 5;
    this.yv = -3;
    this.z = balloonHeightNormal;
    this.zv = 0;
    this.heightOscillate = 0.0;
    for(var i=0; i<trackGrid.length; i++) {
      if( trackGrid[i] == TRACK_PLAYER) {
        var tileRow = Math.floor(i/TRACK_COLS);
        var tileCol = i%TRACK_COLS;
        this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
        this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
      } // end of if
    } // end of for
    
    this.x = this.homeX;
    this.y = this.homeY;
    this.xv = 5;
    this.yv = -3;
    soundSystem.stop("City");
    this.ang = -Math.PI/2;
    this.speed=10;

  } // end of carReset

  this.MyTileCR = function() {
    return {col: Math.floor(this.x / TRACK_W), row: Math.floor(this.y / TRACK_H) };
  }
  
  this.Move = function() {
    //balloon movement impacted by twister closeby
    var controlLoss=false;
    var activeControlLoss=false;
    var distBalToTwisterX=Math.abs(onlyTwisterX-this.x);
    var distBalToTwisterY=Math.abs(onlyTwisterY-this.y);
    var maxThisAng= -25;
    var trigger=80;
    var TURN_RATE=1;

    //temporary sounds where balloon is located
    //TODO: DEACTIVATE OTHER SOUNDS WHEN ONE SOUND'S ON
    var tileType =  getTrackAtPixelCoord(this.x, this.y);
        switch (tileType) {
          case TRACK_CITY:
                /*if(soundSystem.playing("zombies3")){//TODO -BOTH FILES HEAVILY CONFLICT, CAN TRY WHEN PLAYING BUILT FOR SOUNDSYSTEM
                } else {
                soundSystem.play("City",false,0.1);  
                }
                break;*/

          case TRACK_CITY_PARIS:
          /*if(soundSystem.playing("zombies3")){//TODO -BOTH FILES HEAVILY CONFLICT, CAN TRY WHEN PLAYING BUILT FOR SOUNDSYSTEM
          } else {
          soundSystem.play("City",false,0.1);  
          }
          break;*/

           case TRACK_CITY_LONDON:
          /*if(soundSystem.playing("zombies3")){//TODO -BOTH FILES HEAVILY CONFLICT, CAN TRY WHEN PLAYING BUILT FOR SOUNDSYSTEM
          } else {
          soundSystem.play("City",false,0.1);  
          }
          break;*/
              
          case TRACK_TREE:
                soundSystem.stop("City");
                //soundSystem.play("zombies3",false,0.2); // TODO -BOTH FILES HEAVILY CONFLICT, CAN TRY WHEN PLAYING BUILT FOR SOUNDSYSTEM
                break;

          case TRACK_HEAT:
          soundSystem.play("Take off",false,1);
          break;

         }//end switch

        if (distBalToTwisterX<Math.abs(trigger) && distBalToTwisterY<Math.abs(trigger) && this.ang>maxThisAng){
            this.ang -= TURN_RATE;
            var nextX = this.x + Math.cos(this.ang) * this.speed;
            var nextY = this.y + Math.sin(this.ang) * this.speed;
            trigger--;
            event=true;
        }
        else {
              var nextX = this.x + this.xv;
              var nextY = this.y + this.yv;
              if(this.ang>1){
                  this.ang=1;
                }
                else {
                  this.ang++;
                }
        if(trigger>80){
                  this.ang=80;
                }
                else {
                  trigger++;
                }
        }
            //console.log(activeControlLoss=(distBalToTwisterX<80 && distBalToTwisterY<80))
            //console.log(this.ang)
            //console.log(trigger)
    var carRad = 19;

    var hitC = getTrackAtPixelCoord(nextX,nextY);
    
    for(var r=Math.random()*0.1; r < 2*3.14159; r+=0.1) {
      hitR = getTrackAtPixelCoord(nextX+Math.cos(r)*carRad,
                                  nextY+Math.sin(r)*carRad);
      if( (hitR == TRACK_MOUNTAINS && this.z < mountainHeight) ||
          (hitR == TRACK_CITY && this.z < cityHeight) ||
          hitR == TRACK_OUT_OF_BOUNDS) {
        this.xv -= Math.cos(r)*0.09;
        this.yv -= Math.sin(r)*0.09;
      }
    }

    var primaryAxisAccel = 0.7;
    var otherAxisDampen = 0.97;

    switch( hitC ) {
        case TRACK_COOLDOWN: // removed height test, steering's tough :)
          if(/*this.z <= 5 && */ isCureVialViable != false) {
              cureTemp = 0;
          }
          break;
        case TRACK_PLAYER:
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
        this.zv = 6;
        break;
      case TRACK_ICE:
        this.zv = -1;
        break;
      case TRACK_GOAL_LANDMARK:
          if(isCureVialViable == true){
              soundSystem.stop("City");
              soundSystem.play("Crowd",false,1);
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
    var minSpeed = 1.5;
    var maxSpeed = 3.0;
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
    controlLoss=false;
  }

   this.heightNow = function() {
    return this.z + Math.cos(this.heightOscillate) * ballonDeviation;
  }
  
  this.DrawShadow = function() {
    var scaleFromHeight = 1.0-(this.z/heightMax);
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0,
              scaleFromHeight);
  }
  this.DrawInAir = function () {
    var balloonDot = worldCoordToParCoord(this.x,this.y);
    drawAtBaseScaled(carPic,
      balloonDot.x,
      balloonDot.y - this.heightNow()*balloonDot.scaleHere, balloonDot.scaleHere);

    if(isCureVialViable == false) {
      scaledContext.textAlign = "center";
      colorText("I need to go back!", balloonDot.x, balloonDot.y+15,
                'white');
      scaledContext.textAlign = "left";
    }
  }
  this.DrawCustom = function(x,y,scale){
    var balloonDot = worldCoordToParCoord(x,y);
    balloonDot.scaleHere = scale;
    drawAtBaseScaled(carPic,
      balloonDot.x,
      balloonDot.y - this.heightNow()*scale, scale);
  }

} // end of car class