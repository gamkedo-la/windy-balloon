var carPic = document.createElement("img");
var carShadowPic = document.createElement("img");
var planePic = document.createElement("img");
var trackSheet = document.createElement("img");
var cityBuildingsPic = document.createElement("img");
var landmarksPic = document.createElement("img");
var zombiePic = document.createElement("img");
var twisterPic = document.createElement("img");
var mountainDownPic = document.createElement("img");
var treeDownPic = document.createElement("img");
var cityBuildingsDownPic = document.createElement("img");
var brokenZombiePic = document.createElement("img");


var track3dPics = [];
/*var mountainPic = document.createElement("img");
var treePic = document.createElement("img");*/

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    //loadingDoneSoStartGame();
    loadMainMenu();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadTile3d(tileKind, fileName) {
  track3dPics[tileKind] = document.createElement("img");
  beginLoadingImage(track3dPics[tileKind], fileName);
}

function loadImages() {
  var imageList = [
      {varName:carPic, theFile:"ball.png"},
      {varName:carShadowPic, theFile:"ball-shadow.png"},
      {varName:planePic, theFile:"Spad-XIII.png"},
      {varName:trackSheet, theFile:"track_all_sheet.png"},
      {varName:cityBuildingsPic, theFile:"citybuildings.png"},
      {varName:landmarksPic, theFile:"landmarks.png"},
      {varName:zombiePic, theFile:"zombie4.png"},
      {varName:twisterPic, theFile:"twister_scrip.png"},
      {varName:cityBuildingsDownPic, theFile:"citybuildingsdown.png"},
      {varName:brokenZombiePic, theFile:"brokenzombie4.png"},
      {tileKind3d: TRACK_PLAYER, theFile:"laboratory.png"},
      {tileKind3d: TRACK_COOLDOWN, theFile:"cooldown_tile.png"},
      // added track_cooldown and laboratory to 3d tile render because it's easier to see
      {tileKind3d: TRACK_MOUNTAINS, theFile:"mountains.png"},
      {tileKind3d: TRACK_MOUNTAINS_DOWN, theFile:"mountainsdown.png"},
      {tileKind3d: TRACK_TREE_DOWN, theFile:"treesdown.png"},
      {tileKind3d: TRACK_TREE, theFile:"trees.png"},
      {tileKind3d: TRACK_CITY, theFile:"citybuildings.png"},
      {tileKind3d: TRACK_CITY_DOWN, theFile:"citybuildingsdown.png"}

    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileKind3d != undefined) {
      loadTile3d(imageList[i].tileKind3d, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
  } // end of for imageList

} // end of function loadImages
