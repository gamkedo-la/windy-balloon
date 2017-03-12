var menuInterval;
var currSelectedLevel = 0;
const MENU_SELECT = 0;
const LEVEL_SELECT = 1;
const CREDITS_SELECT = 2;
var curr_select = MENU_SELECT;
var curr_pointer_index = 0;
var level_select_length;
var selectLength;
var menuBalloons = [];

var creditLine = [
"Chris DeLeon - Lead, Tilt Effect, 3 Levels, Cutscene Anims",
"Sergio Solorzano - Zombies, Twister, Sound Hooks, London",
"Eric Andrade - Temperature Spoil Code, Cooling Building",
"Matthew Ko - 2 Monuments (NYC, Pisa), Menu Code",
"c:games - 2 Monuments (Eiffel Tower, Temple of Heaven)",
"Andreas Lathe - Particle Effects for Wind, Fire, and Twister",
"Micky Turner - Sound Effects",
"Thomas Kresge - Gameplay Music",
"Ashleigh Morris - Tutorial Level, Golden Gate Bridge Art",
"Caspar Dunant - Warning Airplane Model & Flyover Code",
"William DiFruscio - Mute Feature",
"Tyler Hays - Building Art (Main/Background in NYC, Pisa)",
"Christer Kaitila - VO, Level Select, Sound Code, 4 Levels",
"Special Thanks to Nicholas Polchies (Canvas Scale from APC5)"
];

function menuBalloon(){
    this.x;
    this.y;
    this.balloonObj;
    this.speed;
    this.sinVal;
    this.scale;
    this.oscillation;
    this.baseScale;
    //oscillation base should be around 1000
    this.Init = function(x,y,speed,oscillation, baseScale){
        this.x = x;
        this.y = y;
        this.oscillation = oscillation;
        this.speed = speed;
        this.baseScale = baseScale;
        this.balloonObj = new ballClass();
        this.balloonObj.Init();
        this.scale = 0.75;
        this.sinVal = 0;
    }

    this.Draw = function(delta){
        this.x += delta * this.speed;
        this.sinVal += delta/this.oscillation;
        if(this.sinVal >= (Math.PI)){
            this.sinVal = 0;
        }        
        this.scale = Math.sin(this.sinVal)*(this.baseScale*1/4) + (this.baseScale*3/4);
        this.balloonObj.DrawCustom(this.x, this.y, this.scale);
        if(this.x > 1000){
            this.x = -600;
        }
    }

}

var forIntro = true;

function loadMainMenu(){
    isInMenu = true;
    var framesPerSecond = 30;
    selectLength = menuItems.length;
    if(menuBalloons.length == 0) { // first init?
        level_select_length = levelOrder.length;
        for(var i=0; i<14; i++){
            var temp = new menuBalloon();
            temp.Init( -200+Math.random()*10 + Math.random()*-10, 30+i*30+Math.random()*10, 0.01+ i*0.02,
                1000+Math.random()*100, 1+i*0.2);
            menuBalloons.push(temp);
        }

        scaledCanvas.addEventListener('mousedown',skipVideo);
        document.addEventListener("keydown", keyPressedInMenu);

        videoElement = document.createElement("video");
          videoDiv = document.createElement('div');
          document.body.appendChild(videoDiv);
          videoDiv.appendChild(videoElement);
          videoDiv.setAttribute("style", "display:none;");
          var videoType = supportedVideoFormat(videoElement);
          videoElement.addEventListener("canplaythrough",
            function() {
              if(forIntro) {
                videoPlaying = true;
                videoElement.play();
                forIntro = false;
              } else {
                console.log("end video loaded");
              }
            },false);
          videoPlaying = true;
        videoElement.setAttribute("src", "movie/windy-intro." + videoType);
    } else {
      soundSystem.stopAll();
      soundSystem.play("music",true,0.5);
    }

    menuInterval = setInterval(function() {        
        drawMainMenu();
        }, 1000/framesPerSecond);    
    curr_select = 0;
}

function drawMainMenu(){
    if(forIntro) { // waiting for video to play
        return;
    }
    if(videoPlaying) {
        scaledContext.save();
        scaledContext.scale(drawScale, drawScale);
        videoPlaying = videoElement.currentTime < videoElement.duration;
        scaledContext.drawImage(videoElement , 0, 0);
        scaledContext.restore();
        return;
    }    
    
    scaledContext.save();
    scaledContext.scale(drawScale, drawScale);
    drawBG();    
    drawBalloons();
    if(curr_select != CREDITS_SELECT) {
        var unit = worldDrawCanvas.height/20;
        colorText("Windy Balloon" , worldDrawCanvas.width/4*1.2, worldDrawCanvas.height/3, 'white',"40px Verdana");
    }
    menuItems[curr_select].drawMenu();
    scaledContext.restore();
}

function drawBalloons(){
    for(var i=0; i<menuBalloons.length; i++){
        menuBalloons[i].Draw(1000/30);
    }
}

function menuSelectDraw(){
    var unit = worldDrawCanvas.height/20;
    for(var i=0;i<menuItems.length;i++) {
        colorText(menuItems[i].label, worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2 + unit*i  , 'white',"25px Verdana");
    }
    colorText("->", worldDrawCanvas.width/4*1.25, worldDrawCanvas.height/3*2 + unit*curr_pointer_index  , 'white',"25px Verdana"); 
}

function levelSelectDraw(){
    var unit = worldDrawCanvas.height/20;
    for(var levOrdIndex = 0; levOrdIndex < levelOrder.length; levOrdIndex++){
        colorText(levelName[levOrdIndex]/*"Level "+(levOrdIndex+1)*/ , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*1.5-39 + unit*levOrdIndex  , 'white',"25px Verdana");        
		
    }
    colorText("->", worldDrawCanvas.width/4*1.25, worldDrawCanvas.height/3*1.5-39 + unit*curr_pointer_index  , 'white',"25px Verdana"); 
    colorText("Esc to return to main menu" , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2.7 + unit*1  , 'white',"18px Verdana");
}

function creditScreenDraw(){
    var unit = worldDrawCanvas.height/20;
    for(var creditIdx = 0; creditIdx < creditLine.length; creditIdx++){
        colorText(creditLine[creditIdx], 15, worldDrawCanvas.height/6 + unit*creditIdx , 'white',"25px Verdana");        
    }
    colorText("Esc to return to main menu" , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2.7 + unit*1  , 'white',"18px Verdana");
}

function drawBG(){
    var backgroundColor = "#003";
    
    scaledContext.fillStyle = backgroundColor;
    scaledContext.fillRect(0,0,canvas.width,canvas.height);
                                
    worldDrawContext.fillStyle = backgroundColor;
    worldDrawContext.fillRect(0,0,scaledCanvas.width,scaledCanvas.height);    
            
    scaledContext.drawImage(worldDrawCanvas,
                          parCornerBL.x,parCornerTL.y,
                          parCornerBR.x-parCornerBL.x,
                          parCornerBL.y-parCornerTL.y,
                          parCornerBL.x,parCornerTL.y,
                          parCornerBR.x-parCornerBL.x,
                          parCornerBL.y-parCornerTL.y);                    
}

function updateCurrPointer(val){
    curr_pointer_index += val;
    if(curr_pointer_index<0) {
        curr_pointer_index+=selectLength;
    } else if(curr_pointer_index>=selectLength) {
        curr_pointer_index-=selectLength;
    }

	//console.log("menu pointer index: " + curr_pointer_index);
	soundSystem.play("select");
}

function keyPressedInMenu(evt){
    if(videoPlaying || isInMenu == false) {
        return;
    }
    var thisKey = evt.keyCode;
    var wasValidGameKeySoBlockDefault = true;

    switch(thisKey){
        case KEY_UP_ARROW:updateCurrPointer(-1);break;
        case KEY_DOWN_ARROW:updateCurrPointer(1);break;
        case KEY_ENTER:menuItems[curr_select].activate();break;
		// note: this event is active during gameplay
		// so this will fire twice during the game
		// because keyPressed M is checked in input.js
		// case KEY_LETTER_M:soundSystem.toggleMute();break; 
        case KEY_ESC: 
            selectLength = menuItems.length;
            curr_pointer_index = curr_select;
            curr_select = MENU_SELECT; 
            break;
        default:
            wasValidGameKeySoBlockDefault = false;
            break;
    }
    if(wasValidGameKeySoBlockDefault) {
      evt.preventDefault();
    }
}

var menuItems = [{
        label: "Start Campaign",
        drawMenu: menuSelectDraw,
        activate: function() {
            if (curr_pointer_index === MENU_SELECT) {
                clearInterval(menuInterval);
                StartGameOnLevel(currSelectedLevel);
                soundSystem.play("select");
            } else {
                curr_select = curr_pointer_index;
                curr_pointer_index = 0;
                selectLength = level_select_length;
            }
        }
    },
    {
        label: "Load Level",
        drawMenu: levelSelectDraw,
        activate: function() {
            clearInterval(menuInterval);
            soundSystem.play("select");
            StartGameOnLevel(curr_pointer_index);
            curr_pointer_index = 0;
        }
    },
    {
        label: "Credits",
        drawMenu: creditScreenDraw,
        activate: function() {
            selectLength = menuItems.length;
            curr_select = MENU_SELECT;
            curr_pointer_index = CREDITS_SELECT;
        }
    }
];