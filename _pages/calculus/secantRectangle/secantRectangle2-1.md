---
title: Secant Rectangle 
header: 'none'
lesson: 'secant_rectangle'
smartdown: true
ogimage: /assets/images/calculus/ftc1.jpg
---

# :::: clue
# --outlinebox
The function $f(x) = -t^2 + 2t + 4$ shows the velocity of an object in meters per second.  Estimate the objects average speed during the time interval $0 \leq t \leq 6$?  You can round your estimate to the nearest integer.
# --outlinebox
# ::::

# :::: notes
# --partialborder

# --partialborder
# ::::



[?](::clue/button,transparent,draggable,closeable,center,outline,lightbox,shadow) [note](::notes/button,transparent,draggable,closeable,center,outline,shadow) [see object move](:=play=true) [reset](:=reset=true)[Submit Solution](:=compute=true)  

# :::: answerbar
Estimate the average velocity during time interval $0 \leq t \leq 6$ [](:?s1) m/s
# ::::

# :::: toolbar
```javascript /autoplay/p5js
///////////////////////////////////////////////////////////////////
// this is a script for a RESOURCE PANEL toolbar
///////////////////////////////////////////////////////////////////


// import the calc library
//smartdown.import=/assets/libs/toolbar.js

const myDiv = this.div;
myDiv.style.background = '#FFFFFF';
myDiv.style.borderRadius = '8px';

let maxButtons = 6;
let xSpacer = 10, ySpacer = 5, width = 40;
let B = new ResourcePanel(p5);

///////////////////////////////////////////////////////////////////
// Add the buttons you want on your resource panel
// NOTE:  The value of page variable env.numButtons should match the number of buttons you add here

B.addButton('secant rectangle array'); 

smartdown.setVariable('numButtons', 1);  // keep track of number of buttons

///////////////////////////////////////////////////////////////////


p5.setup = function() { 
  let canvasWidth = xSpacer + (width + xSpacer) * maxButtons;  // set the size of the playable
  let canvasHeight = width + 3 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
};

///////////////////////////////////////////////////////////////////


p5.setup = function() { 
  let canvasWidth = xSpacer + (width + xSpacer) * maxButtons;  // set the size of the playable
  let canvasHeight = width + 3 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
};


p5.draw = function() {  // draw the buttons
  B.draw(p5.mouseX,p5.mouseY);
}


p5.mousePressed = function()     // this function is called everytime the user clicks the mouse
{
  const [bType, state, id] = B.mousePressed();  // returns info on the button pushed
  
  if (id != -1) {                              // if it's a valid button
    smartdown.setVariable('buttonType', bType);         // set page mode correct type of button
    smartdown.setVariable('active', true);     // alert page we have an active button
  }
  
  // p5.loop();    // EnergyHack to enable looping for duration of drag.
};


p5.mouseReleased = function() {     // this function is called when the user releases the mouse
                                    // button after a click.

  // EnergyHack to stop looping 5 sec after release.
//  window.setTimeout(function() {
//    p5.noLoop();
//  }, 5000);
};


//////////////////////////////////////////////////////////////////////////////
// Event handling

smartdown.setVariable('buttonType', 0);
smartdown.setVariable('active', false);

this.dependOn = ['numButtons'];  // if we're removing buttons the numButtons will go down
this.depend = function() {
  
  if (env.numButtons < B.size()) {  // If we have more buttons than the page has elements, delete the active button
    B.removeActiveButton();  // we've used this resource
    smartdown.setVariable('active', false);
    if (B.size() == 0) { p5.noLoop(); }
  }

  if (B.size() == 0) {
    smartdown.hideDisclosure('toolbar','','');
    smartdown.showDisclosure('answerbar','','transparent');
  }
};

```
# ::::

# :::: success
Success! 
[Continue](/pages/secantRectangle3)
# ::::

# :::: keeptrying
Keep trying. 
# ::::

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

smartdown.showDisclosure('toolbar','','transparent');


const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='left' style='height:500px; width:80%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:500px; width:19%; float:left; border: 1px solid gray;background:#EEFFFF;border-radius:8px;';></div>`;


let xlow = -2;
let xhigh = 7;
let ylow = -31;
let yhigh = 30;

let answer = 40;
let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'time(s)', ylabel:'velocity (m/s)'});


let F = new ProblemFunction(function(x) {  return - Math.pow(x,2) + 2*x + 4; }, 
  '', 3.5, [xlow,xhigh], [0,6]);
let F_id = workspace.addFunction(F);

let t = workspace.board.create('point', [0,0], {visible:false});
var p = workspace.board.create('point', [
  function() { return t.X(); }, 
  function() { return F.f(t.X()); }], {color:'#EE9900', name:''});


let board2 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,30,2,-31], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

let board2Yaxis = board2.create('axis', [[0, 0], [0, 1]], 
      {name:'m', 
      withLabel: true, 
      label: {
        fontSize: 20,
        position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
        offset: [-30, -20]   // (in pixels)
        }
      });  
board2Yaxis.removeAllTicks();

// let board2Xaxis = board2.create('axis', [[0, 0], [1,0]], 
//       {name:'', 
//       withLabel: false,
//       label: {
//         fontSize: 20,
//         position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
//         offset: [-20, 20]   // (in pixels)
//       },
//       majorHeight:0
//       });

// board2Xaxis.removeAllTicks();

workspace.board.addChild(board2);

let position = function(t) { return - Math.pow(t,3)/3 + t * t + 4 * t; };

let p2 = board2.create('point', [
  1, 
  function() { return position(t.X()); }], {color:'#EE9900', name:'', size:6});

////////////////////////////////////////////////////////////////////////////////////


// Event handling
let checkAnswer = function() {
  return env.s1 == '-2';
};


let useButton = function(mouseX, buttonType) {
  let pixelwidth = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - pixelwidth)/2;
  let percent = (mouseX - margin) / pixelwidth;


  let boardwidth = xhigh - xlow;
  let x1 = xlow + boardwidth * percent;
  let x2 = x1 + boardwidth * 0.4;
  if (x2 > xhigh) { x2 = xhigh; }
  
  workspace.addElementByID(5, percent, F_id, {
    annotations:'secant', 
    attachButtonVisible:false, 
    change:'m',
    annotationPosition:'after'
  });
  workspace.elements[workspace.elements.length-1].attachButton.toggle();
  
  smartdown.setVariable('numButtons', env.numButtons - 1);  // keep track of resources
};


this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e.clientX, env.buttonType);
  }
};


let widthPercent = 0.8;
let heightPercent = 0.7;
let widthRatio = 1/6;

this.sizeChanged = function() {     
  workspace.board.resizeContainer((1 - widthRatio - 0.01) * window.innerWidth * widthPercent, window.innerHeight * heightPercent);
  board2.resizeContainer(widthRatio * window.innerWidth * widthPercent,  window.innerHeight * heightPercent);
};


this.sizeChanged();


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
});

let move = function() { 
  t.moveTo([xhigh - 0.1,0],1000, {effect: '--' } ); 
};


smartdown.setVariable('compute', false);
smartdown.setVariable('error', 100);
smartdown.setVariable('s1', '');
smartdown.setVariable('play', false);
smartdown.setVariable('reset', false);

this.dependOn = ['compute', 'active', 'play','reset'];
this.depend = function() {

  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();

  }
  if (env.reset == true) {
    smartdown.setVariable('reset', false);
    t.moveTo([0,0]);
  }

  if (env.active == true) {
    myDiv.style.cursor = "url('/assets/images/calculus/SRCursor.svg'), auto";
  }
  else {
    myDiv.style.cursor = "default";
  }

  if (env.compute == true) {
    smartdown.setVariable('compute', false);
    if (checkAnswer()) {
      smartdown.showDisclosure('success','','draggable,closeable,center,shadow');
      smartdown.hideDisclosure('keeptrying','','');
    }
    else {
      smartdown.showDisclosure('keeptrying','','draggable,closeable,center,shadow');
      smartdown.hideDisclosure('success','','');
    }
  }

};



```
