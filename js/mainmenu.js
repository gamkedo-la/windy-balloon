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
"Chris DeLeon - Lead, Tilt Effect, 3 Levels, Cinematics",
"Sergio Solorzano - Zombies and Twister, London Level+Art",
"Eric Andrade - Temperature Spoil Code, Cooling Building",
"Matthew Ko - 2 Monuments (NYC, Pisa), Menu Code",
"c:games - 2 Monuments (Eiffel Tower, Temple of Heaven)",
"Andreas Lathe - Particle Effects for Wind and Fire",
"Micky Turner - Sound Effects",
"Thomas Kresge - Gameplay Music",
"Caspar Dunant - Warning Airplane Model & Code",
"Christer Kaitila - Voiceovers, Level Select, 3 Levels",
"William DiFruscio - Mute Feature",
"Tyler Hays - Building Art (Generic)",
"Ashleigh Morris - Monument Art (Coming Soon)"
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


function loadMainMenu(){
    var framesPerSecond = 30;
    level_select_length = levelOrder.length;
    selectLength = menuItems.length;
    for(let i=0; i<14; i++){
        let temp = new menuBalloon();
        temp.Init( -200+Math.random()*10 + Math.random()*-10, 30+i*30+Math.random()*10, 0.01+ i*0.02,
            1000+Math.random()*100, 1+i*0.2);
        menuBalloons.push(temp);
    }

    menuInterval = setInterval(function() {        
        drawMainMenu();
        }, 1000/framesPerSecond);    
    curr_select = 0;
    scaledCanvas.addEventListener('mousedown',skipVideo);
    document.addEventListener("keydown", keyPressedInMenu);
}

function drawMainMenu(){
    if(videoPlaying) {
        videoPlaying = videoElement.currentTime < videoElement.duration;
        scaledContext.drawImage(videoElement , 0, 0);
        return;
    }    
    
    drawBG();    
    drawBalloons();
    if(curr_select != CREDITS_SELECT) {
        var unit = worldDrawCanvas.height/20;
        colorText("Windy Balloon" , worldDrawCanvas.width/4*1.2, worldDrawCanvas.height/3, 'white',"40px Verdana");
    }
    menuItems[curr_select].drawMenu();
}

function drawBalloons(){
    for(let i=0; i<menuBalloons.length; i++){
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
        colorText(levelName[levOrdIndex]/*"Level "+(levOrdIndex+1)*/ , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*1.5 + unit*levOrdIndex  , 'white',"25px Verdana");        
		
    }
    colorText("->", worldDrawCanvas.width/4*1.25, worldDrawCanvas.height/3*1.5 + unit*curr_pointer_index  , 'white',"25px Verdana"); 
    colorText("Esc to return to main menu" , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2.7 + unit*1  , 'white',"18px Verdana");
}

function creditScreenDraw(){
    var unit = worldDrawCanvas.height/20;
    for(var creditIdx = 0; creditIdx < creditLine.length; creditIdx++){
        colorText(creditLine[creditIdx], 30, worldDrawCanvas.height/6 + unit*creditIdx , 'white',"25px Verdana");        
    }
    colorText("Esc to return to main menu" , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2.7 + unit*1  , 'white',"18px Verdana");
}

function drawBG(){
    var backgroundColor = "#003";
    
    scaledContext.fillStyle = backgroundColor;
    scaledContext.fillRect(0,0,scaledCanvas.width,parCornerTL.y);
    scaledContext.fillRect(0,parCornerBL.y,
        scaledCanvas.width,scaledCanvas.height-parCornerBL.y);
    scaledContext.fillRect(0,parCornerTL.y,
                            parCornerBL.x,parCornerBL.y-parCornerTL.y);
    scaledContext.fillRect(parCornerBR.x,parCornerTL.y,
                            canvas.width-parCornerBR.x,parCornerBL.y-parCornerTL.y);
                                
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
	soundSystem.play("hover");
}

function keyPressedInMenu(evt){
    var thisKey = evt.keyCode;

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