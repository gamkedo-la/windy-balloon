function ballClass() {
  this.X = 75;
  this.Y = 75;
  this.XV = 5;
  this.YV = -3;

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
  
    if(this.homeX == undefined) {
      for(var i=0; i<trackGrid.length; i++) {
        if( trackGrid[i] == TRACK_PLAYER) {
          var tileRow = Math.floor(i/TRACK_COLS);
          var tileCol = i%TRACK_COLS;
          this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
          this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
          trackGrid[i] = TRACK_ROAD;
          break; // found it, so no need to keep searching 
        } // end of if
      } // end of for
    } // end of if car position not saved yet
    
    this.X = this.homeX;
    this.Y = this.homeY;
    this.XV = 5;
    this.YV = -3;

  } // end of carReset
  
  this.Move = function() {
    var nextX = this.X + this.XV;
    var nextY = this.Y + this.YV;
    
    var carRad = 19;

    var hitC = getTrackAtPixelCoord(nextX,nextY);
    
    for(var r=Math.random()*0.1; r < 2*3.14159; r+=0.1) {
      hitR = getTrackAtPixelCoord(nextX+Math.cos(r)*carRad,
                                  nextY+Math.sin(r)*carRad);
      if(hitR == TRACK_WALL) {
        this.XV -= Math.cos(r)*0.09;
        this.YV -= Math.sin(r)*0.09;
      }
    }
  
    var primaryAxisAccel = 0.7;
    var otherAxisDampen = 0.97;
    switch( hitC ) {
      case ARROW_U:
        this.YV -= primaryAxisAccel;
        this.XV *= otherAxisDampen;
        break;
      case ARROW_R:
        this.XV += primaryAxisAccel;
        this.YV *= otherAxisDampen;
        break;
      case ARROW_D:
        this.YV += primaryAxisAccel;
        this.XV *= otherAxisDampen;
        break;
      case ARROW_L:
        this.XV -= primaryAxisAccel;
        this.YV *= otherAxisDampen;
        break;
      case TRACK_GOAL:
        this.Reset();
        break;
    }

    var speed = Math.sqrt(
        this.XV*this.XV +
        this.YV*this.YV
        );
    var minSpeed = 2.0;
    var maxSpeed = 5.0;
    if(speed < minSpeed) {
      this.XV = minSpeed * (this.XV/speed);
      this.YV = minSpeed * (this.YV/speed);
    }
    if(speed > maxSpeed) {
      this.XV = maxSpeed * (this.XV/speed);
      this.YV = maxSpeed * (this.YV/speed);
    }

    this.X = nextX;
    this.Y = nextY;
  }
  
  this.Draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.X, this.Y, 0 );
  }

} // end of car class