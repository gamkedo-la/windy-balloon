function clearZombies() {
  zombieList = [];
}

function createEveryZombie() {
  clearZombies() // start with clean list
  
  for(var i=0;i<ZOMBIECOUNT;i++) {
    zombieList.push(new zombieClass());
    zombieList[i].zombieRandomStartLocation();
      }//end for
}//end createEveryZombie function

function drawZombie(){
  for(i=0;i<zombieList.length;i++){
    zombieList[i].moveZombie()
    zombieList[i].drawEachZombie();
  }
}

function zombieClass(){
  this.speedX = Math.random()*0.4;
  this.speedY = Math.random()*0.4;

  this.zombieRandomStartLocation = function(){
    this.x=canvas.width*Math.random();
    this.y=canvas.height*Math.random();
    //TODO: ALRIGHT- WHY CAN'T ADD tileType = getTrackAtPixelCoord(this.x,this.y) THAT THEN FEEDS INTO WHILE FUNCTION? ERROR SAYS CANNOT READ PROPERTY MOVEZOMBIE OF UNDEFINED
       
    while(getTrackAtPixelCoord(this.x,this.y)!=0 && getTrackAtPixelCoord(this.x,this.y)!=4)
         {this.zombieRandomStartLocation()};          
    }

this.drawEachZombie = function(){
    var zombieDot = worldCoordToParCoord(this.x, this.y);
    drawAtBaseScaled(zombiePic, zombieDot.x, zombieDot.y,zombieDot.scaleHere);
    }

    this.isPositionSolid = function(examinedTile){
      if(examinedTile != 0 && examinedTile!=4) {return true} else {return false};
    } 

  this.moveZombie = function(){
    var prevX = Math.floor(this.x-this.speedX);
    var prevY = Math.floor(this.y-this.speedY);

    var tileType =  getTrackAtPixelCoord(this.x, this.y);
    var AdjacentXTile = getTrackAtPixelCoord(prevX,this.y);
    var isAdjacentYTile = getTrackAtPixelCoord(this.x, prevY);
    
    var testChangeColRow = true;
    var outscreen = false;
    
    if (this.isPositionSolid(tileType)) {
                    if (this.x != prevX) { //came from the side
                        if (this.isPositionSolid(AdjacentXTile) == false) {
                            this.speedX *= -1;
                            testChangeColRow = false
                        }
                    }
                    if (this.y != prevY) { //came from the top or bottom
                        if (this.isPositionSolid(isAdjacentYTile) == false) {
                            this.speedY *= -1;
                            testChangeColRow = false
                        }
                    }
                    if (testChangeColRow) { //came from top or bottom and from the side
                        this.speedX *= -1;
                        this.speedY *= -1;
                    }
                }
        this.x += this.speedX;
        this.y += this.speedY;
    }
}