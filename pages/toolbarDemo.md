# Toolbar Demo

[Undo](:=undo=true) 

```javascript /autoplay/p5js
///////////////////////////////////////////////////////////////////
// this is a script for a RESOURCE PANEL toolbar
///////////////////////////////////////////////////////////////////


// import the calc library
//smartdown.import=/assets/libs/toolbar.js

const myDiv = this.div;
myDiv.style.background = '#FFFFFF';
myDiv.style.borderRadius = '8px';

let maxButtons = 8;
let xSpacer = 10, ySpacer = 5, width = 40;
let B = new ToolPanel(p5,40, 10, 10);


///////////////////////////////////////////////////////////////////
// Add the buttons you want on your resource panel
// NOTE:  The value of page variable env.numButtons should match the number of buttons you add here

B.addButton('rectangle');
B.addButton('secant');
B.addButton('secant rectangle');
B.addButton('rectangle array');
B.addButton('secant array');
B.addButton('secant rectangle array');
B.addButton('limit');
B.addButton('epsilon delta');
//B.initialize();

smartdown.setVariable('numButtons', 8);  // keep track of number of buttons

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
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:800px;'>`;

let xlow = -2;
let xhigh = 10;
let ylow = -2;
let yhigh = 20;

let f = function(x) { return Math.pow(x,2)/4; };
//let f = function(x) { return  Math.pow(x,3)/8 - Math.pow(x,4)/128; };
//let f = function(x) { return x/2; }
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow]);
let F = new ProblemFunction( f, '', 7, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);


smartdown.setVariable('undo', false);

this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e.clientX, env.buttonType);
  }
}


let useButton = function(mouseX, buttonType) { 
  let width = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - width)/2;
  let percent = (mouseX - margin) / width;

  if (env.buttonType >= 0) {
    workspace.addElementByID(buttonType, percent, F_id);
  }

};

this.dependOn = ['undo'];
this.depend = function() {
  if (env.undo == true) {
    workspace.undo();
    smartdown.setVariable('undo', false);
  }
};

let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};

this.sizeChanged();

workspace.board.on('update', function() {
  workspace.onUpdate();
})

````

