# :::: clue
# --outlinebox
##### Spring Pull
When we pull on a spring, the amount of force required changes with the distance the spring is stretched. The further we pull the spring from the origin, the harder it is to pull. How much work is done if we stretch the spring from zero to 8 centimeters? 
# --outlinebox
# ::::

# :::: notes
# --partialborder
##### Note 1
Work is equal to force times distance
$$W = F \cdot d$$
We can model work as the area of a rectangle whose dimensions are distance and force.

##### Note 2
It's hard to **see** the amount of work done in the picture of the spring.  A simple way to think about work (as opposed to force) is that doing work requires energy and makes you tired. To show how much work is being done, we change the color of the background.  As the amount of work done pulling the spring goes up, the background gets redder.
# --partialborder
# ::::



[Problem](::clue/button,transparent,draggable,closeable,center,outline,lightbox,shadow) [note](::notes/button,transparent,draggable,closeable,center,outline,shadow) [Submit Solution](:=compute=true)  [Undo](:=undo=true)

Work done at distance 8 cm [](:?s1) 
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

B.addButton('secant rectangle'); 
B.addButton('secant rectangle array'); 

smartdown.setVariable('numButtons', 2);  // keep track of number of buttons

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
myDiv.innerHTML = `<div id='top' style='height:200px; width:100%; border:1px solid gray;background:#FFFFEE;border-radius:8px;'></div><div id='bottom' style='height:500px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;


let xlow = -2;
let xhigh = 10;
let ylow = -5;
let yhigh = 80;

let k = 2;
let workspace = new Workspace('bottom', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'distance (cm)', ylabel:'force'});
let F = new ProblemFunction(function(x) { return k * x; },
  'force of spring', 5, [0,xhigh], [0,8]);
let F_id = workspace.addFunction(F);



////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////
// second board


board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[-2,6,10,-2], keepaspectratio:false, axis:false, showCopyright:false, showNavigation:false});

workspace.board.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'distance (cm)', 
    withLabel: true,
    label: {
      fontSize: 15,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    }
  });

let yaxis1 = board1.create('axis', [[0, 0], [0, 1]], 
  {name:'', 
    withLabel: false, 
    label: {
      fontSize: 15,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    },
    ticks: {visible:false}
  }); 




let a = 2;
let n = 30;
let d_0 = -1;

let s0 = board1.create('point',[function() { return workspace.maxX(); }, 2],{name:'', color:'black'});
let spring = function(x) { return  2 + a * Math.sin(n * (x - d_0) * Math.PI * 2 / (workspace.maxX() - d_0)); };

let sgraph = board1.create('functiongraph', [spring,d_0, 
  function() { return workspace.maxX(); }], {
  strokeColor:'#CCCCFF', 
  strokeWidth:2, 
  visible:true});

let s1 = board1.create('point',[-1, 8],{visible:false});
let s2 = board1.create('point',[-1, -2],{visible:false});

let dimensionLine = board1.create('segment', [s1,s2], {
  strokeColor:'#999999', 
  strokeWidth:6, 
  firstArrow:false, 
  lastArrow:false, 
  visible:true});

let maxWork = 80;
let workColor = function(w) { 
  let x = maxWork - w;
  let r = 240 + 15 * (x / maxWork);
  let g = 100 + 155 * x / maxWork;
  let b = 100 + 135 * x / maxWork;
  return 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
};

/////////////////////////////////////////////////////////////////////////////////////////

// Event handling
let checkAnswer = function() {
  return env.s1 == '64';
};


let useButton = function(mouseX, buttonType) {
  let pixelwidth = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - pixelwidth)/2;
  let percent = (mouseX - margin) / pixelwidth;


  let boardwidth = xhigh - xlow;
  let x1 = xlow + boardwidth * percent;
  let x2 = x1 + boardwidth * 0.4;
  if (x2 > xhigh) { x2 = xhigh; }
  
  if (buttonType == 2) {
    let xint = new XInterval(workspace.board, x1, x2);
    let sr = new SecantRectangle(xint, F.f, {
      change:'work', 
      rate:'force', 
      units:'distance',
      annotations:'secant', 
      attachButtonVisible:false,     
    });
    sr.attachButton.toggle();
    workspace.addElement(sr);
  }
  else {
    let xint = new XInterval(workspace.board, x1, x2);
    let srarray = new SecRectAdjArray(workspace.board, xint, F.f, 6, {
      change:'work', 
      rate:'force', 
      units:'distance',
      annotations:'secant',
      attachButtonVisible:false,       
    });
    workspace.addElement(srarray);
  }
  
  smartdown.setVariable('active', false);
  //smartdown.setVariable('numButtons', env.numButtons - 1);  // keep track of resources
};


this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e.clientX, env.buttonType);
  }
};


let widthPercent = 0.8;
let heightPercent = 0.7;
let heightRatio = 1/6;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, (1-heightRatio) * window.innerHeight * heightPercent);       
  board1.resizeContainer(window.innerWidth * widthPercent, heightRatio * window.innerHeight * heightPercent);
};

this.sizeChanged();


workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
  myDiv.children[0].style.background = workColor(workspace.area());
});

function removeEnterFromSmartdownString(name, smartdownVar) {
  if (smartdownVar[smartdownVar.length - 1] === '\n') {           
    smartdown.setVariable(name, smartdownVar.replace(/\s/g, ''));
  }
}

smartdown.setVariable('compute', false);
smartdown.setVariable('error', 100);
smartdown.setVariable('undo', false);
smartdown.setVariable('s1', '');

this.dependOn = ['compute', 'undo', 'active', 's1'];
this.depend = function() {

  removeEnterFromSmartdownString('s1', env.s1);

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

  if (env.undo == true) {                // uncomment if you want an undo button
    workspace.undo();
    smartdown.setVariable('undo', false);
  }
};



```

