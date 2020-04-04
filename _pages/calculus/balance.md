---
title: Rectangle 
header: 'none'
smartdown: true
---

# :::: clue
# --outlinebox
##### Sword Balance Point
A sword is 80 centimeters long.  A large portion of the sword's weight is in the hilt.  As you move away from the hilt, the sword tapers to a narrow blade. We'll ignore the cross sectional shape of the sword for now and instead think of it as a one dimensional bar with a variable density along it's length.  The density per centimeter is shown in the graph.  Estimate the [balance point](::balancepoint/tooltip) of the sword using the red triangle. 

The answer isn't a whole number so do your best to estimate it.  Later when we learn to solve these problems symbolically we'll be able to answer this question exactly.

# :::: balancepoint
The **balance point** is the point along the length of the sword where it will balance perfectly on your finger.
# ::::
# --outlinebox
# ::::

# :::: notes
# --aliceblue
##### Note 1
Mass is equal to the linear density times the length
$$M = d \cdot l$$
and we can model that with a rectangle.
##### Note 2
Typically the balance point of a sword is a small distance past the hilt.  At first it might seem that it would be best to hold the sword at the balance point since this would appear to make the sword more maneuverable.  However,  having the balance point just beyond the place where you hold it allows the user to take some advantage of gravity when bringing the sword down on it's target.
# --aliceblue
# ::::


# :::: toolbar
[?](::clue/button,transparent,draggable,closeable,center,shadow) [N](::notes/button,transparent,draggable,closeable,center,shadow) [Submit Solution](:=compute=true) [Undo](:=undo=true)

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
let B = new ToolPanel(p5,40, 10, 10);


///////////////////////////////////////////////////////////////////
// Add the buttons you want on your resource panel
// NOTE:  The value of page variable env.numButtons should match the number of buttons you add here

B.addButton('rectangle');
B.addButton('rectangle array');
//B.initialize();

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
  }
};

```
# ::::

# :::: success
Success! 

Thank you for testing my prototype!  

It would be so helpful to me if you could fill out this short [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSdVNvzSXPHYqIrtb_ftMRhK9qAg1I1Up2qdvV2Mmzk79LAnTQ/viewform) to help me make this lesson better.
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
myDiv.innerHTML = `<div id='top' style='height:200px; width:100%; border:1px solid gray;background:#DDFFF8;border-radius:8px;'></div><div id='bottom' style='height:500px; width:100%; border: 1px solid gray;background:#FFFFFF;border-radius:8px;';></div>`;


let xlow = -10;
let xhigh = 100;
let ylow = -10;
let yhigh = 60;

JXG.Options.axis.ticks.majorHeight = 40;

/////////////////////////////////////////////////////////////////////////////////////////
// second board

board1 = JXG.JSXGraph.initBoard('top', {boundingbox:[xlow,7,xhigh,-3], keepaspectratio:false, axis:false, showCopyright:false});


let xaxis1 = board1.create('axis', [[0, 0], [1,0]], 
  {name:'cm', 
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


let fulcrum = board1.create('glider', [40,0,xaxis1], {name:'', face:'^', size:15, color:'red'});
let p = [[0, 2], [80, 2.25], [80, 1.75]];

let sword = board1.create('polygon', p, {fillColor:'#000000',hasInnerPoints: true, vertices:{visible:false}, borders:{strokeColor:'black'}});

let l1 = board1.create('point', [ function() { return fulcrum.X(); }, 0], {visible:false});
let l2 = board1.create('point', [ function() { return fulcrum.X(); }, 10], {visible:false});
let vertline = board1.create('line', [l1,l2], {color:'#CCCCCC'});

let swordLength = 80;
let f = function(x) { return 3 * x * x / 500; };
let sfboard = new SingleFunctionBoard('bottom', 
  [xlow,yhigh,xhigh,ylow], 
  f,
  { xName: 'cm', 
    yName: 'g/cm', 
    startX:0, endX:swordLength, 
    flabel: 'density of sword', flabelX:75, flabelY:45,
    endF:swordLength
  });



let workspace = new WorkSpace(sfboard.board);

////////////////////////////////////////////////////////////////////////////////////
// Here is where you configure the workspace based on what elements you want to 
// add.  

workspace.setSnapMargin(0.1);
workspace.setRectangleNames(['g', 'cm', 'g/cm']);
workspace.setUseRectangleNames(true);


////////////////////////////////////////////////////////////////////////////////////

let Atext = sfboard.board.create('text', [
  xlow + 0.25 * (xhigh - xlow), 
  ylow + 0.8 * (yhigh - ylow),
  function() { return 'Total Area = ' + workspace.getArea().toFixed(2); }], {
  fontSize:20,
  visible:true
});

board1.addChild(sfboard.board);

let l3 = sfboard.board.create('point', [ function() { return fulcrum.X(); }, 0], {visible:false});
let l4 = sfboard.board.create('point', [ function() { return fulcrum.X(); }, 10], {visible:false});
let vertline2 = sfboard.board.create('line', [l3,l4], {color:'#CCCCCC'});


/////////////////////////////////////////////////////////////////////////////////////////

// Event handling
let answer = 40 * Math.pow(4, 1/3);
let checkAnswer = function() {
  return Math.abs(fulcrum.X() - answer) <= 1;
};

let useButton = function(mouseX, buttonType) {
  let width = window.innerWidth * widthPercent;
  let margin = (window.innerWidth - width)/2;
  let percent = (mouseX - margin) / width;
  workspace.addElement(buttonType, percent, f);
  // smartdown.setVariable('numButtons', env.numButtons - 1);  // keep track of resources
};


this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e.clientX, env.buttonType);
  }
};


let widthPercent = 0.8;
let heightPercent = 0.7;
let heightRatio = 1/3;

this.sizeChanged = function() {
  workspace.resize(window.innerWidth * widthPercent, (1-heightRatio) * window.innerHeight * heightPercent);       
  board1.resizeContainer(window.innerWidth * widthPercent, heightRatio * window.innerHeight * heightPercent);
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
