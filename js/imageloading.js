var carPic = document.createElement("img");
var carShadowPic = document.createElement("img");
var planePic = document.createElement("img");
var mountainPic = document.createElement("img");
var treePic = document.createElement("img");
var trackSheet = document.createElement("img");
var cityBuildingsPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImages() {

  var imageList = [
    {varName:carPic, theFile:"ball.png"},
    {varName:carShadowPic, theFile:"ball-shadow.png"},
    {varName:planePic, theFile:"Spad-XIII.png"},
    {varName:mountainPic, theFile:"mountains.png"},
    {varName:treePic, theFile:"trees.png"},
    {varName:trackSheet, theFile:"track_all_sheet.png"},
    {varName:cityBuildingsPic, theFile:"citybuildings.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  } // end of for imageList

} // end of function loadImages
