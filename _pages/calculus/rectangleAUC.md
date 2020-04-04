---
title: Rectangle 
header: 'none'
smartdown: true
---

# :::: clue
# --outlinebox
##### Area Underneath a Curve
What is the area underneath the curve $f(x) = - \frac{x^3}{8} + x^2$ between $x=2$ and $x=8$.
# --outlinebox
# ::::

# :::: toolbar
[?](::clue/button,transparent,draggable,closeable,center,shadow) [Submit Solution](:=compute=true) [Undo](:=undo=true)

```javascript /autoplay/p5js
// import the calc library
//smartdown.import=/assets/libs/toolbar.js


const myDiv = this.div;
myDiv.style.background = '#FFFFFF';
myDiv.style.borderRadius = '8px';

let numButtons = 6;
let xSpacer = 10, ySpacer = 10, width = 40;
let B = new ToolPanel(p5,width,xSpacer,ySpacer);

B.addButton('rectangle');
B.addButton('rectangle array');
//B.initialize();


p5.setup = function() { 
  var canvasWidth = xSpacer + (width + xSpacer) * numButtons;  // set the size of the playable
  var canvasHeight = width + 3 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
};


p5.draw = function() {
  B.draw(p5.mouseX,p5.mouseY);
}

p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  const [name, state, id] = B.mousePressed();
  
  if (id != -1) {
    smartdown.setVariable('mode', name);
  }
  

  // EnergyHack to enable looping for duration of drag.
  p5.loop();

};


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse
                          // button after a click.

  // EnergyHack to stop looping 5 sec after release.
//  window.setTimeout(function() {
//    p5.noLoop();
//  }, 5000);
};

```
# ::::

# :::: success
Success! 
Error of [](:!error)%. 
[Continue](/pages/work)
# ::::

# :::: keeptrying
Keep trying. 
Error of [](:!error)%.  The error must be below 2%.
# ::::

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

smartdown.showDisclosure('toolbar', '', 'transparent');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;


let xlow = -2;
let xhigh = 12;
let ylow = -5;
let yhigh = 12;

let f = function(x) { return -Math.pow(x,3)/8 + Math.pow(x,2); };
let answer = 40;

// create the first board
JXG.Options.axis.ticks.majorHeight = 40;

let sfboard = new SingleFunctionBoard('box', 
  [xlow,yhigh,xhigh,ylow], 
  f,
  { xName: 'x', yName: 'f(x)', startX:0, endX:8, flabel: '', flabelX:3.5, flabelY:11});


let workspace = new WorkSpace(sfboard.board);


////////////////////////////////////////////////////////////////////////////////////
// Here is where you configure the workspace based on what elements you want to 
// add.  

workspace.setSnapMargin(0.05);


////////////////////////////////////////////////////////////////////////////////////

let Atext = sfboard.board.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.8 * (yhigh - ylow),
  function() { return 'Total Area = ' + workspace.getArea().toFixed(2); }], {
  fontSize:20,
  visible:true
});

let computeError = function() {
  return 100 * Math.abs(1 - workspace.getArea() / 40);
};

// Event handling
let checkAnswer = function() {
  let error = computeError().toFixed(2);
  smartdown.setVariable('error', error);
  return error < 2;
};


this.div.onmousedown = function(e) { 
  
  let width = myDiv.offsetWidth;
  let margin = (window.innerWidth - width)/2;
  let percent = (e.clientX - margin) / width;

  if (env.mode >= 0) {
    workspace.addElement(env.mode, percent, f);
  }

};

let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {     
  workspace.resize(window.innerWidth * widthPercent, window.innerHeight * heightPercent);
};

this.sizeChanged();

sfboard.board.on('update', function() {
  workspace.boardUpdate();              // hook up workspace update functions
});

smartdown.setVariable('compute', false);
smartdown.setVariable('error', 100);
smartdown.setVariable('undo', false);

this.dependOn = ['compute', 'undo'];
this.depend = function() {
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

  if (env.undo == true) {                // uncomment if you want an undo button
    workspace.undo();
    smartdown.setVariable('undo', false);
  }
};


```

