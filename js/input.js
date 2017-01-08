var mouseX = 0;
var mouseY = 0;

// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;

const KEY_LETTER_L = 76; // level editor
const KEY_LETTER_R = 82; // reset
const KEY_LETTER_X = 88; // eXport level

const KEY_NUMROW_1 = 49;
const KEY_NUMROW_2 = 50;
const KEY_NUMROW_3 = 51;
const KEY_NUMROW_4 = 52;
const KEY_NUMROW_5 = 53;
const KEY_NUMROW_6 = 54;
const KEY_NUMROW_7 = 55;
const KEY_NUMROW_FOR_PLAYER_START = KEY_NUMROW_3;
const KEY_NUMROW_LAST = KEY_NUMROW_7;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  scaledCanvas.addEventListener('mousemove', updateMousePos);
}

function updateMousePos(evt) {
  var rect = scaledCanvas.getBoundingClientRect();
  var root = document.body;

  mouseX = evt.clientX - rect.left + root.scrollLeft;
  mouseY = evt.clientY - rect.top + root.scrollTop;
}

function keyPressed(evt) {
  var thisKey = evt.keyCode;
  var wasValidGameKeySoBlockDefault = false;

  if(isInEditor) {
    if(editIdx != -1) { // first for keys that require a valid tile under mouse
      wasValidGameKeySoBlockDefault = false;
      if(thisKey >= KEY_NUMROW_1 && thisKey <= KEY_NUMROW_LAST) {
        var tileValueToPlace = thisKey - KEY_NUMROW_1;
        if(thisKey == KEY_NUMROW_FOR_PLAYER_START) { // remove any prior player start
          for(var i=0;i<trackGrid.length;i++) {
            if(trackGrid[i] == tileValueToPlace) {
              trackGrid[i] = TRACK_ROAD;
            }
          }
        }
        trackGrid[editIdx] = tileValueToPlace;
        wasValidGameKeySoBlockDefault = true;

      } else {
        wasValidGameKeySoBlockDefault = true;
        switch(thisKey) {
          case KEY_LETTER_W:
            trackGrid[editIdx] = ARROW_U;
            break;
          case KEY_LETTER_A:
            trackGrid[editIdx] = ARROW_L;
            break;
          case KEY_LETTER_S:
            trackGrid[editIdx] = ARROW_D;
            break;
          case KEY_LETTER_D:
            trackGrid[editIdx] = ARROW_R;
            break;
          default:
            wasValidGameKeySoBlockDefault = false;
            break;
        }
      }
    }
    // again but for editor keys that don't need mouse over a valid tile
    switch(thisKey) {
      case KEY_LETTER_R:
        for(var i=0;i<trackGrid.length;i++) {
          trackGrid[i] = TRACK_ROAD;
        }
        break;
      case KEY_LETTER_X:
        console.log("ja");
        document.getElementById("levelOutput").innerHTML = trackAsHTMLString();
        break;
      case KEY_LETTER_L:
        isInEditor = false;
        worldMap1 = trackGrid.slice();
        loadLevel();
        wasValidGameKeySoBlockDefault = true;
        break;
    }

    if(wasValidGameKeySoBlockDefault) {
      evt.preventDefault();
    }
    return;
  }

  // gameplay / non-editor keys follow

  wasValidGameKeySoBlockDefault = true;
  switch(thisKey) {
    case KEY_LEFT_ARROW:
    case KEY_RIGHT_ARROW:
      for(var i=0;i<trackGrid.length;i++) {
        if(trackGrid[i] == ARROW_L) {
          trackGrid[i] = ARROW_R;
        } else if(trackGrid[i] == ARROW_R) {
          trackGrid[i] = ARROW_L;
        }
      }
      break;
    case KEY_UP_ARROW:
    case KEY_DOWN_ARROW:
      for(var i=0;i<trackGrid.length;i++) {
        if(trackGrid[i] == ARROW_U) {
          trackGrid[i] = ARROW_D;
        } else if(trackGrid[i] == ARROW_D) {
          trackGrid[i] = ARROW_U;
        }
      }
      break;
    case KEY_LETTER_R:
      loadLevel();
      break;
    case KEY_LETTER_L:
      isInEditor = !isInEditor;
      loadLevel();
      break;
    default:
      wasValidGameKeySoBlockDefault = false;
      break;
  }

  if(wasValidGameKeySoBlockDefault) {
    evt.preventDefault();
  }
}
