---
title: Rectangle 
header: 'none'
smartdown: true
---

# :::: toolbar
# :::: withClue
[?](::clue/button,transparent,draggable,topright,shadow) Here.  Have a rectangle.
# ::::

# :::: noClue
Here.  Have a rectangle.
# ::::
```javascript /autoplay/p5js
///////////////////////////////////////////////////////////////////
// this is a script for a RESOURCE PANEL toolbar
///////////////////////////////////////////////////////////////////


// import the calc library
//smartdown.import=/assets/libs/toolbar.js


const myDiv = this.div;
myDiv.style.background = '#FFFFFF';
myDiv.style.borderRadius = '8px';
//myDiv.style.border = '1px solid gray';

let numButtons = 6;
let xSpacer = 10, ySpacer = 10, width = 40;
let B = new ResourcePanel(p5);

///////////////////////////////////////////////////////////////////
// Add the buttons you want on your resource panel
// NOTE:  The value of page variable env.num should match the number of buttons you add here

B.addButton('rectangle'); 

///////////////////////////////////////////////////////////////////


p5.setup = function() { 
  let canvasWidth = xSpacer + (width + xSpacer) * numButtons;  // set the size of the playable
  let canvasHeight = width + 2 * ySpacer;
  p5.createCanvas(canvasWidth,canvasHeight);     // create the canvas we will draw on
};


p5.draw = function() {  // draw the buttons
  B.draw(p5.mouseX,p5.mouseY);
}

p5.mousePressed = function()     // this function is called everytime the user clicks the mouse
{
  const [buttonType, state, id] = B.mousePressed();  // returns info on the button pushed
  
  if (id != -1) {                              // if it's a valid button
    smartdown.setVariable('mode', buttonType);         // set page mode correct type of button
    smartdown.setVariable('active', true);     // alert page we have an active button
  }
  
  p5.loop();    // EnergyHack to enable looping for duration of drag.
};


p5.mouseReleased = function() {     // this function is called when the user releases the mouse
                                    // button after a click.

  // EnergyHack to stop looping 5 sec after release.
  // window.setTimeout(function() {
  //   p5.noLoop();
  // }, 5000);
};

smartdown.setVariable('mode', 0);
smartdown.setVariable('active', false);
smartdown.setVariable('num', 1);
this.dependOn = ['num'];
this.depend = function() {
  
  if (env.num < B.size()) {  // If we have more buttons than the page has elements, delete the active button
     B.removeActiveButton();  // we've used this resouce
     smartdown.setVariable('active', false);
  }
};

```
# ::::

# :::: clue
# --aliceblue
We know that the area of a rectangle is the product of its length times its width.
[>](:=show1=true)
# --aliceblue
# ::::

# :::: clue1
# --aliceblue
So the area of a rectangle is a great way to visually represent a multiplication problem
$$ A \times B $$
[>](:=show2=true)
# --aliceblue
# ::::

# :::: clue2
# --aliceblue
It could represent a distance as a product of rate and time.  
[>](:=show3=true)
# --aliceblue
# ::::

# :::: clue3
# --aliceblue
 It could represent money.  
 [>](:=show4=true)
# --aliceblue

# ::::

# :::: clue4
# --aliceblue
 Let's solve a problem with a rectangle.
 [Continue](/pages/rectangle2)
# --aliceblue

# ::::



```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

smartdown.showDisclosure('toolbar', '', 'transparent');
smartdown.showDisclosure('noClue', '', 'transparent');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

// create the first board
JXG.Options.axis.ticks.majorHeight = 40;
board0 = JXG.JSXGraph.initBoard('box', {boundingbox:[-1,10,13,-2], keepaspectratio:false, axis:true, showCopyright:false});

let boardInfo;
let xinterval;
let rectangle;


let createRectangle = function() {
  boardInfo = new BoardInfo(board0);
  xinterval = new XInterval(board0, 3,9);
  xinterval.setSnapMargin(0.5);
  rectangle = new AdjRectangle(boardInfo, xinterval, 
    function(x) { return x; },
    ['area', 'length', 'width']);

  rectangle.setUseNames(true);
  rectangle.setVerticalAdjust(true);
  rectangle.setUseFunction(false);
  rectangle.showAnnotations(true);
  rectangle.setHeight(2);
  board0.update();



  //////////////////////////////////////////////////////////////////
  // TOOL TIP, DOTS ARE DRAGGABLE

  let dragText1 = board0.create('text', [
    function() { return xinterval.x1.X() + 0.25; }, 
    function() { return xinterval.x1.Y(); }, 
    'DRAG ME'], {fontSize:12, color:'black', visible:false});

  xinterval.x1.on('over', function() {
    dragText1.setAttribute({visible:true});
  });

  xinterval.x1.on('out', function() {
    dragText1.setAttribute({visible:false});
  });

  let dragText2 = board0.create('text', [
    function() { return xinterval.x2.X() + 0.25; }, 
    function() { return xinterval.x2.Y(); }, 
    'DRAG ME'], {fontSize:12, color:'black', visible:false});

  xinterval.x2.on('over', function() {
    dragText2.setAttribute({visible:true});
  });

  xinterval.x2.on('out', function() {
    dragText2.setAttribute({visible:false});
  });

  let dragText3 = board0.create('text', [
    function() { return xinterval.midY.X() + 0.25; }, 
    function() { return xinterval.midY.Y(); }, 
    'DRAG ME'], {fontSize:12, color:'black', visible:false});

  xinterval.midY.on('over', function() {
    dragText3.setAttribute({visible:true});
  });

  xinterval.midY.on('out', function() {
    dragText3.setAttribute({visible:false});
  });

  board0.on('update', function() {
    rectangle.onUpdate();
  });
};


////////////////////////////////////////////////////////////////////////////////////



this.div.onmousedown = function(e) { 
  
  if (env.num > 0 && env.active) {
    createRectangle();
    smartdown.setVariable('num', env.num - 1);
    smartdown.showDisclosure('withClue','','transparent');
    smartdown.hideDisclosure('noClue','','transparent');
  }

};


this.sizeChanged = function() {
  board0.resizeContainer(myDiv.offsetWidth, 600);
};

smartdown.setVariable('show1', false);
smartdown.setVariable('show2', false);
smartdown.setVariable('show3', false);
smartdown.setVariable('show4', false);
this.dependOn = ['show1', 'show2', 'show3', 'show4'];
this.depend = function() {
  if (env.show1 == true) {
    smartdown.setVariable('show1', false);
    smartdown.hideDisclosure('clue','','');
    smartdown.showDisclosure('clue1','','transparent,draggable,topright,shadow');
    rectangle.setNames(['A x B', 'A', 'B']);
    rectangle.setFillColor('#FFAA88');
    board0.update();
  }
  if (env.show2 == true) {
    smartdown.setVariable('show2', false);
    smartdown.hideDisclosure('clue1','','');
    smartdown.showDisclosure('clue2','','transparent,draggable,topright,shadow');
    rectangle.setNames(['distance', 'time', 'rate']);
    rectangle.setFillColor('#AAFF88');
    board0.update();
  }
  if (env.show3 == true) {
    smartdown.setVariable('show3', false);
    smartdown.hideDisclosure('clue2','','');
    smartdown.showDisclosure('clue3','','transparent,draggable,topright,shadow');
    rectangle.setNames(['investment', 'principle', 'interest rate']);
    rectangle.setFillColor('#88FFAA');
    board0.update();
  }
  if (env.show4 == true) {
    smartdown.setVariable('show4', false);
    smartdown.hideDisclosure('clue3','','');
    smartdown.showDisclosure('clue4','','transparent,draggable,center,shadow');
  }
};

```

