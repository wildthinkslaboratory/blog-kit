# :::: clue
# --outlinebox
##### Rocket Launch
Here is a graph showing the velocity of a rocket during it's first launch phase. Estimate the height of the rocket 120 seconds after lift off? 
# --outlinebox
# ::::

# :::: notes
# --aliceblue
##### Note

# --aliceblue
# ::::


[Problem](::clue/button,transparent,draggable,closeable,outline,lightbox,center,shadow) [Submit Solution](:=compute=true) You have a rectangle array!

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

B.addButton('rectangle array');

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
     if (B.size() == 0) { p5.noLoop(); }
  }
};

```

# :::: success
Success! 
Error of [](:!error)%. 
[note](::exitnotes/button,transparent,draggable,closeable,outline,topleft,shadow) [Continue](/pages/rectangleAUC)
# ::::

# :::: keeptrying
Keep trying. 
Error of [](:!error)%.  The error must be below 0.1%.
# ::::

# :::: exitnotes
# --partialborder
If you've come this far, you may have achieved an error that says 0.00% correct.  However, you used at most 100 rectangles to achieve that error.  So theoretically, you could have improved your estimate even more by using 200 rectangles.  This is actually true.  200 rectangles is more accurate than 100 rectangles.  The 100 rectangle solution isn't actually perfect and produces a small error, but we round that error to two decimal points which makes it look like it's perfect.  
This is just part of the difficulty of solving these problems with computers.  Computers require us to set bounds on precision and often we can't get exact results.  In this case, we could have set the precision of our answer to three decimal points.  Maybe then we could see the difference between a 100 rectangle approximation and a 200 rectangle approximation.  Of course we likely couldn't see the difference between a 200 rectangle approximation and a 400 rectangle approximation.  These issues are unavoidable using our current strategies.  Later we will see a symbolic way of solving these types of problems that will give us exact answers.
# --partialborder
# ::::

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='left' style='height:700px; width:75%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:700px; width:24%; float:left; border: 1px solid gray;background:#CCEEFF;border-radius:8px;';></div>`;

let workspaceDivWidth = 0.75;
let pictureDivWidth = 0.24;
let workspaceDivHeight = 700;
let pictureDivHeight = 700;

let xlow = -30;
let xhigh = 180;
let ylow = -200;
let yhigh = 2000;

let c = 19 / 7200;
let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'time (s)', ylabel:'velocity (m/s)'});

workspace.xaxis.removeAllTicks();

workspace.board.create('ticks', [workspace.xaxis, 30], { // The number here is the distance between Major ticks
  strokeColor:'#999',
  majorHeight:20, // Need this because the JXG.Options one doesn't apply
  drawLabels:true, // Needed, and only works for equidistant ticks
  minorTicks:2, // The NUMBER of small ticks between each Major tick
  drawZero:true
 }
);

let F = new ProblemFunction(function(x) { return c * Math.pow(x,3) / 3; }, 
  'velocity of rocket', 100, [0,xhigh], [0,120]);
let F_id = workspace.addFunction(F);


////////////////////////////////////////////////////////////////////////////////////

let Atext = workspace.board.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.8 * (yhigh - ylow),
  function() { return 'Total Area = ' + workspace.area().toFixed(2); }], {
  fontSize:20,
  visible:true
});


/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,60000,2,-5000], keepaspectratio:false, axis:true, showCopyright:false, showNavigation:false});


workspace.board.addChild(board1);

let rocketurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/cab590371e4346929cf9096e53d163e772e1d132/rocket.png';
let rocket = board1.create('image',[rocketurl, [0.9,function() { return workspace.area() - 3000; }], [0.2,3000]]);

let p2 = board1.create('point',[1.2, 0],{visible:false});
let p3 = board1.create('point',[1.2, function() { return workspace.area(); }],{visible:false});

let dimensionLine = board1.create('segment', [p2,p3], {
  strokeColor:'#999999', 
  strokeWidth:2, 
  firstArrow:true, 
  lastArrow:true, 
  visible:true});

let dimensionText = board1.create('text', [
  1.3,
  function () { return workspace.area() / 2; },
  function() { return workspace.area().toFixed(0); }
],{ strokeColor:'#999999', fontSize: 15, visible:true});

let computeError = function() {
  return 100 * Math.abs(1 - workspace.area() / 45600);
};

/////////////////////////////////////////////////////////////////////////////////////////

// Event handling
let checkAnswer = function() {
  let error = computeError().toFixed(2);
  smartdown.setVariable('error', error);
  return error < 0.1;
};

let useButton = function(mouseX, buttonType) {
  let width = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - width)/2;
  let percent = (mouseX - margin) / (width * (1 - widthRatio - 0.01));
  workspace.addElementByID(3, percent, F_id, {
    snapMargin:0.5
  });
  smartdown.setVariable('numButtons', env.numButtons - 1);  // keep track of resources
};

this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e.clientX, env.buttonType);
  }
};

let widthPercent = 0.8;
let heightPercent = 0.7;
let widthRatio = 1/4;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent * (1 - widthRatio - 0.02), window.innerHeight * heightPercent);      
  board1.resizeContainer(window.innerWidth * widthPercent * widthRatio, window.innerHeight * heightPercent);
};

this.sizeChanged();

workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
});

smartdown.setVariable('compute', false);
smartdown.setVariable('error', 100);
smartdown.setVariable('undo', false);

this.dependOn = ['compute', 'undo', 'active'];
this.depend = function() {

  if (env.active == true) {
    myDiv.style.cursor = "url('/assets/images/calculus/rectCursor.svg'), auto";
  }
  else {
    myDiv.style.cursor = "default";
  }

  if (env.compute == true) {
    smartdown.setVariable('compute', false);
    if (checkAnswer()) {
      smartdown.showDisclosure('success','','draggable,closeable,lightbox,center,shadow');
      smartdown.hideDisclosure('keeptrying','','');
    }
    else {
      smartdown.showDisclosure('keeptrying','','draggable,closeable,lightbox,center,shadow');
      smartdown.hideDisclosure('success','','');
    }
  }

  // if (env.undo == true) {                // uncomment if you want an undo button
  //   workspace.undo();
  //   smartdown.setVariable('undo', false);
  // }
};



```

