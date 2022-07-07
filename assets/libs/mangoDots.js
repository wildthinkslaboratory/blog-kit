
let uniqueInstanceName = 0;

////
// Color Pallette
//////////////////////////////////////////////////////////////////////////////


//const purple =        [200, 0,  255];
//const darkpurple =    [50,  0,   50];
const cyan =          [0,   200, 255];
const darkbluegreen = [0,   130,  70];
const lightLilac =    [220, 220, 255];
const white =         [255, 255, 255];
//const lime =          [110, 235, 150];
const darkGray =      [100, 100, 100];
//const bottleGreen =   [30,  160, 120];
const wine =          [100,   0, 100];
const paleWine =      [230, 200, 200];
const tomato =        [255,  90,  90];
const ltbluegreen =   [110, 220, 230];
const mango =         [255, 170,  90];
const darkmango =     [165,  120,   0];


const colorSchemes = {
  green : [lightLilac, white, mango, darkmango, cyan, darkbluegreen, darkbluegreen, white, lightLilac, darkGray, white],
  red : [paleWine, white, tomato, wine, ltbluegreen, darkbluegreen, wine, white, paleWine, darkGray, white]
};

class AppColors {
  constructor(boxStroke, boxFill, dotFill, dotStroke, antidotFill, antidotStroke, 
    writingFill, valueFill, valueStroke, dotButtonStroke, dotButtonFill) {
    this.boxStroke = boxStroke;
    this.boxFill = boxFill;
    this.dotFill = dotFill;
    this.dotStroke = dotStroke;
    this.antidotFill = antidotFill;
    this.antidotStroke = antidotStroke;
    this.writingFill = writingFill;
    this.valueFill = valueFill;
    this.valueStroke = valueStroke;
    this.dotButtonStroke = dotButtonStroke;
    this.dotButtonFill = dotButtonFill;
  }
}



///  global sound file variables
let addDotSound = null;
const addDotSoundFile =     'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/520efde07887f00c55653c6c5e6cfbe36962cd57/Blop-Mark_DiAngelo-79054334.wav';

const DotEnum = Object.freeze({UNDEF : -1, DOT : 0, ANTIDOT : 1});



////
// helper functions
//////////////////////////////////////////////////////////////////////////////


function centerTextInRect(p5, x,y,width,height,text) {
  const textW = p5.textWidth(text);
  const textH = p5.textAscent() * 0.8;
  const xoffset = (width - textW) / 2;
  const yoffset = (height - textH) / 2;
  return [x + xoffset, y + height - yoffset];
}


// general function for shallow copying of object. Keeps the associated methods.
function copyInstance (original) {
  let copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ),
    original
  );
  return copied;
}


// function getNumberString(n, symbols) {

//   const sign = (n < 0 ? false : true);
//   const base = symbols.length;
//   let A = [];
//   let quotient = Math.abs(n);
//   do {
//     A.unshift(symbols[quotient % base]);
//     quotient = Math.floor(quotient/base);
//   }
//   while (quotient > 0);

//   return (sign ? '' : '-') + A.join('');
// }




///
// Dot class
//////////////////////////////////////////////////////////////////////////////


class Dot {
  constructor(playableP5, x, y, box, boxes) {
    const {rx, ry} = boxes.getBoxRelativePos(x, y, box);
    this.p5 = playableP5;
    this.rx = rx;                // a dot knows it's position
    this.ry = ry;
    this.oldx = rx;             // it remembers it's old position before being dragged
    this.oldy = ry;
    this.box = box;            // it knows what box it's in
    this.id = Dot.uniqueId;        // each dot has a unique id
    Dot.uniqueId += 1;
    this.boxes = boxes;
  }

  getPosition() {
    return this.boxes.getCanvasRelativePos(this.rx, this.ry);
  }

  setPosition(x,y) {
    const { rx, ry } = this.boxes.getBoxRelativePos(x,y);
    this.rx = rx;
    this.ry = ry;
  }

  overlap(d2) {
    let result = false;

    if (this.box === d2.box) {
      const c1 = this.getPosition();
      const c2 = d2.getPosition();
      const dist = this.p5.dist(c1.x,c1.y,c2.x, c2.y);
      if (dist < this.boxes.dotDiameter) {
        result = true;
      }
    }

    return result;
  }
}

Dot.uniqueId = 0;





///
// DotArray class
//////////////////////////////////////////////////////////////////////////////

class DotArray {
  constructor(playableP5, size, fillColor, strokeColor, boxes) {
    this.p5 = playableP5;
    this.dots = [];
    for (let i = 0; i < size; i++) {
      this.dots[i] = [];
    }
    this.f = fillColor;
    this.s = strokeColor;
    this.boxes = boxes;
  }

  clear() {
    for (let i=0; i < this.dots.length; i++) {
      this.dots[i].length = 0;
    }
  }

  draw() {
    this.p5.push();
    this.p5.stroke(this.s);
    this.p5.fill(this.f);
    for (let i=0; i < this.dots.length; i++) {
      for (let j=0; j < this.dots[i].length; j++) {
        const dot = this.dots[i][j];
        const {x, y} = dot.getPosition();
        const dotD = this.boxes.dotDiameter;
        this.p5.ellipse(x, y, dotD, dotD);
      }
    }
    this.p5.pop();
  }

  // this is all done with Canvas Relative positioning
  snapToBox(x,y,boxId) {
    const b = this.boxes;
    let snappedY = y;
    let snappedX = x;

    const [X,Y] = b.center(boxId);

    const boxUpper = Y - b.boxW/2 + b.dotDiameter/2;
    const boxLower = Y + b.boxW/2 - b.dotDiameter/2 - b.margin;
    if (y < boxUpper) {  snappedY = boxUpper; }
    if (y > boxLower) {  snappedY = boxLower; }

    const boxLeft = X - b.boxW/2 + b.dotDiameter/2;
    const boxRight = X + b.boxW/2 - b.dotDiameter/2 - b.margin;

    if (x < boxLeft) snappedX = boxLeft;
    if (x > boxRight) snappedX = boxRight;

    return [snappedX,snappedY];
  }

  addDot(x, y, box) {
    const [snappedX,snappedY] = this.snapToBox(x, y, box);
    this.dots[box].push(new Dot(this.p5, snappedX, snappedY, box, this.boxes));
    if (addDotSound.isLoaded()) {
      addDotSound.play(); 
    }

  }

  pushDot(boxID,dot) {

    const {x, y} = dot.getPosition();
    const [snappedX, snappedY] = this.snapToBox(x,y, dot.box);
    const {rx, ry} = this.boxes.getBoxRelativePos(snappedX, snappedY);

    dot.rx = rx;
    dot.ry = ry;
    this.dots[boxID].push(dot);
  }

  updateDotPosition(pos) {
    let dot = this.dots[pos[1]][pos[2]];

    const {x, y} = dot.getPosition();
    const [snappedX, snappedY] = this.snapToBox(x,y, dot.box);
    const {rx, ry} = this.boxes.getBoxRelativePos(snappedX, snappedY);

    dot.rx = rx;
    dot.ry = ry;
    dot.oldx = dot.rx;
    dot.oldy = dot.ry;
  }

  deleteDot(i, j) {
    this.dots[i].splice(j, 1);
  }

  resetOldPosition(pos) {
    let dot = this.dots[pos[1]][pos[2]];
    dot.rx = dot.oldx;
    dot.ry = dot.oldy;
  }


}


///
// Box class and functions
///////////////////////////////////////////////////////////////////////////

class Boxes {
  constructor(playablep5, numberBoxes, x, y, width, height, fill, stroke) {
    this.p5 = playablep5;
    this.N = numberBoxes;
    this.instanceName = uniqueInstanceName++;
    this.fill = fill;
    this.stroke = stroke;
    this.x = x;
    this.y = y;
    this.width = width;
    this.cols = Math.ceil((this.N - 4) / 4) + 2;  
    this.rows = Math.ceil((this.N - 2 * this.cols) / 2);
    this.boxW = this.width / this.cols;
    this.height = this.boxW * (2 + this.rows);
    this.margin = 0.1 * this.boxW;
    this.round = this.boxW * 0.15;
    this.dotDiameter = this.boxW * 0.2;

  }

  updateSize(boxesX, boxesY, width, height) {
    this.x = boxesX;
    this.y = boxesY;
    this.width = width;
    this.boxW = height / this.cols;
    this.height = this.boxW * (2 + this.rows);
    this.margin = 0.1 * this.boxW;
    this.round = this.boxW * 0.15;
    this.dotDiameter = this.boxW * 0.2;
  }

  getDotDiameter() { 
    return this.dotDiameter; 
  }


  in(x, y) {

    if (x < this.x || x > this.x + this.width) return false;
    if (y < this.y || y > this.y + this.height) return false;

    if (x > (this.x + this.boxW) && 
      x < (this.x + this.width - this.boxW) &&
      y > (this.y + this.boxW) &&
      y < (this.y + this.height - this.boxW))  return false;

    return true;
  }

  getBoxID(x, y) {
    let result = -1;

    // check the vertical range of the boxes
    if (!this.in(x,y)) {
      // its not in the boxes
    }
    else {

      const colId = Math.floor((x - this.x) / this.boxW);
      const rowId = Math.floor((y - this.y) / this.boxW);

      if (rowId == this.rows + 1) {  // bottom row of rectangle
        return this.rows + this.cols + colId;
      }
      else if (rowId == 0) {  // top row of rectangle
        return this.cols - colId - 1;
      }
      else if (colId == 0) {  // left edge of rectangle
        return this.cols + rowId - 1;
      }
      else {    // right edge of rectangle
        return 2 * this.cols + this.rows + (this.rows - rowId);
      }
    }

    return result;
  }

  center(id) {  // return the x,y center of the given box

    let row = 0;
    let col = 0;
    if (id < this.cols) {
      row = 0;
      col = this.cols - id - 1;
    }
    else if (id < this.cols + this.rows) {
      col = 0;
      row = id - this.cols + 1;
    }
    else if (id < 2 * this.cols + this.rows) { 
      row = this.rows + 1;
      col = id - this.cols - this.rows;
    }
    else { 
      col = this.cols - 1;
      row = 2 * (this.rows + this.cols) - id;
    }
    
    return [this.x + this.boxW * (col + 0.5), this.y + this.boxW * (row + 0.5)];
  }

  draw() {
    const p5 = this.p5;
    p5.push();
    p5.noStroke();
    p5.fill(this.fill);
    
    let w = this.boxW - this.margin;

    // start box
    const m = w * 0.2;
    p5.fill(darkbluegreen);
    const startX = this.x + (this.cols - 1) * this.boxW - m;
    p5.rect(startX, this.y - m, w + 2*m, w + 2 * m, this.round);

    p5.textSize(m * 0.7);
    p5.fill(this.fill);
    let title = 'start';
    const [titleX,titleY] = centerTextInRect(p5, startX, this.y - m, w + 2*m, m, title);
    p5.text(title, titleX, titleY);

    // top row
    for (let i=0; i < this.cols; i++) {
      p5.rect(this.x + i * this.boxW, this.y, w, w, this.round);
    }
  
    // bottom row
    for (let i=0; i < this.cols; i++) {
      p5.rect(this.x + i * this.boxW, this.y + (this.rows+1) * this.boxW, w, w, this.round);
    }

    //sides
    for (let i=0; i < this.rows; i++) {
      p5.rect(this.x, this.y + (i+1) * this.boxW, w, w, this.round);
      p5.rect(this.x + (this.cols-1) * this.boxW, this.y + (i+1) * this.boxW, w, w, this.round);
    }  

    p5.pop();
  }

  ////
  // Coordinate transforms between box-relative and canvas-relative
  // Convention: (x, y) are canvas coordinates. (rx, ry) are box coordinates
  //////////////////////////////////////////////////////////////////////////////

  getCanvasRelativePos(rx, ry) {
    const result = {
      x: rx * this.boxW + this.x,
      y: ry * this.boxW + this.y
    };
    return result;
  }

  getBoxRelativePos(x, y) {
    const result = {
      rx: (x - this.x) / this.boxW,
      ry: (y - this.y) / this.boxW
    };

    return result;
  }

}


// Wrapper class for the main functions and data structures
function Dots(p5playable) {

  ////
  // Values that change on window-resize
  //////////////////////////////////////////////////////////////////////////////

  let canvasW;  // canvas width
  let canvasH;  // canvas height
  let p5 = p5playable;
  //let div = outsideDiv;

  // these variables are duplicated in the class Boxes
  // would be good to consolidate and just use the Boxes version.
  let boxesX;
  let boxesY;
  let boxesW;
  let boxesH;
  let dotD;     // dot diameter
  let endcapH;
  let valueTextSize;
  let titleTextSize;
  let colors;
  let numberBoxesX;
  let numberBoxesW;

  ////
  // Game state
  ////////////////////////////////////////////////////////////////////////////


  let base = 2;
  let numBoxes = 6;
  let boxes;
  let dots;
  let currentId = [DotEnum.UNDEF, 0, 0];  // the id of the current dot


  let totalMangosAdded = 0;  
  let totalMangosEaten = 0;


  function drawMangosAddedBox() {

    const y = endcapH;
    const height = endcapH;
    const x = numberBoxesX;
    const boxW = numberBoxesW;

    p5.push();

    p5.stroke(...colors.writingFill);
    p5.strokeWeight(2);
    p5.fill(...colors.boxFill);
    p5.rect(x, y, boxW, height, 10);

    p5.fill(...colors.writingFill);
    p5.stroke(...colors.writingFill);
    p5.strokeWeight(1);

    p5.textSize(titleTextSize);
    let title = 'mangos added';
    const [titleX,titleY] = centerTextInRect(p5, x, y - height/2, boxW, height/2, title);
    p5.text(title, titleX, titleY);

    p5.textSize(valueTextSize);
    const t = totalMangosAdded.toString();

    const [textX,textY] = centerTextInRect(p5, x, y, boxW, height, t);
    p5.text(t, textX, textY);

    p5.pop();
  }


  function drawMangosEatenBox() {

    const y = endcapH * 3;
    const height = endcapH;
    const x = numberBoxesX;
    const boxW = numberBoxesW;


    p5.push();

    p5.stroke(...colors.writingFill);
    p5.strokeWeight(2);
    p5.fill(...colors.boxFill);
    p5.rect(x, y, boxW, height, 10);

    p5.fill(...colors.writingFill);
    p5.stroke(...colors.writingFill);
    p5.strokeWeight(1);

    p5.textSize(titleTextSize);
    let title = 'mangos eaten';
    const [titleX,titleY] = centerTextInRect(p5, x, y - height/2, boxW, height/2, title);
    p5.text(title, titleX, titleY);

    p5.textSize(valueTextSize);
    const t = totalMangosEaten.toString();

    const [textX,textY] = centerTextInRect(p5, x, y, boxW, height, t);
    p5.text(t, textX, textY);

    p5.pop();
  }

  // add a dot to the model
  function addDot() {
    const boxID = boxes.getBoxID(p5.mouseX, p5.mouseY);
    if (boxID === 0) {
      dots[0].addDot(p5.mouseX, p5.mouseY, boxID);
      totalMangosAdded += 1;
    }
  }



  // dots explode as they are moved to the left
  function explodeDot(sendingBox, recievingBox) {
  
    const dotsNeeded = 2;

    if (dots[currentId[0]].dots[sendingBox].length < dotsNeeded) {
      alert('This person must have at least two mangos to eat.');
      return false;
    }

    let newDot = copyInstance(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
    newDot.box = recievingBox;
    newDot.oldx = newDot.rx;
    newDot.oldy = newDot.ry;


    let dotArrayID = currentId[0];
    if (base < 0) {
      dotArrayID = ((sendingBox - recievingBox) % 2 ? 1 - currentId[0] : currentId[0]);
    }

    dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box
    dots[dotArrayID].updateDotPosition([dotArrayID, recievingBox, dots[dotArrayID].dots[recievingBox].length - 1]);
    deleteDot(currentId);                            // remove this dot from it's old box
    for (let i=0; i < dotsNeeded-1; i++) {           // remove other dots from old box
      dots[currentId[0]].dots[sendingBox].pop();
    }

    currentId = [DotEnum.UNDEF, -1, -1];    
    totalMangosEaten += 1;
    if (addDotSound.isLoaded()) {
      addDotSound.play(); 
    }
    return true;
  }


  function shareRule(sendingBox, recievingBox) {

    if (dots[currentId[0]].dots[sendingBox].length < 3) {
      alert('This person must have at least three mangos to share.');
      return false;
    }

    const arrayId = currentId[0];
    const leftId = recievingBox;
    const lastBox = dots[0].dots.length - 1;
    const rightId = (sendingBox == lastBox) ? 0 : sendingBox + 1;
    
    let newDot = copyInstance(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
    newDot.box = recievingBox;
    newDot.oldx = newDot.rx;
    newDot.oldy = newDot.ry;


    let dotArrayID = currentId[0];

    dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box
    dots[dotArrayID].updateDotPosition([dotArrayID, recievingBox, dots[dotArrayID].dots[recievingBox].length - 1]);
    deleteDot(currentId);                            // remove this dot from it's old box
    for (let i=0; i < 2; i++) {           // remove other dots from old box
      dots[currentId[0]].dots[sendingBox].pop();
    }

    // share an extra to the left
    dots[arrayId].addDot(p5.mouseX + p5.random(-dotD, dotD), p5.mouseY + p5.random(-dotD, dotD), leftId);
    
    // share a mango to the right
    const [X ,Y] = boxes.center(rightId);
    dots[arrayId].addDot(X + p5.random(-dotD, dotD), Y + p5.random(-dotD, dotD), rightId);

    currentId = [DotEnum.UNDEF, -1, -1];    

    return true;
  }



  // reset a dot to its previous position before being dragged
  function resetDotPosition(dotID) {
    if (dotID[0] !== DotEnum.UNDEF) {
      dots[dotID[0]].resetOldPosition(dotID);
    }
  }



  // update a dot to it's new position after drag
  function updatePosition(dotID) {
    if (dotID[0] !== DotEnum.UNDEF) {
      dots[dotID[0]].updateDotPosition(dotID);
    }
  }



  function deleteDot(dotID) {
    if (dotID[0] !== DotEnum.UNDEF) {
      dots[dotID[0]].deleteDot(dotID[1], dotID[2]);
    }
  }



  // a dot has been dragged, find out if it's moved to a new box
  function getSendingAndRecievingBox() {
    if (currentId[0] !== DotEnum.UNDEF) {
      const current_dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
      const {x, y} = current_dot.getPosition();
      return [current_dot.box, boxes.getBoxID(x,y)];
    }
    return [-1,-1];
  }

  ////
  // App mouse events
  ////////////////////////////////////////////////////////////////////////////////////////////



  // Is the mouse in the spacers between the boxes
  // assumes the mouse isn't in a box
  // function mouseInSpacers() {
  //   if (p5.mouseX < boxesX || p5.mouseX > boxesX + boxesW) return false;
  //   if (p5.mouseY < boxesY || p5.mouseY > boxesY + boxesH) return false;
  //   return true;
  // }



  function mouseOnBoxes() {
    return boxes.getBoxID(p5.mouseX, p5.mouseY) != DotEnum.UNDEF;
  }



  function mouseOnDot() {
    // check the dots
    for (let n=0; n < dots.length; n++) {
      for (let i=0; i < dots[n].dots.length; i++) {
        for (let j=0; j < dots[n].dots[i].length; j++) {
          const dot = dots[n].dots[i][j];
          const { x, y } = dot.getPosition();
          const dist = p5.dist(p5.mouseX, p5.mouseY, x, y);
          if (dist < dotD / 2) {
            currentId = [n, i, j];
            return true;
          }
        }
      }
    }

    currentId = [DotEnum.UNDEF, -1, -1];
    return false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  this.mouseReleased = function() {

    

    if (mouseOnBoxes() && currentId && currentId[0] !== DotEnum.UNDEF) {  // this is the end of a drag event

      const [sendingBox, recievingBox] = getSendingAndRecievingBox(); 
      if (recievingBox === sendingBox) {            // drag within a box
        updatePosition(currentId);
      }
      else {                                        // drag between boxes

        let highestBox = dots[0].dots.length - 1;
        // one box counter clockwise
        if (recievingBox === sendingBox + 1 || (recievingBox == 0  && sendingBox == highestBox)) {        
          if (!explodeDot(sendingBox, recievingBox)) {
            resetDotPosition(currentId);            // weren't enough dots, send it back
          }
        }
        // one box clockwise
        else if (recievingBox === sendingBox - 1 || (recievingBox == highestBox  && sendingBox == 0)) {     
          if (!shareRule(sendingBox, recievingBox)) {
            resetDotPosition(currentId);            // weren't enough dots, send it back
          }
        }
        else {
          resetDotPosition(currentId);
        }
      }
    }
    else {   
      resetDotPosition(currentId);
      // if (mouseOnBoxes()) {
      //   resetDotPosition(currentId);
      // }  
      // else {
      //   // we've dragged a dot out of box region
      //   // if (mouseInSpacers()) {                       // between the boxes
      //   //   resetDotPosition(currentId);
      //   // }
      //   // out of the boxes
      //   if(mouseOnDot()) {
      //     deleteDot(currentId);
      //     currentId = [DotEnum.UNDEF,-1,-1];
      //     totalMangosAdded -= 1;
      //   }  
      // }                                   
    
    }
  };



  this.mousePressed = function()
  {
    if (mouseOnBoxes() && !mouseOnDot()) {
      addDot();
    }
  };



  this.mouseDragged = function()
  {
    if (currentId[0] != DotEnum.UNDEF) {
      const dot = dots[currentId[0]].dots[currentId[1]][currentId[2]];
      dot.setPosition(p5.mouseX, p5.mouseY);
    }
  };


  this.draw = function()
  {
    p5.clear();
    boxes.draw();
    dots[0].draw();
    drawMangosAddedBox();
    drawMangosEatenBox();
  };


  this.windowResized = function(width,height)
  {
    canvasW = width;
    canvasH = height;

    if (width > height * 1.5) {
      endcapH = canvasH * 0.1; 
      valueTextSize = endcapH * 0.5;
      titleTextSize = endcapH * 0.2;

      boxesW = height - 2 * endcapH;
      boxesH = boxesW;
      boxesX = (width - height * 1.1) /2;
      boxesY = endcapH;

      numberBoxesX = boxesX + height * 0.9;
      numberBoxesW = height * 0.2;
    }
    else {
      endcapH = canvasW * 0.07; 
      valueTextSize = endcapH * 0.5;
      titleTextSize = endcapH * 0.2;

      boxesW = 0.6 * width;
      boxesH = boxesW;
      boxesX = width * 0.07;
      boxesY = endcapH;

      numberBoxesX = 0.74 * width;
      numberBoxesW = 0.19 * width;
    }
  
    if (boxes != null) {
        boxes.updateSize(boxesX, boxesY, boxesW, boxesH);
        dotD = boxes.getDotDiameter();
      }
  };


  this.loadSounds = function() {
    addDotSound = p5.loadSound(addDotSoundFile);
  };

  this.setup = function(n) {  // n needs to be even
    colors = new AppColors(...colorSchemes['green']);
    numBoxes = n;
    boxes = new Boxes(p5, numBoxes, boxesX, boxesY, 0, 0, colors.boxFill, colors.boxStroke);
    dots = [];
    dots.push(new DotArray(p5, numBoxes, colors.dotFill, colors.dotStroke, boxes));
  };

}



///////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.dotlib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.Dots = Dots;

});




