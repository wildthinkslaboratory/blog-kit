---
title: Secant
header: 'none'
lesson: 'secant'
smartdown: true
ogimage: /assets/images/calculus/secant.jpg
---

# :::: clue
# --outlinebox
###### Bunny Pen
A rectangular pen $8\text{ft}^2$ in area is to be fenced off for a pet rabbit.  One side of the pen will be the barn wall. The remaining three sides we'll make with fencing. However, fencing is really expensive.  We need to find the dimensions for the pen that minimizes the length of fence.

Say our pen has width $w$ and length $l$.  In order to get $8\text{ft}^2$ in area, we must have $wl = 8$. We also know that the length of fence $F$ will be  $F = 2w + l$.  We can write the amount of fencing in terms of the width $w$  as $F = 2w + \frac{8}{w}$

What width gives the minimal cost pen and what is the rate of change of the function at that point?
# --outlinebox
# ::::

# :::: notes
# --aliceblue
##### Note

# --aliceblue
# ::::

[?](::clue/button,transparent,draggable,closeable,center,shadow) [Submit Solution](:=compute=true) Here's another secant. 
# :::: answerbar
minimal cost width [](:?s1) rate of change at minimum cost [](:?s2)
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
But don't be a cheapskate.  Buy some more fencing and give the bun some space to hop.
[Continue](/pages/secant7)
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
myDiv.innerHTML = `<div id='left' style='height:700px; width:75%; float:left; border:1px solid gray;background:#FFFFFF;border-radius:8px;'></div><div id='right' style='height:700px; width:24%; float:left; border: 1px solid gray;background:#E2FFDD;border-radius:8px;';></div>`;

let xlow = -1.5;
let xhigh = 5;
let ylow = -2;
let yhigh = 15;


let workspace = new Workspace('left', [xlow,yhigh,xhigh,ylow],  
  { xlabel:'width (ft)', ylabel:'fencing (ft)'});
let F = new ProblemFunction(function(x) { return  2*x + 8/x; }, 
  'fence length', 0.7, [0,xhigh], []);
let F_id = workspace.addFunction(F);

let w = workspace.board.create('glider', [4,0, workspace.xaxis], {
  name:'', face:'^', size:12, color:'green'});
let p = workspace.board.create('point', [
  function() { return w.X(); }, 
  function() { return F.f(w.X()); }], {color:'green', name:''});

let checkSnap = function() {
  let floor = Math.floor(w.X());           // are we close to the lower integer?
  console.log('floor',floor);
  if (w.X() < floor + 0.05) {
    w.moveTo([floor,0]);
    console.log('snapped');
  }
  else {                                         // are we close to the higher integer?
    let ceiling = Math.ceil(w.X());
    if (w.X() > ceiling - 0.05) {
      w.moveTo([ceiling,0]);
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////
// second board


let board1 = JXG.JSXGraph.initBoard('right',
            {boundingbox: [-1, 7, 5,-1], axis: true,
            showcopyright: false,
            showNavigation:false,
            axisRatio:true,
            });

workspace.board.addChild(board1);


let bunurl = '/assets/images/rabbit.svg';
let bun = board1.create('image',[bunurl, [0.2,0.2], [0.5,0.5]], {fixed:true});


let barn = board1.create('line',[[0,-1], [0,7] ],{strokeColor:'black', strokeWidth:5, straightFirst:false, straightLast:false, fixed:true});

let widthF = function() { return w.X(); };
let lengthF = function() { return 8/w.X(); };
let p1 = board1.create('point', [widthF,0], {visible:false});
let p2 = board1.create('point', [widthF,lengthF], {visible:false});
let p3 = board1.create('point', [0,lengthF], {visible:false});

let width1 = board1.create('segment',[[0,0], p1],{strokeColor:'brown', strokeWidth:2});
let lengthLine = board1.create('segment',[p1,p2], {strokeColor:'brown', strokeWidth:2});
let width2 = board1.create('segment',[p2,p3], {strokeColor:'brown', strokeWidth:2});

let barnText = board1.create('text',[0.2, 4, 'barn wall'], {fontSize:12, color:'#999999', fixed:true});
let lengthText = board1.create('text',[
  function() { return w.X() + 0.2; }, 
  function() { return lengthF() / 2; }, 
  function() { return lengthF().toFixed(2) + ' ft'; }], 
  {fontSize:12, color:'#999999'});


let widthText = board1.create('text',[
  function() { return w.X()/2 - 0.3; }, 
  function() { return lengthF() + 0.2; }, 
  function() { return w.X().toFixed(2) + ' ft'; }], 
  {fontSize:12, color:'#999999'});

let areaText = board1.create('text',[
  function() { return w.X()/2 - 0.2; }, 
  function() { return lengthF() / 2; }, 
  function() { return '8 ft^2'; }], 
  {fontSize:12, color:'#999999'});


/////////////////////////////////////////////////////////////////////////////////////////

// Event handling

let useButton = function(mouseX, buttonType) {
  let width = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - width)/2;
  let percent = (mouseX - margin) / (width * (1 - widthRatio - 0.01));

  workspace.addElementByID(buttonType, percent, F_id, {
    change:'ft', 
    rate:'ft/ft', 
    units:'ft',
    annotations:'on',
    annotationPosition:'after',
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
let widthRatio = 1/2;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent * (1 - widthRatio - 0.01), window.innerHeight * heightPercent);      
  board1.resizeContainer(window.innerWidth * widthPercent * widthRatio, window.innerHeight * heightPercent);
};

this.sizeChanged();

workspace.board.on('update', function() {
  workspace.onUpdate();              // hook up workspace update functions
  checkSnap();
});

smartdown.setVariable('s1', '');
smartdown.setVariable('s2', '');
smartdown.setVariable('compute', false);

this.dependOn = ['compute'];
this.depend = function() {

  if (env.compute == true) {
    smartdown.setVariable('compute', false);
    if (env.s1 == '2' && env.s2 == '0') {
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

