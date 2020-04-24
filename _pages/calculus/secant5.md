---
title: Secant
header: 'none'
smartdown: true
---

# :::: clue
# --outlinebox
##### Water Balloon Drop
You see your friend out of a window that is 30 feet above the ground.  You consider dropping a water balloon on your friend's head.  Your friend is 5 feet tall.  How fast will the balloon be traveling when it hits his head? Round your answer to the nearest whole number.
# --outlinebox
# ::::

# :::: notes
# --aliceblue
##### Note

# --aliceblue
# ::::

[?](::clue/button,transparent,draggable,closeable,center,shadow) [Drop!](:=play=true) [Reset](:=reset=true) [Submit Solution](:=compute=true) Here's another secant. 
# :::: answerbar
Speed of balloon at 5 feet above the ground [](:?s1)
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
Note that -31 ft/s is equivalent to -21 mph.  Maybe reconsider dropping the balloon.
[Continue](/pages/secant6)
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
myDiv.innerHTML = `<div id='left' style='height:700px; width:75%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:700px; width:24%; float:left; border: 1px solid gray;background:#EEF9FF;border-radius:8px;';></div>`;

let xlow = -1;
let xhigh = 3;
let ylow = -5;
let yhigh = 40;

let startHeight = 30;
let g = -9.81;
let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'time (s)', ylabel:'position (ft)'});
let F = new ProblemFunction(function(x) { return  g*x*x + startHeight; }, 
  'position of water balloon', 100, [0,xhigh], []);
let F_id = workspace.addFunction(F);

let t = workspace.board.create('glider', [0,0, workspace.xaxis], {name:'', face:'^', size:12, color:'green'});
let p = workspace.board.create('point', [
  function() { return t.X(); }, 
  function() { return F.f(t.X()); }], {color:'green', name:''});

/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('right', {boundingbox:[-1,40,3,-5], keepaspectratio:false, axis:false, showCopyright:false});


workspace.board.addChild(board1);

let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'', 
    withLabel: true,
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-80, 20]   // (in pixels)
    },
    ticks: {visible:false}
  });

let yaxis1 = board1.create('axis', [[0, 0], [0, 1]], 
  {name:'ft', 
    withLabel: false, 
    label: {
      fontSize: 20,
      position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
      offset: [-120, -20]   // (in pixels)
    }
  }); 

// ball that is tossed
let balloonPoint = board1.create('point', 
  [1, function() { return F.f(t.X());}], 
  {name: '', strokeColor: '#7799EE', fillColor: '#7799EE', fillOpacity:0.4, size:6});

let manurl = '/assets/images/manstanding.png';
let man = board1.create('image',[manurl, [0.6,0], [1,5]],{fixed:true});

let move = function() { 
  t.moveTo([1.75,0],5000, {effect: '--'} ); 
}

let reset = function() { 
  t.moveTo([0,0]); 
}

/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

let useButton = function(mouseX, buttonType) {
  let width = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - width)/2;
  let percent = (mouseX - margin) / (width * (1 - widthRatio - 0.01));

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

let widthPercent = 0.8;
let heightPercent = 0.7;
let widthRatio = 1/4;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent * (1 - widthRatio - 0.01), window.innerHeight * heightPercent);      
  board1.resizeContainer(window.innerWidth * widthPercent * widthRatio, window.innerHeight * heightPercent);
};

this.sizeChanged();

workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
});

smartdown.setVariable('play', false);
smartdown.setVariable('reset', false);
smartdown.setVariable('s1', '');
smartdown.setVariable('compute', false);

this.dependOn = ['play','reset', 'compute'];
this.depend = function() {

  if (env.play == true) {
    smartdown.setVariable('play', false);
    move();
  }

  if (env.reset == true) {
    smartdown.setVariable('reset', false);
    reset();
  }

  if (env.compute == true) {
    smartdown.setVariable('compute', false);
    if (env.s1 == -31) {
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

