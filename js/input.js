// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;

function initInput() {
  document.addEventListener("keydown", keyPressed);
}

function keyPressed(evt) {
  var thisKey = evt.keyCode;
  if(thisKey == KEY_LEFT_ARROW ||
     thisKey == KEY_RIGHT_ARROW) {
    for(var i=0;i<trackGrid.length;i++) {
      if(trackGrid[i] == ARROW_L) {
        trackGrid[i] = ARROW_R;
      } else if(trackGrid[i] == ARROW_R) {
        trackGrid[i] = ARROW_L;
      }
    }
  }
  if(thisKey == KEY_UP_ARROW ||
     thisKey == KEY_DOWN_ARROW) {
    for(var i=0;i<trackGrid.length;i++) {
      if(trackGrid[i] == ARROW_U) {
        trackGrid[i] = ARROW_D;
      } else if(trackGrid[i] == ARROW_D) {
        trackGrid[i] = ARROW_U;
      }
    }
  }

  evt.preventDefault(); // without this, arrow keys scroll the browser!
}
