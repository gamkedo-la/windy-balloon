var menuInterval;
var currSelectedLevel = 0;
const MENU_SELECT = 0;
const LEVEL_SELECT = 1;
var curr_select = MENU_SELECT;
var curr_pointer_index = 0;
var menu_select_length = 2;
var level_select_length;
var selectLength;
function loadMainMenu(){
    var framesPerSecond = 30;
    level_select_length = levelOrder.length;
    selectLength = menu_select_length;
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
    var unit = worldDrawCanvas.height/20;
    colorText("Windy Balloon" , worldDrawCanvas.width/4*1.2, worldDrawCanvas.height/3, 'white',"40px Verdana");
    switch(curr_select){
        case MENU_SELECT: menuSelectDraw(); break;
        case LEVEL_SELECT: levelSelectDraw(); break;
    }    
}

function menuSelectDraw(){
    var unit = worldDrawCanvas.height/20;
    colorText("Start Campaign" , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2 + unit*0  , 'white',"25px Verdana");
    colorText("Load Level" , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2 + unit*1  , 'white',"25px Verdana");
    colorText("->", worldDrawCanvas.width/4*1.25, worldDrawCanvas.height/3*2 + unit*curr_pointer_index  , 'white',"25px Verdana"); 
}

function levelSelectDraw(){
    var unit = worldDrawCanvas.height/20;
    for(var levOrdIndex = 0; levOrdIndex < levelOrder.length; levOrdIndex++){
        colorText("Level "+(levOrdIndex+1) , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*1.5 + unit*levOrdIndex  , 'white',"25px Verdana");        
    }
    colorText("->", worldDrawCanvas.width/4*1.25, worldDrawCanvas.height/3*1.5 + unit*curr_pointer_index  , 'white',"25px Verdana"); 
    colorText("Esc to return to main menu" , worldDrawCanvas.width/4*1.45, worldDrawCanvas.height/3*2.5 + unit*1  , 'white',"18px Verdana");
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
    if(curr_pointer_index + val <0){
        curr_pointer_index = selectLength - Math.abs(val)%selectLength;
    }else{
        curr_pointer_index = (curr_pointer_index+ val)%selectLength;
    }
    console.log(curr_pointer_index);    
}

function keyPressedInMenu(evt){
    var thisKey = evt.keyCode;

    switch(thisKey){
        case KEY_UP_ARROW:updateCurrPointer(-1);break;
        case KEY_DOWN_ARROW:updateCurrPointer(1);break;
        case KEY_ENTER:menuActivate();break;
        case KEY_ESC: 
            if(curr_select === LEVEL_SELECT){ 
                selectLength = menu_select_length;
                curr_select = MENU_SELECT; 
            }
            break;
    }

}

function menuActivate(){

    soundSystem();

    switch(curr_select){
        case MENU_SELECT:
            if(curr_pointer_index === 0){
                clearInterval(menuInterval);
                StartGameOnLevel(currSelectedLevel);
            }
            if(curr_pointer_index === 1){
                curr_pointer_index = 0;
                selectLength = level_select_length;
                curr_select = LEVEL_SELECT;
            }
            break;
        case LEVEL_SELECT:
            clearInterval(menuInterval);            
            StartGameOnLevel(curr_pointer_index);
            break;
    }
    
}