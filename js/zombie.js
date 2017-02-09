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
    zombieList[i].moveZombie();
    zombieList[i].drawEachZombie();
  }
}

function zombieClass(){
  
  this.speedX = Math.random()*0.4;
  this.speedY = Math.random()*0.4;
  this.isDead=false;
  
  this.randomSpot=function(){
    this.x=canvas.width*Math.random();
    this.y=canvas.height*Math.random();
  }
  this.zombieRandomStartLocation = function(){
    var tileKindHere;
    do{
      this.randomSpot();
      tileKindHere = getTrackAtPixelCoord(this.x,this.y);
    }while(isTileTypeSolid(tileKindHere));
  }

  this.drawEachZombie = function(){
      var scaledZombieLocation = worldCoordToParCoord(this.x, this.y);
      
      if(this.isDead){
        drawAtBaseScaled(brokenZombiePic, scaledZombieLocation.x, scaledZombieLocation.y,scaledZombieLocation.scaleHere);
      } else {
        drawAtBaseScaled(zombiePic, scaledZombieLocation.x, scaledZombieLocation.y,scaledZombieLocation.scaleHere);
      }
  }

  this.moveZombie = function(){
    if(this.isDead){
      return;
    }
    var distToTwisterX=Math.abs(onlyTwisterX-this.x);
    var distToTwisterY=Math.abs(onlyTwisterY-this.y);
    this.isDead=distToTwisterX<25 && distToTwisterY<25;

    var prevX = Math.floor(this.x-this.speedX);
    var prevY = Math.floor(this.y-this.speedY);

    var tileType =  getTrackAtPixelCoord(this.x, this.y);
    var AdjacentXTile = getTrackAtPixelCoord(prevX,this.y);
    var AdjacentYTile = getTrackAtPixelCoord(this.x, prevY);
    
    var testChangeColRow = true;
        
    if (isTileTypeSolid(tileType)) {
        if (this.x != prevX) { //came from the side
            if (isTileTypeSolid(AdjacentXTile) == false) {
                this.speedX *= -1;
                testChangeColRow = false
            }
        }
        if (this.y != prevY) { //came from the top or bottom
            if (isTileTypeSolid(AdjacentYTile) == false) {
                this.speedY *= -1;
                testChangeColRow = false
            }
        }
        if (testChangeColRow) { //came from top or bottom and from the side
            this.speedX *= -1;
            this.speedY *= -1;
        }
    }//close if 
    this.x += this.speedX;
    this.y += this.speedY;
      
  }//end moveZombie
 
}//end zombieClass