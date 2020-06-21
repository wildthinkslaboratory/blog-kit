---
title: Secant
header: 'none'
lesson: 'secant'
smartdown: true
ogimage: /assets/images/calculus/secant.jpg
---

# :::: clue
# --outlinebox question
###### Car Ride
The graph shows the position of the car through time.  Use the **secant** find the average velocity the car is traveling during these time periods: $3 \leq t \leq 4$, $3 \leq t \leq 3.5$ and $3 \leq t \leq 3.25$. 
# --outlinebox
# ::::


[Problem](::clue/button,transparent,draggable,closeable,center,lightbox,outline,shadow) [Drive!](:=play=true) [Submit Solution](:=compute=true) Here's another secant. 
# :::: answerbar
$3 \leq t \leq 4$ [](:?s1)  $3 \leq t \leq 3.5$ [](:?s2) $3 \leq t \leq 3.25$ [](:?s3) 
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

B.addButton('secant'); 

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
  
  p5.loop();    // EnergyHack to enable looping for duration of drag.
};


p5.mouseReleased = function() {     // this function is called when the user releases the mouse
                                    // button after a click.

 // EnergyHack to stop looping 5 sec after release.
 window.setTimeout(function() {
   p5.noLoop();
 }, 5000);
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
[Continue](/pages/secant4)
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
myDiv.innerHTML = `<div id='top' style='height:100px; width:100%; border:1px solid gray;background:#EEFFCC;border-radius:8px;'></div><div id='bottom' style='height:600px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;

let xlow = -2;
let xhigh = 10;
let ylow = -10;
let yhigh = 50;

let workspace = new Workspace('bottom', [xlow,yhigh,xhigh,ylow], 
  { xlabel:'time (s)', ylabel:'distance (m)'});
workspace.xaxis.removeAllTicks();

workspace.board.create('ticks', [workspace.xaxis, 1], { // The number here is the distance between Major ticks
  strokeColor:'#999',
  majorHeight:10, // Need this because the JXG.Options one doesn't apply
  drawLabels:true, // Needed, and only works for equidistant ticks
  minorTicks:3, // The NUMBER of small ticks between each Major tick
  drawZero:true
 }
);


let F = new ProblemFunction(function(x) { return x * x; }, 'position of car', 3.5, [xlow,xhigh], [3, 3.5, 4, 5]);
let F_id = workspace.addFunction(F);


let t = workspace.board.create('glider', [0,0, workspace.xaxis], {name:'', face:'^', size:12, color:'green'});

let p = workspace.board.create('point', [
  function() { return t.X(); }, 
  function() { return F.f(t.X()); }], {color:'green', name:''});

/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-20,5,100,-2], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

workspace.board.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'meters', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis1 = board1.create('axis', [[0, 0], [0, 1]], 
  {name:'', 
    withLabel: false, 
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    },
    ticks: {visible:false}
  }); 


let carurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/9e01e8197b3bf685747ae134de3d75feb64ea6f4/car.png';
let car = board1.create('image',[carurl, [function() { return F.f(t.X()) -4 ; },-0.2], [4,2]]);

/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

let useButton = function(mouseX, buttonType) {
  let width = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - width)/2;
  let percent = (mouseX - margin) / width;

  workspace.addElementByID(buttonType, percent, F_id, {
    change:'distance', 
    rate:'rate', 
    units:'time',
    annotations:'on',
    showUnits:true 
  });  
  smartdown.setVariable('numButtons', env.numButtons - 1);  // keep track of resources
};

this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e.clientX, env.buttonType);
  }
};

let move = function() { 
  t.moveTo([9.9,0],5000, {effect: '--'} ); 
}


let widthPercent = 0.8;
let heightPercent = 0.7;
let heightRatio = 1/6;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, (1-heightRatio) * window.innerHeight * heightPercent);       
  board1.resizeContainer(window.innerWidth * widthPercent, heightRatio * window.innerHeight * heightPercent);
};

this.sizeChanged();


let checkSnap = function(point) {       // snap to 0.25 intervals
  let xval = point.X() * 4;
  let floor = Math.floor(xval);           // are we close to the lower integer?
  if (xval < floor + 0.5) {
    point.moveTo([floor/4,0]);
  }
  else {                                         // are we close to the higher integer?
    let ceiling = Math.ceil(xval);
    if (xval > ceiling - 0.5) {
      point.moveTo([ceiling/4,0]);
    }
  }
}


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
  if (workspace.elements.length > 0) {
    let xint = workspace.elements[workspace.elements.length - 1].xint;
    checkSnap(xint.x1);
    checkSnap(xint.x2);
  }
});


smartdown.setVariable('play', false);

this.dependOn = ['play','compute','active'];
this.depend = function() {

  if (env.active == true) {
    myDiv.style.cursor = "url('/assets/images/calculus/sectCursor.svg'), auto";
  }
  else {
    myDiv.style.cursor = "default";
  }

  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();
  }
};



```

```javascript /autoplay

function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}


smartdown.setVariable('s1', '');
smartdown.setVariable('s2', '');
smartdown.setVariable('s3', '');
smartdown.setVariable('compute', false);


this.dependOn = ['s1', 's2', 's3', 'compute'];
this.depend = function() {

  removeEnterFromSmartdownString('s1', env.s1);
  removeEnterFromSmartdownString('s2', env.s2);
  removeEnterFromSmartdownString('s3', env.s3);

  if (env.compute == true) {
    smartdown.setVariable('compute', false);
    if (env.s1 == 7 && env.s2 == 6.5 && env.s3 == 6.25) {
      smartdown.showDisclosure('success','','draggable,closeable,center,shadow,lightbox');
      smartdown.hideDisclosure('keeptrying','','');
    }
    else {
      smartdown.showDisclosure('keeptrying','','draggable,closeable,center,shadow,lightbox');
      smartdown.hideDisclosure('success','','');
    }
  }

}

```