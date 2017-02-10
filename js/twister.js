var onlyTwisterX=-100;
var onlyTwisterY=-100;
var twisterTimer=2;//SET TO 2 FOR TESTING PURPOSES ELSE SET TO ZERO
var maxTwisterTimer=4;

var twisterTemp=49;//SET TEMPORARILY CLOSE TO TWISTERMAXTEMP FOR TESTING PURPOSES
const twisterMaxTemp = 50;

const twisterAnimationFrames = 3;
const twisterStepsPerAnimFrame = 3;
var twisterFrame = 0;
var twisterFrameTimer = twisterStepsPerAnimFrame;

function clearTwister() {
  twisterList = [];
}

function drawTwister(){
  for(i=0;i<twisterList.length;i++){
    twisterList[i].moveTwister();
    twisterList[i].drawEachTwister();
  }
  if(twisterList.length>0){
  	onlyTwisterX=twisterList[0].x;
  	onlyTwisterY=twisterList[0].y;
  } else {
  	onlyTwisterX=-1000;
  	onlyTwisterY=-1000;
  }
}

function createEveryTwister() {
    if(twisterTemp >= twisterMaxTemp && Math.random()>0.1){//SET TEMPORARILY TO 0.1 FOR TESTING PURPOSES
        for(var i=0;i<TWISTERCOUNT;i++) {
  	     if(twisterList.length==0){//limited to 1 twister
          twisterList.push(new twisterClass());
    	    twisterList[i].twisterRandomStartLocation();
    	    twisterTemp=0;
          }//end if
        }//end for
     }//end if
     else {twisterTemp += 0.03;}  
}

//twister bounce off bordering tiles of the Goal/Lab
function areTilesNear(tileToCheck, tileColA,tileRowA,tileColB,tileRowB) {
      getBounceTileCoords(tileToCheck);
      return ( Math.abs(tileColA-tileColB) <= 1 && Math.abs(tileRowA-tileRowB) <= 1 );
      }

function twisterClass(){
    this.speedX = 0.15;
    this.speedY = 0.15;

    this.randomSpot=function(){
      this.x=canvas.width*Math.random();
      this.y=canvas.height*Math.random();
    }

    this.twisterRandomStartLocation = function(){
      var tileKindHere;
      do{
        this.randomSpot();
        tileKindHere = getTrackAtPixelCoord(this.x,this.y);
        this.col= Math.floor(this.x/TRACK_W);
        this.row=Math.floor(this.y/TRACK_H);
      }while(isTileTypeSolid(tileKindHere) || areTilesNear(TRACK_GOAL_LANDMARK,this.col, this.row, bounce.Col, bounce.Row) ||
      areTilesNear(TRACK_PLAYER,this.col, this.row, bounce.Col, bounce.Row));//TODO: TWISTER CAN GET STUCK ON GOAL/LAB AT STARTLOCATION VISIBLE ON ADJACENT COL TO TRACK_PLAYER LOCATION
    }

    this.drawEachTwister = function(){
      if(twisterFrameTimer-- < 0) {
        twisterFrameTimer = twisterStepsPerAnimFrame;
        twisterFrame++;
        if(twisterFrame >= twisterAnimationFrames) {
          twisterFrame = 0;
        }
      }

      var twisterDot = worldCoordToParCoord(this.x, this.y);
      drawAtBaseScaledSheet(twisterPic, twisterFrame,
        twisterDot.x, twisterDot.y,twisterDot.scaleHere);
    }

    this.moveTwister = function(){
      var prevX = Math.floor(this.x-this.speedX);
      var prevY = Math.floor(this.y-this.speedY);
      var AdjacentXTile = getTrackAtPixelCoord(prevX,this.y);
      var AdjacentYTile = getTrackAtPixelCoord(this.x, prevY);

      this.col= Math.floor(this.x/TRACK_W);
      this.row=Math.floor(this.y/TRACK_H);

      var tileType =  getTrackAtPixelCoord(this.x, this.y);
      
      var worldTileUnderTwister = trackTileToIndex(this.col, this.row);		

        switch (tileType) {

          case TRACK_CITY:
  	                trackGrid[worldTileUnderTwister] = TRACK_CITY_DOWN;
  	            break;
  	            
          case TRACK_TREE:
  	            trackGrid[worldTileUnderTwister] = TRACK_TREE_DOWN;
  	            break;
  	     }//end switch
         
      var testChangeColRow = true;
            
      if (isTileTypeSolidForTwister(tileType) || areTilesNear(TRACK_GOAL_LANDMARK,this.col, this.row, bounce.Col, bounce.Row) ||
      areTilesNear(TRACK_PLAYER,this.col, this.row, bounce.Col, bounce.Row)) {
                     
        if (this.x != prevX) { //came from the side
            if (isTileTypeSolidForTwister(AdjacentXTile) == false) {
                this.speedX *= -1;
                testChangeColRow = false
            }
        }
        if (this.y != prevY) { //came from the top or bottom
            if (isTileTypeSolidForTwister(AdjacentYTile) == false) {
                this.speedY *= -1;
                testChangeColRow = false
            }
        }
        if (testChangeColRow) { //came from top or bottom and from the side
            this.speedX *= -1;
            this.speedY *= -1;
        }
            }//end if
  	     
          
        //randomize twister movement  
        if(twisterTimer>maxTwisterTimer){
          if(Math.random()>0.5){var i=1;} else {i=-1;}
          if(Math.random()>0.5){var t=1;} else {t=-1;}
            if (isTileTypeSolidForTwister(tileType)==false || areTilesNear(TRACK_GOAL_LANDMARK,this.col, this.row, bounce.Col, bounce.Row)==false ||
            areTilesNear(TRACK_PLAYER,this.col, this.row, bounce.Col, bounce.Row)==false){
                  this.speedX*=i;
                  this.speedY*=t;
                  twisterTimer=2;
            }
            } else {
            twisterTimer+=0.03;
          }
        this.x += this.speedX;
        this.y += this.speedY; 
  }//end this.move
        

}//end twisterClass