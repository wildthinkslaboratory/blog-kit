---
title: Rectangle 
header: 'none'
smartdown: true
---

# :::: clue
# --outlinebox
##### Rocket Launch
Here is a graph showing the speed of a rocket during it's first launch phase. Estimate the height of the rocket 120 seconds after lift off? 
# --outlinebox
# ::::

# :::: notes
# --aliceblue
##### Note 
What should the dimensions of this rectangle be?  The time will be 120 seconds, but what is the rate?  It's not clear what the average speed of the rocket is.  But we now have four rectangles!
# --aliceblue
# ::::

# :::: exitnotes
# --aliceblue
Each rectangle in our solution estimates the distance traveled during a time interval.  By breaking the problem down into smaller pieces we can make better use of the information from the speed graph.  

As the intervals get smaller, the height of the rectangle more accurately represents the average speed for that interval.  This makes the overall estimate better.  Of course why should we stop at four intervals?  How far can we push this idea?
# --aliceblue
# ::::

# :::: toolbar
[?](::clue/button,transparent,draggable,closeable,center,shadow) [N](::notes/button,transparent,draggable,closeable,center,shadow) [Submit Solution](:=compute=true) You have [](:!numButtons) rectangle(s). 

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

for (let i=0; i < 4; i++) {
  B.addButton('rectangle');
}

smartdown.setVariable('numButtons', 4);  // keep track of number of buttons

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
# ::::

# :::: success
Success! 
Error of [](:!error)%. 
[N](::exitnotes/button,transparent,draggable,closeable,topleft,shadow) [Continue](/pages/rectangle5)
# ::::

# :::: keeptrying
Keep trying. 
Error of [](:!error)%.  The error must be below 5%.

# :::: more_rectangles
Try using more rectangles!
# ::::
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
myDiv.innerHTML = `<div id='left' style='height:700px; width:75%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:700px; width:24%; float:left; border: 1px solid gray;background:#CCEEFF;border-radius:8px;';></div>`;

let xlow = -30;
let xhigh = 150;
let ylow = -200;
let yhigh = 2000;

let c = 19 / 7200;
let f = function(x) { return c * Math.pow(x,3) / 3; };

let sfboard = new SingleFunctionBoard('left', 
  [xlow,yhigh,xhigh,ylow], 
  f,
  { xName: 'time (s)', yName: 'speed (m/s)', startX:0, endX:120, flabel: 'speed of rocket', flabelX:100, flabelY:1400});


let workspace = new WorkSpace(sfboard.board);

////////////////////////////////////////////////////////////////////////////////////
// Here is where you configure the workspace based on what elements you want to 
// add.  

workspace.setSnapMargin(0.5);

////////////////////////////////////////////////////////////////////////////////////

let Atext = sfboard.board.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.8 * (yhigh - ylow),
  function() { return 'Total Area = ' + workspace.getArea().toFixed(2); }], {
  fontSize:20,
  visible:true
});


/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,60000,2,-5000], keepaspectratio:false, axis:true});


sfboard.board.addChild(board1);

let rocketurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/cab590371e4346929cf9096e53d163e772e1d132/rocket.png';
let rocket = board1.create('image',[rocketurl, [0.9,function() { return workspace.getArea() - 3000; }], [0.2,3000]]);

let p2 = board1.create('point',[1.2, 0],{visible:false});
let p3 = board1.create('point',[1.2, function() { return workspace.getArea(); }],{visible:false});

let dimensionLine = board1.create('segment', [p2,p3], {
  strokeColor:'#999999', 
  strokeWidth:2, 
  firstArrow:true, 
  lastArrow:true, 
  visible:true});

let dimensionText = board1.create('text', [
  1.3,
  function () { return workspace.getArea() / 2; },
  function() { return workspace.getArea().toFixed(0); }
],{ strokeColor:'#999999', fontSize: 15, visible:true});

let computeError = function() {
  return 100 * Math.abs(1 - workspace.getArea() / 45600);
};

/////////////////////////////////////////////////////////////////////////////////////////

// Event handling
let checkAnswer = function() {
  let error = computeError().toFixed(2);
  smartdown.setVariable('error', error);
  return error < 5;
};

let useButton = function(mouseX, buttonType) {
  let width = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - width)/2;
  let percent = (mouseX - margin) / (width * (1 - widthRatio - 0.01));
  workspace.addElement(buttonType, percent, f);
  smartdown.setVariable('numButtons', env.numButtons - 1);  // keep track of resources
};



this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e.clientX, env.buttonType);
  }
};


this.sizeChanged = function() {
  workspace.resize(myDiv.offsetWidth * workspaceDivWidth, workspaceDivHeight);       
  board1.resizeContainer(myDiv.offsetWidth * pictureDivWidth, pictureDivHeight);
};

let widthPercent = 0.8;
let heightPercent = 0.7;
let widthRatio = 1/4;

this.sizeChanged = function() {
  workspace.resize(window.innerWidth * widthPercent * (1 - widthRatio - 0.01), window.innerHeight * heightPercent);      
  board1.resizeContainer(window.innerWidth * widthPercent * widthRatio, window.innerHeight * heightPercent);
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
      if (env.numButtons != 0) {
        smartdown.showDisclosure('more_rectangles','','transparent');
      }
      else {
        smartdown.hideDisclosure('more_rectangles','','');
      }
      smartdown.showDisclosure('keeptrying','','draggable,closeable,center,shadow');
      smartdown.hideDisclosure('success','','');
    }
  }

  // if (env.undo == true) {                // uncomment if you want an undo button
  //   workspace.undo();
  //   smartdown.setVariable('undo', false);
  // }
};



```
