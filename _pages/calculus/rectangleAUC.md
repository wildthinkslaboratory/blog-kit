# :::: clue
# --outlinebox
##### Area Underneath a Curve
What is the area underneath the curve between $x=2$ and $x=8$.
# --outlinebox
# ::::

# :::: toolbar
[?](::clue/button,transparent,draggable,closeable,center,shadow) Tool Panel

```javascript /autoplay/p5js
// import the calc library
//smartdown.import=/CalculusPrimer/toolbar.js


const myDiv = this.div;
myDiv.style.background = '#EEEEEE';
myDiv.style.border = '1px solid gray';
myDiv.style.borderRadius = '8px';

let numButtons = 6;
let xSpacer = 10, ySpacer = 10, width = 40;
let B = new ToolPanel(p5,width,xSpacer,ySpacer);
B.addButton('rectangle');
B.addButton('rectangle array');
B.initialize();


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

[Submit Solution](:=compute=true)
# ::::

```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/CalculusPrimer/calc.js

smartdown.showDisclosure('toolbar', '', 'transparent');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;


let xlow = -1;
let xhigh = 12;
let ylow = -5;
let yhigh = 12;

let f = function(x) { return -Math.pow(x,3)/8 + Math.pow(x,2); };
let answer = 40;

// create the first board
JXG.Options.axis.ticks.majorHeight = 40;
board0 = JXG.JSXGraph.initBoard('box', {boundingbox:[xlow,yhigh,xhigh,ylow], keepaspectratio:false, axis:true, showCopyright:false});

let pstart = board0.create('point', [0,0],{name:'', color:'#7777DD', fixed:true});
let p0 = board0.create('point', [8,f(8)],{name:'', color:'#7777DD', fixed:true});

let vgraph = board0.create('functiongraph', [f,0,xhigh], {
  strokeColor:'#7777DD', 
  strokeWidth:1, 
  visible:true});




let workspace = new WorkSpace(board0);



////////////////////////////////////////////////////////////////////////////////////
// Here is where you configure the workspace based on what elements you want to 
// add.  

workspace.setSnapMargin(0.05);

////////////////////////////////////////////////////////////////////////////////////

this.div.onmousedown = function(e) { 
  
  let width = myDiv.offsetWidth;
  let margin = (window.innerWidth - width)/2;
  let percent = (e.clientX - margin) / width;

  if (env.mode >= 0) {
    workspace.addElement(env.mode, percent, f);
  }

};


this.sizeChanged = function() {
  board0.resizeContainer(myDiv.offsetWidth, 600);
};


this.dependOn = [];
this.depend = function() {

};

```

