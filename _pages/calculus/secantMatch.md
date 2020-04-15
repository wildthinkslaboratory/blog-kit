---
title: Secant Rectangle
header: 'none'
smartdown: true
---

# :::: clue
# --outlinebox
Clue
# --outlinebox
# ::::

[?](::clue/button,transparent,draggable,closeable,center,shadow) Have a segment.

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

B.addButton('rectangle'); 

smartdown.setVariable('numButtons', 1);  // keep track of number of buttons

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
  }
};

```

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:800px; width:800px'>`;

let xlow = -2;
let xhigh = 10;
let ylow = -2;
let yhigh = 30;


let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'x', ylabel:'y'});
let xinterval = new XInterval(workspace.board, 2,6);
let rectangle = new Rectangle(xinterval,  function(x) { return x; }, { 
    annotations: 'on',
    snapMargin:0.5
  });

rectangle.xint.x1.setAttribute({fixed:true, color:'#3344AA'});
rectangle.xint.x2.setAttribute({fixed:true, color:'#3344AA'});
let segment;


/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

this.div.onmousedown = function(e) { 

  if (segment == undefined) {
    // we pass in percents into the constructor
    let percentX = (e.clientX - myDiv.offsetLeft) / myDiv.offsetWidth;
    let percentY = 1 - (e.clientY - myDiv.offsetTop) / myDiv.offsetHeight;
    let bb = workspace.board.getBoundingBox();
    let x = bb[0] + (bb[2] - bb[0]) * percentX;
    let y = bb[3] + (bb[1] - bb[3]) * percentY;
    segment = new Segment(workspace.board, [x,y], [x+1,y+1], {annotations:'on', snapMargin:0.5});
  }
  
};




let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};

this.sizeChanged();


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
  if (segment !== undefined) { segment.onUpdate(); }
});





```

