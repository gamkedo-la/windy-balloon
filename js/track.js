// track constants and variables
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var worldMap1 = [
4, 4, 4, 4, 4, 0, -2, -2, -2, -2, -2, -2, 0, 0, 0, 4, 4, 4, 4, 4,
4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, -4, -1, -4, 0, 4, 4, 4, 
4, 4, 4, 0, 0, -4, -2, 0, -3, -3, -3, -3, 0, -1, -4, -1, 0, 0, 0, 0, 
4, 0, 0, 0, 0, -4, -2, 0, -3, -3, -3, -3, 0, 0, 0, 0, 0, 0, -3, -4, 
-4, 0, 0, 0, 0, -4, -2, 0, 0, 4, 4, 0, 1, 1, 1, 0, 0, 0, -4, -3, 
-4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 1, 3, 3, 0, 0, 0, 0, 0, 
-4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 0, 0, 0, 0, 0, 
-4, 0, 0, 0, 0, 0, -4, -4, 0, 0, 0, 4, 1, 3, 3, 0, 0, 0, 0, 0, 
-4, 0, 0, 0, 0, 0, -4, -4, 0, 7, 0, 4, 1, 1, 1, 4, 0, 0, 0, 0,
4, 0, -3, -2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, -4, -4, 0, 
4, 0, -2, -3, 0, 0, 0, 0, 0, -3, -3, -3, 4, 4, 4, 4, 0, -4, -4, 0, 
4, 0, 0, 0, 0, 0, 4, 0, 0, -3, -3, -3, 0, 4, 4, 0, 0, -4, -4, 0, 
4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 
4, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, -4, -1, -4, 0, 0, 4, 4, 
2, 0, 0, 0, 0, 4, 4, 4, -4, -4, -4, -4, 0, -1, -4, -1, 4, 4, 4, 4];
var worldMap2 =
    [ 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
      4, 1, 1,-4, 0, 0, 0,-2, 0, 6, 0,-4,-4, 0,-1,-1, 0,-2, 1, 1,
      1, 1,-4,-4, 0, 0, 0,-2, 0, 6, 0,-4,-4, 0,-1,-1, 0,-1,-1, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
      1,-1,-1, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1,-3,-3, 1,
      1, 5, 5, 1, 1, 0, 0, 1, 4, 4, 1, 1,-1,-1,-1, 1, 1,-3,-3, 1,
      1,-3,-3, 1,-2,-2,-1,-1, 1, 4, 1,-2,-1,-2,-1,-2, 1, 0, 0, 1,
      1, 0, 0, 1,-1,-1,-2,-2, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 2, 0, 1, 0, 0, 0, 0, 0,-2, 1, 0, 0, 1,-3,-3, 1, 0, 0, 1,
      1,-1,-1, 1, 0, 0, 1,-1, 0, 0,-4,-4, 0, 1,-1,-1, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0,-4,-4, 0, 1,-1,-1, 0,-2,-2, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 1,-2,-2,-2,-2, 1,-3,-3, 0,-2,-2, 1,
      0, 3, 0, 0,-3,-4, 1, 4, 1, 1,-1,-1, 1, 1, 0, 0, 0, 0, 0, 1,
      0, 3, 0, 0,-4,-3, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1];
var levelOrder = [worldMap1,worldMap2];

var currentLevelIdx = 0;
var trackGrid = []; // live play/edit scratch copy
const TRACK_ROAD = 0;
const TRACK_MOUNTAINS = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_HEAT = 5;
const TRACK_ICE = 6;
const TRACK_REFRIGERANT = 7;
const TRACK_OUT_OF_BOUNDS = 999; // no tile or track, just a return value
const ARROW_U = -1;
const ARROW_R = -2;
const ARROW_D = -3;
const ARROW_L = -4;

function displayTrackAsHTMLString() {
  var levStr = "";
  levStr += "var worldMap"+(currentLevelIdx+1)+" = [";
  for(i=0;i<trackGrid.length;i++) {
    if(i%TRACK_COLS==0) {
      levStr += "<br/>";
    }
    levStr += trackGrid[i] + (i<trackGrid.length-1 ? ", " : "];");
  }
  document.getElementById("levelOutput").innerHTML = levStr;
}

function trackTileToIndex(tileCol, tileRow) {
  return (tileCol + TRACK_COLS*tileRow);
}

function getTrackAtPixelCoord(pixelX,pixelY) { 
  var tileCol = pixelX / TRACK_W;
  var tileRow = pixelY / TRACK_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the ball is within any part of the track wall
  if(tileCol < 0 || tileCol >= TRACK_COLS ||
     tileRow < 0 || tileRow >= TRACK_ROWS) {
     return TRACK_OUT_OF_BOUNDS; // avoid invalid array access, treat out of bounds as wall
  }
  
  var trackIndex = trackTileToIndex(tileCol, tileRow);
  return trackGrid[trackIndex];
}

var mtPos = [];

function drawTracks() {
  var trackIndex = 0;
  var trackLeftEdgeX = 0;
  var trackTopEdgeY = 0;

  mtPos = [];
  
  for(var eachRow=0; eachRow<TRACK_ROWS; eachRow++) { // deal with one row at a time
    
    trackLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) { // left to right in each row

      var trackTypeHere = trackGrid[ trackIndex ]; // getting the track code for this tile        
      
      if(trackTypeHere == TRACK_MOUNTAINS || trackTypeHere == TRACK_TREE) {
        var newPt = {x:trackLeftEdgeX+TRACK_W/2,
                     y:trackTopEdgeY+TRACK_H,
                     img:(trackTypeHere == TRACK_MOUNTAINS ? mountainPic : treePic)};
        mtPos.push(newPt);
      }

      if(trackTypeHere < 0) {
        var arrowType = -trackTypeHere;
        // first draw default ground under the arrow
        canvasContext.drawImage(trackSheet,
          0, 0, // top-left corner of tile art, multiple of tile width
          TRACK_W, TRACK_H, // get full tile size from source
          trackLeftEdgeX, trackTopEdgeY, // x,y top-left corner for image destination
          TRACK_W, TRACK_H); // draw full full tile size for destination

        // draw arrow
        canvasContext.drawImage(trackSheet,
            (ARROW_ANIM_FRAMES+1) * TRACK_W, arrowType* TRACK_H, // top-left corner of tile art, multiple of tile width
            TRACK_W, TRACK_H, // get full tile size from source
            trackLeftEdgeX, trackTopEdgeY, // x,y top-left corner for image destination
            TRACK_W, TRACK_H); // draw full full tile size for destination

        // draw conveyor belt (animated)
        canvasContext.drawImage(trackSheet,
            arrowAnimFrame * TRACK_W, arrowType* TRACK_H, // top-left corner of tile art, multiple of tile width
            TRACK_W, TRACK_H, // get full tile size from source
            trackLeftEdgeX, trackTopEdgeY, // x,y top-left corner for image destination
            TRACK_W, TRACK_H); // draw full full tile size for destination

      } else {
        canvasContext.drawImage(trackSheet,
          trackTypeHere * TRACK_W, 0, // top-left corner of tile art, multiple of tile width
          TRACK_W, TRACK_H, // get full tile size from source
          trackLeftEdgeX, trackTopEdgeY, // x,y top-left corner for image destination
          TRACK_W, TRACK_H); // draw full full tile size for destination
      }

      if(isInEditor && trackIndex == editIdx) {
        colorRectOutline(trackLeftEdgeX, trackTopEdgeY, TRACK_W, TRACK_H, 'yellow');
      }
      trackIndex++; // increment which index we're going to next check for in the track        
      trackLeftEdgeX += TRACK_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    trackTopEdgeY += TRACK_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow    
} // end of drawTracks()