var onlyTwisterX=-100;
var onlyTwisterY=-100;

var twisterTemp=49;//SET TEMPORARILY CLOSE TO TWISTERMAXTEMP FOR TESTING PURPOSES
const twisterMaxTemp = 50;

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
function areTilesNear(tileColA,tileRowA,tileColB,tileRowB) {
      return ( Math.abs(tileColA-tileColB) <= 1 && Math.abs(tileRowA-tileRowB) <= 1 );
      console.log(tileColA)//TODO: NOT REPORTING
      }


function twisterClass(){
    this.speedX = 4;//SET TO  TEMPORARILY FOR TESTING PURPOSES - Math.random()*0.2
    this.speedY = 4;//SET TO  TEMPORARILY FOR TESTING PURPOSES - Math.random()*0.2

    this.randomSpot=function(){
      this.x=canvas.width*Math.random();
      this.y=canvas.height*Math.random();
    }

    this.twisterRandomStartLocation = function(){
      var tileKindHere;
      do{
        this.randomSpot();
        tileKindHere = getTrackAtPixelCoord(this.x,this.y);
      }while(isTileTypeSolid(tileKindHere));//TODO: ADD ARETILESNEAR GOAL OR LAB, ELSE TWISTER GETS STUCK IF SPAWNS AT LAB/GOAL
    }

    this.drawEachTwister = function(){
      var twisterDot = worldCoordToParCoord(this.x, this.y);
      drawAtBaseScaled(twisterPic, twisterDot.x, twisterDot.y,twisterDot.scaleHere);
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

          case TRACK_ICE:
  	            trackGrid[worldTileUnderTwister] = TRACK_ICE;// TO CREATE WHILEPOOL WHEN TWISTER ON TOP, TEMPORARILY POINTING TO SAME PIC
                break;

          case TRACK_CITY:
  	                trackGrid[worldTileUnderTwister] = TRACK_CITY_DOWN;
  	            break;
  	            
          case TRACK_TREE:
  	            trackGrid[worldTileUnderTwister] = TRACK_TREE_DOWN;
  	            break;
  	     }//end switch
         
      var testChangeColRow = true;
            
      //locate Goal/lab col,row
      
      getBounceTileCoords(TRACK_GOAL_LANDMARK);
      //getBounceTileCoords(TRACK_PLAYER);TODO: CHANGE CODE TO COVER BOTH GOAL LANDMARK OR TRACKPLAYER
      
      if (isTileTypeSolidForTwister(tileType) || areTilesNear(this.col, this.row, bounce.Col, bounce.Row)) {//TODO: CAN BOUNCE BOTH OFF TRACK_PLAYER OR GOAL LANDMARK
                     
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
  	
        this.x += this.speedX;
        this.y += this.speedY;
    
    }//end this.move

}//end twisterClass