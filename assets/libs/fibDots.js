
let uniqueInstanceName = 0;

////
// Color Pallette
//////////////////////////////////////////////////////////////////////////////


const purple =        [200, 0,  255];
const darkpurple =    [50,  0,   50];
const cyan =          [0,   200, 255];
const darkbluegreen = [0,   100, 100];
const lightLilac =    [220, 220, 255];
const white =         [255, 255, 255];
const lime =          [110, 235, 150];
const darkGray =      [100, 100, 100];
const bottleGreen =   [30,  160, 120];
const wine =          [100,   0, 100];
const paleWine =      [230, 200, 200];
const tomato =        [255,  90,  90];
const ltbluegreen =   [110, 220, 230];


const colorSchemes = {
  green : [lightLilac, white, purple, darkpurple, cyan, darkbluegreen, darkbluegreen, white, lightLilac, darkGray, white],
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
let annihilateSound = null;
const addDotSoundFile =     '../../assets/sounds/Blop-Mark_DiAngelo-79054334.wav';
const annihilateSoundFile = '../../assets/sounds/Woosh-Mark_DiAngelo-4778593.wav';

const DotEnum = Object.freeze({UNDEF : -1, DOT : 0, ANTIDOT : 1});



function fib(n) {
  if (n == 0) return 1;
  if (n == 1) return 1;
  return fib(n-1) + fib(n-2);
}



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


function getNumberString(n, symbols) {

  const sign = (n < 0 ? false : true);
  const base = symbols.length;
  let A = [];
  let quotient = Math.abs(n);
  do {
    A.unshift(symbols[quotient % base]);
    quotient = Math.floor(quotient/base);
  }
  while (quotient > 0);

  return (sign ? '' : '-') + A.join('');
}




/*
 - read about custom event handling 
 - need a better interface.  Make your tip and then activate and deactivate them with hooks.
 - need fade out?
 - need customization of which tips to use
 - add popups from outside lib
 - scale textSize with resize
 - improve flow of tutorial
 - attach items to object?
 - make first app full width with narrower boxes

*/

///
// Popup class
//////////////////////////////////////////////////////////////////////////////
const PopupStatusEnum = Object.freeze({INACTIVE : -1, OFF : 0 , ON : 1 });

class Popup {
  constructor(playableP5, rx, ry, rw, on, off, follows, m) {
    this.p5 = playableP5;
    this.rx = rx;                 // all the positioning is relative to the canvas size
    this.ry = ry;
    this.rw = rw;                 // width is specified and height depends on the amount of text to display
    this.xmargin = rw * 0.1;      // popup margins
    this.ymargin = rw * 0.1;
    this.message = m;
    this.fill = [255,255,200,0];  // currently all popups are yellowish with black writing
    this.stroke = [0,0,0,0];
    this.state = PopupStatusEnum.OFF;  
    this.textSize = 25;
    this.canvasW = 0;
    this.canvasH = 0;
    this.arrowx = 0;              // a popup can have an arrow (stored as a point)
    this.arrowy = 0;
    this.triggerOn = on;
    this.triggerOff = off;
    this.follows = follows;
    this.fadeDir = true;   // true for fade on, false for fade off
  }


  // called when the canvas is resized
  resize(cw, ch) {                
    this.canvasW = cw;
    this.canvasH = ch;
    this.textSize = cw / 50;
  }


  // this really calculates the number of lines of text for a given width and font
  wrapText() {
    const words = this.message.split(' ');
    const width = (this.rw - this.xmargin) * this.canvasW;
    let line = '';
    let numberLines = (words.length > 0 ? 1 : 0);
    for (let i = 0; i < words.length; i++) {
      line = line +  words[i] + ' ';
      if (this.p5.textWidth(line) >= width) {  // found the end of a line
        i--;
        line = '';
        numberLines++;
      } 
    }
    
    return numberLines;
  }


  // by default popups don't have arrows.  You have to call this
  // to add one
  setArrow(ax, ay) {
    this.arrowx = ax;
    this.arrowy = ay;
  }



  draw() {
    if (this.state === PopupStatusEnum.ON) {  // we only draw popups when they are on


      if (this.fill[3] < 255 && this.fadeDir) {            // this makes the popups fade in
        this.fill[3] += 15;
        this.stroke[3] += 15;
      }
      else { 
        if (this.triggerOff === 'FADE_OUT') {
          this.fadeDir = false;
        }
      }
    

      if (!this.fadeDir) {                         // slowly fad out
        if (this.fill[3] >= 5) {
          this.fill[3] -= 5;
          this.stroke[3] -= 5;
        }
        else { this.state = PopupStatusEnum.INACTIVE; }  // it's faded out turn it inactive
      }

      this.p5.push();
      this.p5.fill(this.fill);
      this.p5.stroke(this.stroke);
      this.p5.strokeWeight(3);
      this.p5.textSize(this.textSize);

      let x = this.rx * this.canvasW;      // calculate the non relative popup coordinants
      let y = this.ry * this.canvasH;
      let w = this.rw * this.canvasW;

      const numLines = this.wrapText();              // get the number of lines it will take
      const h = (numLines) * this.p5.textLeading();    // now we can calculate the height.
      const h2 = h + this.ymargin * this.canvasH;
      const arrowx = this.arrowx * this.canvasW;
      const arrowy = this.arrowy * this.canvasH;
      const delta = this.p5.textLeading()/2;
      const hasArrow = (this.arrowx != 0);

      this.p5.beginShape();
      this.p5.vertex(x, y);  // top of box
      if (hasArrow && arrowy < y) {
        this.p5.vertex(x + w/2 - delta,  y);
        this.p5.vertex(arrowx, arrowy);
        this.p5.vertex(x + w/2 + delta, y);
      }
      this.p5.vertex(x+w, y);   // right side
      if (hasArrow && arrowx > x+w) {
        this.p5.vertex(x + w, y + h2/2 - delta);
        this.p5.vertex(arrowx, arrowy);
        this.p5.vertex(x + w, y + h2/2 + delta);
      }
      this.p5.vertex(x+w, y+h2); // bottom side
      if (hasArrow && arrowy > y + h2) {
        this.p5.vertex(x + w/2 + delta, y + h2);
        this.p5.vertex(arrowx, arrowy);
        this.p5.vertex(x + w/2 - delta, y + h2);
      }
      this.p5.vertex(x, y+h2);   // left side
      if (hasArrow && arrowx < x) {
        this.p5.vertex(x, y + h2/2 + delta);
        this.p5.vertex(arrowx, arrowy);
        this.p5.vertex(x, y + h2/2 - delta);
        
      }
      this.p5.endShape(this.p5.CLOSE);

      this.p5.fill(this.stroke);
      this.p5.noStroke();
      x += this.xmargin * this.canvasW / 2;
      y += this.ymargin * this.canvasH / 2;
      w = (this.rw - this.xmargin) * this.canvasW;
      
      this.p5.text(this.message, x, y, w, h);
      this.p5.pop();
    }
  }

}

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

    const boxUpper = b.y + b.dotDiameter/2;
    const boxLower = b.y + b.height - b.dotDiameter/2;
    if (y < boxUpper) {  snappedY = boxUpper; }
    if (y > boxLower) {  snappedY = boxLower; }

    let boxLeft = b.x + (b.numberBoxes - boxId - 1) * b.width + b.dotDiameter/2;
    let boxRight = boxLeft + b.width - b.xSpacer - b.dotDiameter;

    if (boxLeft > b.x + (b.width * b.numberBoxes)/2) {
      boxLeft += b.dotDiameter * 2;
      boxRight += b.dotDiameter * 2;
    }

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
  constructor(playablep5, base, numberBoxes, x, y, boxesWidth, boxHeight, boxTextSize, xSpacer, dotDiameter, fill, stroke) {
    this.base = base;
    this.p5 = playablep5;
    this.numberBoxes = numberBoxes;
    this.instanceName = uniqueInstanceName++;
    this.x = x;
    this.y = y;
    this.height = boxHeight;
    this.width = boxesWidth/numberBoxes;
    this.boxTextSize = boxTextSize;
    this.xSpacer = xSpacer;
    this.dotDiameter = dotDiameter;
    this.fill = fill;
    this.stroke = stroke;
  }

  updateSize(boxesX, boxesY, boxesWidth, boxHeight, boxTextSize, xSpacer, dotDiameter) {
    this.height = boxHeight;
    this.width = boxesWidth/this.numberBoxes;
    this.x = boxesX;
    this.y = boxesY;
    this.boxTextSize = boxTextSize;
    this.xSpacer = xSpacer;
    this.dotDiameter = dotDiameter;
  }

  in(x, y) {
    if (y < this.y || y > (this.y + this.height)) return false;   // it's not in the boxes
    if (x < this.x || x > (this.x + this.width * this.numberBoxes)) return false;
    return true;
  }

  getBoxID(x, y) {
    let result = -1;

    // check the vertical range of the boxes
    if (y < this.y || y > (this.y + this.height)) {
      // its not in the boxes
    }
    else {
      // check the horizontal range
      const rightX = this.x + this.width * this.numberBoxes + 2 * this.dotDiameter;
      if (x < this.x || x > rightX) {
      // its not in the boxes
      }
      else {

        // which side of the screen is it on?

        if (x > (this.x + (this.width * this.numberBoxes)/2)) {
          x -= this.dotDiameter * 2;
        }
        // It is in a box's zone, but might be in the spacer.
        const boxId = this.p5.floor(((this.x + (this.width * this.numberBoxes)) - x) / this.width);
        const boxLeft = this.x + (this.numberBoxes - boxId - 1) * this.width;
        const boxRight = boxLeft + this.width - this.xSpacer;

        if (x < boxLeft || x > boxRight) {
          this.p5.rect(boxLeft, y, (boxRight - boxLeft), 10);
        }
        else {
          // console.log('getBoxID', boxId, x, boxLeft, boxRight);
          result = boxId;
        }
      }
    }

    return result;
  }


  draw() {
    const p5 = this.p5;
    p5.push();
    p5.noStroke();
    p5.fill(this.fill);


    for (let i=0; i < this.numberBoxes; i++) {
      let decimalBump = 0.0;
      if (i >= this.numberBoxes/2) {
        decimalBump += this.dotDiameter * 2;
      }
      p5.rect(this.x + i*this.width + decimalBump, this.y , this.width - this.xSpacer, this.height, 20);
    }

    p5.stroke([0,   200, 200]);
    p5.strokeWeight(4);
    p5.line(this.x + this.width * this.numberBoxes/2 + this.dotDiameter - this.xSpacer/2, this.y, 
      this.x + this.width * this.numberBoxes/2 + this.dotDiameter - this.xSpacer/2, this.y + this.height);

    p5.noStroke();
    p5.fill(this.stroke);
    p5.textSize(this.boxTextSize);
    const t = '1';
    const i = this.numberBoxes/2 - 1;
    const [textX,textY] = centerTextInRect(this.p5, this.x + i*this.width, this.y , this.width - this.xSpacer, this.height,t);
    p5.text(t, textX, textY);    

    // for (let i=0; i < this.numberBoxes; i++) {
    //   const t = fib(this.numberBoxes - i - 1).toString();

    //   const [textX,textY] = centerTextInRect(this.p5, this.x + i*this.width, this.y , this.width - this.xSpacer, this.height,t);
    //   p5.text(t, textX, textY);
    // }
    p5.pop();
  }

  ////
  // Coordinate transforms between box-relative and canvas-relative
  // Convention: (x, y) are canvas coordinates. (rx, ry) are box coordinates
  //////////////////////////////////////////////////////////////////////////////

  getCanvasRelativePos(rx, ry) {
    const result = {
      x: rx * this.width + this.x,
      y: ry * this.height + this.y
    };
    return result;
  }

  getBoxRelativePos(x, y) {
    const result = {
      rx: (x - this.x) / this.width,
      ry: (y - this.y) / this.height
    };

    return result;
  }

}

const phi = (1 + Math.sqrt(5))/2;

// Wrapper class for the main functions and data structures
function Dots(p5playable, outsideDiv) {
  ////
  // Values that change on window-resize
  //////////////////////////////////////////////////////////////////////////////

  let canvasW;  // canvas width
  let canvasH;  // canvas height
  let p5 = p5playable;
  let div = outsideDiv;

  // these variables are duplicated in the class Boxes
  // would be good to consolidate and just use the Boxes version.
  let boxesW;   // width of all the boxes together
  let boxesH;   // height of boxes
  let boxesX;
  let boxesY;
  let decimalSpace;
  let dotD;     // dot diameter
  let xSpacer = 10;  // how much space between the boxes
  let boxTextSize;
  let codeInset;
  // let marginX;
  // let marginY;

  // these variables are used in drawing the code boxes, value boxes and buttons
  let endcapH;
  let valueTextSize;
  let topBoxesY;
  let valueBoxesY;
  let codeBoxesY;
  let ySpacer;
  let ruleBoxX;

  let colors;

  ////
  // Game state
  ////////////////////////////////////////////////////////////////////////////


  let base = 2;
  let numBoxes = 6;
  let boxes;
  let dots;
  let currentId = [DotEnum.UNDEF, 0, 0];  // the id of the current dot
  let alphabet = [];  // we can change the alphabet of symbols we use to write numbers


  // currentSum is just used to calculate the text size in some of the draw functions
  // Do I need it or can I get rid of it somehow?
  let currentSum = 0;

  ////
  // App Restrictions
  ////////////////////////////////////////////////////////////////////////////

  let negaBinary = false;
  let dotButtonOn = true;
  let ruleButtonOn = negaBinary;
  let addDotsAllowed = true;
  let removeDotsAllowed = true;



  ////
  // Button States
  /////////////////////////////////////////////////////////////////////////////

  let addDots = true;
  let standardRule = true;
  let eventState = 'BEGIN';


  ////
  // Popups
  /////////////////////////////////////////////////////////////////////////////
  let popups = [];
  let dotsetup = [0,0,0];


  function respondToLocalEvent(e) {
    for (let i=0; i < popups.length; i++) {
      //console.log('follows', popups[i].follows, 'state', eventState);
      if (popups[i].follows === eventState) {
        if (popups[i].triggerOn === e.detail) {
          //console.log('popup state', popups[i].state);
          if (popups[i].state === PopupStatusEnum.OFF) {
            popups[i].state = PopupStatusEnum.ON;
            eventState = e.detail;
            //console.log('new state', eventState);
          }
        }
      }  
      if (popups[i].triggerOff === e.detail) {
        if (popups[i].state === PopupStatusEnum.ON) {
          popups[i].state = PopupStatusEnum.INACTIVE;

          //console.log('turning inactive', popups[i].message);
        }
      }  
    }
    if (eventState === 'DRAG_DOT_OUT' && e.detail === 'DRAG_DOT_OUT') {
      for (let i=0; i < dots.length; i++) { dots[i].clear(); }  // clear all the dots
      setUpBoxes(...dotsetup);
    }
  }
  //ADD_DOT : 0, CLICK_ADD : 1 , DRAG_DOT_OUT : 2, DRAG_LEFT : 3, END_TUTORIAL
  function addEventListeners() {
    div.addEventListener('ADD_DOT', respondToLocalEvent);
    div.addEventListener('CLICK_ADD', respondToLocalEvent);
    div.addEventListener('DRAG_DOT_OUT', respondToLocalEvent);
    div.addEventListener('DRAG_LEFT', respondToLocalEvent);
    div.addEventListener('BEGIN', respondToLocalEvent);
    div.addEventListener('DOT_ANNIHILATE', respondToLocalEvent);
    div.addEventListener('CLICK_RULE', respondToLocalEvent);

  }

  let firstTimeResized = true;  // hack to keep windowResized from running p5 commands until p5 is properly loaded

  ///
  // Additional Draw Functions
  /////////////////////////////////////////////////////////////////////////////////

  function drawCodeBoxes() {
    const x = boxesX;
    const y = codeBoxesY;
    const width = boxesW / numBoxes;
    const height = endcapH;

    p5.push();
  
    p5.textSize(valueTextSize);
    p5.stroke(...colors.writingFill);
    p5.noFill();
    //p5.fill(colors.valueFill[0],colors.valueFill[1],colors.valueFill[2],50);
    // p5.rect(x - 2*codeInset, y - ySpacer/4, boxesW + 2*codeInset, height + ySpacer/2, 10);

    p5.fill(...colors.writingFill);
    // const codeText = 'code';
    // const [textX, textY] = centerTextInRect(p5, x - 2*codeInset, y, 2*codeInset, height, codeText);
    // p5.text(codeText, textX, textY);

    p5.noStroke();
    p5.fill(...colors.valueFill);

    // for (let i=0; i < numBoxes; i++) {
    //   p5.rect(x + i*width, y , width - xSpacer, height, 10);
    // }

 
    p5.noStroke();
    p5.fill(...colors.writingFill);



    for (let i=0; i < numBoxes; i++) {
      let code = dots[0].dots[i].length;
      code -= dots[1].dots[i].length;

      let t = code.toString();

      if (alphabet.length > 1) {
        t = getNumberString(code,alphabet);
      }

      if (code === 0) { p5.fill([0,   200, 200]); }
      else { p5.fill(...colors.writingFill); }

      let decimalBump = 0.0;
      if (i < numBoxes/2) {
        decimalBump += dotD * 2;
      }

      const [textX,textY] = centerTextInRect(p5, x + (numBoxes - i - 1)*width + decimalBump, y , width - xSpacer, height,t);
      p5.text(t, textX, textY);
    }

    p5.fill(...colors.writingFill);
    p5.ellipse(x + boxesW/2 + dotD - xSpacer/2, y + endcapH/2 + xSpacer, xSpacer, xSpacer);


    p5.pop();
  }


  function drawValueBoxes() {
    const x = boxesX;
    const y = valueBoxesY;
    const width = boxesW / numBoxes;
    const height = endcapH;

    p5.push();
    p5.noStroke();
    p5.fill(...colors.valueFill);

    for (let i = 0; i < numBoxes; i++) {
      p5.rect(x + i*width, y, width - xSpacer, height, 10);
    }

    p5.noStroke();
    p5.fill(...colors.writingFill);
    p5.textSize(valueTextSize);

    currentSum = 0;
    for (let i = 0; i < numBoxes; i++) {
      let value = dots[0].dots[i].length * fib(i);
      value -= dots[1].dots[i].length * fib(i);
      currentSum += value;
      const t = value.toString();

      if (value === 0) {
        p5.fill(...colors.valueStroke);
      }
      else {
        p5.fill(...colors.writingFill);
      }

      const [textX,textY] = centerTextInRect(p5, x + (numBoxes - i - 1)*width, y , width - xSpacer, height,t);
      p5.text(t, textX, textY);
    }

    p5.pop();
  }

  function drawSummaryBox() {
    const y = topBoxesY;
    const height = endcapH;
    const x = boxesX + boxesW * (numBoxes - 3)/numBoxes + 2 * dotD;
    const boxW = boxesW / numBoxes;

    p5.push();

    p5.stroke(...colors.writingFill);
    p5.strokeWeight(2);
    p5.fill(...colors.boxFill);
    p5.rect(x, y, 3 * boxW - xSpacer, height, 10);

    p5.textSize(valueTextSize);
    p5.fill(...colors.writingFill);
    p5.stroke(...colors.writingFill);
    p5.strokeWeight(1);


    const t = currentSum.toFixed(8).toString();


    const [textX,textY] = centerTextInRect(p5, x, y, 3 * boxW - xSpacer, height, t);
    p5.text(t, textX, textY);

    p5.pop();
  }



  function drawRuleButton() {
    if (!ruleButtonOn) return;
    const y = topBoxesY;
    const height = endcapH;
    const x = ruleBoxX;
    const boxW = 2* boxesW / numBoxes;


    const littleBoxH = height * 0.75;
    const dotSize = littleBoxH * 0.25;

    p5.push();

    p5.stroke(...colors.dotButtonStroke);
    p5.strokeWeight(1);
    p5.fill(...colors.dotButtonFill);
    p5.rect(x, y, boxW - xSpacer, height, 10);

    const centerX = ruleBoxX + (boxW - xSpacer) / 2;
    const boxY = y + height * 0.125;
    const shift = littleBoxH/2;

    p5.line(centerX - shift, boxY + shift, centerX + shift, boxY + shift);
    p5.line(centerX - shift, boxY + shift, centerX - 0.7 * shift, boxY + shift - 0.3 * shift );
    p5.line(centerX - shift, boxY + shift, centerX - 0.7 * shift, boxY + shift + 0.3 * shift );

    if (standardRule) {
      const box1X = centerX + littleBoxH;
      const box2X = centerX - 2*littleBoxH;

      p5.rect(box1X, boxY,littleBoxH,littleBoxH,5);
      p5.rect(box2X, boxY,littleBoxH,littleBoxH,5);
      p5.stroke(...colors.dotStroke);
      p5.fill(...colors.dotFill);

      p5.ellipse(box1X + shift*0.7, boxY + shift*0.7, dotSize, dotSize);
      p5.ellipse(box1X + shift*1.3, boxY + shift*1.3, dotSize, dotSize);

      p5.stroke(...colors.antidotStroke);
      p5.fill(...colors.antidotFill);
      p5.ellipse(box2X + shift, boxY + shift, dotSize, dotSize);
    }
    else {
      const boxes1X = centerX + littleBoxH;
      const boxes2X = centerX - 3*littleBoxH;

      p5.rect(boxes1X, boxY,littleBoxH,littleBoxH,5);
      p5.rect(boxes1X + littleBoxH, boxY,littleBoxH,littleBoxH,5);
      p5.rect(boxes2X, boxY,littleBoxH,littleBoxH,5);
      p5.rect(boxes2X + littleBoxH, boxY,littleBoxH,littleBoxH,5);

      p5.stroke(...colors.dotStroke);
      p5.fill(...colors.dotFill);

      p5.ellipse(boxes2X + shift, boxY + shift, dotSize, dotSize);
      p5.ellipse(boxes2X + littleBoxH + shift, boxY + shift, dotSize, dotSize);

      p5.stroke(...colors.antidotStroke);
      p5.fill(...colors.antidotFill);
      p5.ellipse(boxes1X + littleBoxH + shift, boxY + shift, dotSize, dotSize);


    }

    p5.pop();
  }



  function drawDotButton() {
    if (!dotButtonOn) return;
    const y = topBoxesY;
    const height = endcapH;
    const x = boxesX;
    const boxW = boxesW / numBoxes;

    p5.push();

    p5.stroke(...colors.dotButtonStroke);
    p5.strokeWeight(1);
    p5.fill(...colors.dotButtonFill);
    p5.rect(x, y, boxW - xSpacer, height, 10);

    p5.textSize(valueTextSize);
    p5.fill(...colors.dotButtonStroke);

    if (addDots) {
      p5.stroke(...colors.dotStroke);
      p5.fill(...colors.dotFill);
    }
    else {
      p5.stroke(...colors.antidotStroke);
      p5.fill(...colors.antidotFill);
    }

    const dotSize = p5.min(dotD, endcapH * 0.75);
    p5.ellipse(x + boxW * 2/3,y + endcapH/2,dotSize, dotSize);

    p5.fill(darkGray);

    const t = 'Add Dot';
    const [textX,textY] = centerTextInRect(p5, x, y, boxW - xSpacer, height, t);
    p5.text('Add', textX, textY);

    p5.pop();
  }


  function drawClearButton() {
    const y = topBoxesY;
    const height = endcapH;
    const x = boxesX;
    const boxW = boxesW / numBoxes;

    p5.push();

    p5.stroke(...colors.dotButtonStroke);
    p5.strokeWeight(1);
    p5.fill(...colors.dotButtonFill);
    p5.rect(x, y, boxW - xSpacer, height, 10);

    p5.textSize(valueTextSize);
    p5.fill(darkGray);

    const t = 'Clear';
    const [textX,textY] = centerTextInRect(p5, x, y, boxW - xSpacer, height, t);
    p5.text('Clear', textX, textY);

    p5.pop();
  }



  ////
  // Main functions affecting model
  /////////////////////////////////////////////////////////////////////////////



  // two opposing dots collide and annihilate
  function dotAnnihilation(id) {
    // look for overlap with an opposing dot in same box
    const opposing = 1 - id[0];
    const sourceDot = dots[id[0]].dots[id[1]][id[2]];
    const opposingDots = dots[opposing].dots;

    for (let i=0; i < opposingDots.length; i++) {
      const opposingDot = opposingDots[id[1]][i];
      if (opposingDot && sourceDot.overlap(opposingDot)) {
        deleteDot(id);
        deleteDot([opposing,id[1],i]);
        currentId = [DotEnum.UNDEF, -1, -1];  // this is confusing, but the incoming dot is always the currentId.  should rewrite to reflect this.
        if (annihilateSound.isLoaded()) {
          annihilateSound.play();
        }
        let event = new CustomEvent('DOT_ANNIHILATE', { detail : 'DOT_ANNIHILATE'});  // trigger DRAG_LEFT event
        div.dispatchEvent(event);
        return true;
      }
    }
    return false;
  }



  // add an antidot to the model
  function addAntidot() {
    dots[1].addDot(p5.mouseX, p5.mouseY, boxes.getBoxID(p5.mouseX, p5.mouseY));
  }



  // add a dot to the model
  function addDot() {
    const boxID = boxes.getBoxID(p5.mouseX, p5.mouseY);
    if (boxID !== DotEnum.UNDEF) {
      dots[0].addDot(p5.mouseX, p5.mouseY, boxID);

      addDotToSum(boxID);
      let event = new CustomEvent('ADD_DOT', { detail : 'ADD_DOT'});  // trigger add dot event
      div.dispatchEvent(event);
    }
  }



  // dots explode as they are moved to the left
  function explodeDot(sendingBox, recievingBox) {

    if (sendingBox + 1 !== recievingBox) {
      alert('You can only drag a dot one box to the left.');
      return false;
    }

    if (sendingBox !== 0 && dots[currentId[0]].dots[sendingBox - 1].length < 1)  {
      alert('The box to the right also needs a dot to do an explosion.');
      return false;
    }



    let newDot = copyInstance(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
    newDot.box = recievingBox;
    newDot.oldx = newDot.rx;
    newDot.oldy = newDot.ry;

    let dotArrayID = currentId[0];

    dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box


    deleteDot(currentId);                            // remove this dot from it's old box

    if (sendingBox !== 0) {
      dots[currentId[0]].dots[sendingBox-1].pop();
    }

    currentId = [DotEnum.UNDEF, -1, -1];    

    let event = new CustomEvent('DRAG_LEFT', { detail : 'DRAG_LEFT'});  // trigger DRAG_LEFT event
    div.dispatchEvent(event);

    return true;
  }


  // // dots explode as they are moved to the left
  // function negaBinaryRule2(sendingBox, recievingBox) {

  //   if (recievingBox === sendingBox + 1) {
  //     const arrayId = currentId[0];
  //     const toggleArrayId = (arrayId === 0 ? 1 : 0);
  //     dots[toggleArrayId].addDot(p5.mouseX, p5.mouseY, currentId[1] + 1);  // add a dot to the next box under the mouse
  //     resetDotPosition(currentId);                                         // send current dot back to old position
  //     toggleDot(currentId);                                                // and toggle it
  //     return true;
  //   }
  //   return false;
  // }


  function addDotToSum(box) {
    currentSum += Math.pow(phi,box - numBoxes/2); 
  }

  function removeDotFromSum(box) {
    currentSum -= Math.pow(phi,box - numBoxes/2);
  }

  function unexplode(sendingBox, recievingBox) {

    if (recievingBox != sendingBox - 1) {
      alert('unexplosion not allowed');
      return false;
    }

    if (recievingBox == 0) {
      alert('unexplosion not allowed because we\'ve run out of boxes');
      return false;
    }

    let newDot = copyInstance(dots[currentId[0]].dots[currentId[1]][currentId[2]]);
    newDot.box = recievingBox;
    newDot.oldx = newDot.rx;
    newDot.oldy = newDot.ry;

    let dotArrayID = currentId[0];

    dots[dotArrayID].pushDot(recievingBox,newDot);   // add this dot to new box
    deleteDot(currentId);                            // remove this dot from it's old box
    currentId = [DotEnum.UNDEF, -1, -1];
    if (sendingBox !== 1) {
      dots[dotArrayID].addDot(p5.mouseX + boxesW/numBoxes + p5.random(-2*dotD, 2*dotD), 
        p5.mouseY + p5.random(-2*dotD, 2*dotD), 
        recievingBox-1);
    }
    
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



  function toggleDot(dotID) {
    const arrayId = dotID[0];
    const toggleArrayId = (arrayId === 0 ? 1 : 0);
    const current_dot = dots[arrayId].dots[dotID[1]][dotID[2]];
    let newDot = copyInstance(current_dot);

    dots[toggleArrayId].pushDot(current_dot.box,newDot);

    dots[arrayId].deleteDot(dotID[1], dotID[2]);          //remove this dot from its old box

    currentId = [DotEnum.UNDEF, -1, -1];
  }



  function setUpBoxes(numberOfDots, dotType, box) {
    let dotArrayID = dotType;
    if (dotArrayID > 1) dotArrayID = 1;
    for (let i=0; i < numberOfDots; i++) {
      const boxW = boxesW/numBoxes;
      const x = boxesX + (numBoxes - box - 1)* boxW + boxW/2;
      const y = boxesY + (boxesH/2);
      dots[1-dotArrayID].addDot(x + p5.random(-2*dotD, 2*dotD), y + p5.random(-2*dotD, 2*dotD), box);
    }

  }

  ////
  // App mouse events
  ////////////////////////////////////////////////////////////////////////////////////////////

  function mouseOnDotButton() {
    if (!dotButtonOn) return;
    if (p5.mouseX < boxesX || p5.mouseX > boxesX + boxesW/numBoxes) return false;
    if (p5.mouseY < topBoxesY || p5.mouseY > topBoxesY + endcapH) return false;
    return true;
  }

  function mouseOnClearButton() {
    if (!dotButtonOn) return;
    if (p5.mouseX < boxesX || p5.mouseX > boxesX + boxesW/numBoxes) return false;
    if (p5.mouseY < topBoxesY || p5.mouseY > topBoxesY + endcapH) return false;
    return true;
  }  

  function mouseOnRuleButton() {
    if (!ruleButtonOn) return;
    if (p5.mouseX < ruleBoxX || p5.mouseX > ruleBoxX + 2 * boxesW/numBoxes) return false;
    if (p5.mouseY < topBoxesY || p5.mouseY > topBoxesY + endcapH) return false;
    return true;
  }


  // Is the mouse in the spacers between the boxes
  // assumes the mouse isn't in a box
  function mouseInSpacers() {
    if (p5.mouseX < boxesX || p5.mouseX > boxesX + boxesW) return false;
    if (p5.mouseY < boxesY || p5.mouseY > boxesY + boxesH) return false;
    return true;
  }



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
            // console.log('mouseOnDot', p5.mouseX, p5.mouseY, x, y, dist, dotD);

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
        if (!dotAnnihilation(currentId)) {
          updatePosition(currentId);
        }
      }
      else {
        if (recievingBox > sendingBox) {            // drag left
          if (standardRule) {
            if (!explodeDot(sendingBox, recievingBox)) {
              resetDotPosition(currentId);            // weren't enough dots, send it back
            }
          }
          else {
            if (!negaBinaryRule2(sendingBox, recievingBox)) {
              resetDotPosition(currentId);
            }
          }
        }
        else {                                      // drag right
          if (!unexplode(sendingBox, recievingBox)) {
              resetDotPosition(currentId);            // weren't enough dots, send it back
            }
        }
      }
    }
    else {                                          // we've dragged a dot out of box region
      if (mouseInSpacers()) {                       // between the boxes
        resetDotPosition(currentId);
      }
      else {                                        // out of the boxes
        if(mouseOnDot()) {
          if (removeDotsAllowed) {
            deleteDot(currentId);
            removeDotFromSum(currentId[1]);
            currentId = [DotEnum.UNDEF,-1,-1];

            let event = new CustomEvent('DRAG_DOT_OUT', { detail : 'DRAG_DOT_OUT'});  // trigger add dot event
            div.dispatchEvent(event);
          }
          else { resetDotPosition(currentId); }
        }
      }
    }
  };



  this.mousePressed = function()
  {
    if (mouseOnClearButton()) {  
      for (let i=0; i < dots[0].dots.length; i++) {
        while (dots[0].dots[i].length > 0) {
          dots[0].dots[i].pop();
        }
      }
      currentSum = 0;
    }
    if (mouseOnRuleButton()) {  
      standardRule = !standardRule;  
      let event = new CustomEvent('CLICK_RULE', { detail : 'CLICK_RULE'});  // trigger add dot event
      div.dispatchEvent(event);
    }

    if (mouseOnBoxes() && !mouseOnDot() && addDotsAllowed) {
      if (addDots) {
        addDot();
      }
      else {
        addAntidot();
        console.log('adding antidot');
      }
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
    dots[1].draw();
    //drawValueBoxes();
    drawCodeBoxes();
    drawSummaryBox();
    drawClearButton();
    //drawDotButton();
    //drawRuleButton();
    for (let i=0; i < popups.length; i++) {
      popups[i].draw();
    }
  };

  this.windowResized = function(width,height)
  {

    canvasW = width;
    canvasH = height;


    const minHeight = 200;
    if (canvasH < minHeight) {
      canvasH = minHeight;
    }

    endcapH = canvasH * 0.08;
    boxesW = canvasW * 0.85; // width of all the boxes together

    const boxWidth = boxesW / numBoxes;

    boxesH = boxWidth;
    //boxesH = canvasH * 0.25; // height of boxes
    codeInset = boxesW * 0.05;
    boxesX = (width - boxesW) / 2;
    
    boxTextSize = boxesH * 0.5;  // text size
    valueTextSize = endcapH * 0.5;

    dotD = 50;  // default value in case p5 isn't defined yet

    if (p5 != null) {
      dotD = p5.min(boxWidth * 0.2, boxesH * 0.2);
    }
    
    boxesX -= dotD;

    xSpacer = dotD/2;
    ySpacer = dotD/2;

    
    boxesY = (canvasH - boxesH + endcapH + ySpacer) / 2;  // these are dependant on ySpacer
    const boxW = boxesW / numBoxes - ySpacer;


    if (firstTimeResized) { firstTimeResized = false;}
    else {
      const t = '-' + p5.abs(p5.pow(base,numBoxes-1)).toString();  // calculate the font size
      p5.push();
      p5.textSize(boxTextSize);
      while (p5.textWidth(t) > boxW) {
        boxTextSize *= 0.75;
        p5.textSize(boxTextSize);
      }
      p5.pop();
    }
  
    
    topBoxesY = boxesY - 2*ySpacer - 2*endcapH;
    valueBoxesY = boxesY - ySpacer - endcapH;
    codeBoxesY = boxesY + boxesH + ySpacer;
    ruleBoxX = boxesX + boxWidth;

    if (boxes != null) {
      boxes.updateSize(boxesX, boxesY, boxesW, boxesH, boxTextSize, xSpacer, dotD);
    }

    for (let i=0; i < popups.length; i++) { popups[i].resize(canvasW,canvasH); }
  };


  this.loadSounds = function() {
    addDotSound = p5.loadSound(addDotSoundFile);
    annihilateSound = p5.loadSound(annihilateSoundFile);
  };

  this.setup = function(b, n, color = 'green', tutorial = false) {

    if (tutorial) { this.turnOnTutorial(); }

    if (color in colorSchemes) { 
      colors = new AppColors(...colorSchemes[color]);
    }
    else {
      console.log('unknown color scheme');
      colors = new AppColors(...colorSchemes['green']);
    }

    base = b;
    numBoxes = n;

    if (base === -2) {
      negaBinary = true;
      ruleButtonOn = true;
    }

    boxes = new Boxes(p5, base, numBoxes, boxesX, boxesY, boxesW, boxesH, boxTextSize, xSpacer,dotD, colors.boxFill, colors.boxStroke);
    dots = [];
    dots.push(new DotArray(p5, numBoxes, colors.dotFill, colors.dotStroke, boxes));
    dots.push(new DotArray(p5, numBoxes, colors.antidotFill, colors.antidotStroke, boxes));
    if (numBoxes < 4) ruleButtonOn = false;

    addEventListeners();

    let event = new CustomEvent('BEGIN', { detail : 'BEGIN'});  // trigger DRAG_LEFT event
    div.dispatchEvent(event);
  };

  this.turnOffAddDotButton = function() {  dotButtonOn = false; };

  this.turnOffRuleButton = function() {  ruleButtonOn = false; };

  this.allowAddDots = function(b) { addDotsAllowed = b; };

  this.allowRemoveDots = function(b) { removeDotsAllowed = b; };

  this.addDotsToBox = function(numberOfDots, dotType, box) {  
    setUpBoxes(numberOfDots, dotType, box);
  };

  this.setUpDotsAfterTutorial = function(numberOfDots, dotType, box) {
    dotsetup = [numberOfDots, dotType, box];
  };

  this.setAlphabetSymbols = function(a) {
    if (a.length > 1) {
      alphabet = a;
      base = alphabet.length;
      boxes.base = alphabet.length;
      negaBinary = false;
      ruleButtonOn = false;
    }
  };

  this.addInstructions = function(popup) {
    popups.push(popup);
  };

  this.turnOnTutorial = function() {
    popups.push(new Popup(p5, 0.03, 0.3,  0.25, 'BEGIN', 'ADD_DOT', 'BEGIN', 'Click on a box to add a DOT.'));
    popups.push(new Popup(p5, 0.4, 0.05, 0.2, 'ADD_DOT', 'CLICK_ADD', 'BEGIN', 'Click the Add button to switch to adding ANTIDOTS.'));
    popups[popups.length - 1].setArrow(0.32, 0.08);
    popups.push(new Popup(p5, 0.03, 0.6,  0.25, 'CLICK_ADD', 'DOT_ANNIHILATE', 'ADD_DOT', 'If you have a DOT and an ANTIDOT in the same box, drag them together to annihilate them.'));
    popups.push(new Popup(p5, 0.03, 0.45,  0.25, 'DOT_ANNIHILATE', 'DRAG_DOT_OUT', 'CLICK_ADD', 'Drag a DOT out of the boxes to delete it.'));
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
  exports.Popup = Popup;

});




