# :::: clue
# --outlinebox question
###### Rocket Launch
Here is a graph showing the velocity of a rocket during it's first launch phase. Estimate the acceleration of the rocket at 60 seconds and 120 seconds after lift off. 
# --outlinebox
# ::::


[Problem](::clue/button,transparent,draggable,closeable,lightbox,outline,center,shadow) [Launch!](:=play=true) [Submit Solution](:=compute=true) You have a secant.

# :::: answerbar
acceleration at $t=60$ [](:?s1) $m / s^2$  $t=120$ [](:?s2) $m / s^2$  
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
[Continue](/pages/secantPoints)
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
myDiv.innerHTML = `<div id='left' style='height:700px; width:75%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:700px; width:24%; float:left; border: 1px solid gray;background:#CCEEFF;border-radius:8px;';></div>`;

let workspaceDivWidth = 0.75;
let pictureDivWidth = 0.24;
let workspaceDivHeight = 700;
let pictureDivHeight = 700;

let xlow = -30;
let xhigh = 150;
let ylow = -200;
let yhigh = 2000;

let c = 1 / 360;
let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'time (s)', ylabel:'velocity (m/s)'});
let F = new ProblemFunction(function(x) { return c * Math.pow(x,3) / 3; }, 
  'velocity of rocket', 100, [0,xhigh], [60,120]);
let F_id = workspace.addFunction(F);

let t = workspace.board.create('glider', [0,0, workspace.xaxis], {name:'', face:'^', size:12, color:'green'});

let p = workspace.board.create('point', [
  function() { return t.X(); }, 
  function() { return F.f(t.X()); }], {color:'green', name:''});

////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,60000,2,-5000], keepaspectratio:false, axis:true, showCopyright:false, showNavigation:false});


workspace.board.addChild(board1);

let distance = function(x) { return c * Math.pow(x,4) / 12; }
let rocketurl = 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/cab590371e4346929cf9096e53d163e772e1d132/rocket.png';
let rocket = board1.create('image',[rocketurl, [0.9,function() { return distance(t.X()) - 3000 ; }], [0.2,3000]]);


let move = function() { 
  t.moveTo([xhigh,0],5000, {effect: '--'} ); 
}


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
  workspace.addElementByID(1, percent, F_id, {
    snapMargin:0.5,
    annotations:'on',
    units:'s',
    change: 'm/s',
    rate: 'm / s^2',
    annotationPosition:'after',
    showUnits:true,
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

function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}

smartdown.setVariable('compute', false);
smartdown.setVariable('play', false);
smartdown.setVariable('s1', '');
smartdown.setVariable('s2', '');

this.dependOn = ['compute', 'play', 'active', 's1', 's2'];
this.depend = function() {

  removeEnterFromSmartdownString('s1', env.s1);
  removeEnterFromSmartdownString('s2', env.s2);

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

  if (env.compute == true) {
    smartdown.setVariable('compute', false);
    if (env.s1 == 10 && env.s2 == 40) {
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

