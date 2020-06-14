# :::: withClue
[note](::secant/button,transparent,closeable,draggable,topright,outline,shadow) Here.  Have a secant.
# ::::

# :::: noClue
Here.  Have a secant.
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

B.addButton('secant'); 

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
     if (B.size() == 0) { p5.noLoop(); }
  }
};

```


# :::: secant
# --partialborder
A **secant line** of a graph $y=f(x)$ is any line that intersects the graph in at least two distinct points.
[next](:=show1=true)
# --partialborder
# ::::

# :::: clue1
# --partialborder
A secant is a great way to show the relationship between **distance**, **rate** and **time**.  The slope of a secant represents the rate.  The rate is the change in distance divided by the change in time.
$$r = \frac{d}{t}$$
[next](:=show2=true)
# --partialborder
# ::::

# :::: clue2
# --partialborder
We can use secants for any rate of change problem, really.  The slope of the secant tells us the rate of change of one thing relative to another.
[next](:=show3=true)
# --partialborder
# ::::

# :::: clue3
# --partialborder
 In rate problems, the units are often a measure of **time**, like seconds, days or years.  But they don't have to be. 
 [next](:=show4=true)
# --partialborder

# ::::

# :::: clue4
# --outlinebox
 Let's solve a problem with a secant.
 [Continue](/pages/secant2)
# --outlinebox

# ::::



```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js

smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// import the calc library
//smartdown.import=/assets/libs/calc.js

smartdown.showDisclosure('noClue', '', 'transparent');

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let widthPercent = 0.8;
let heightPercent = 0.7;

let xlow = -1;
let xhigh = 6;

let board = new StandardBoard('box', [xlow,11,xhigh,-2], { xlabel:'x', ylabel:'y'} );
let f = function(x) { return x*x/4 + 1; };
let F = new ProblemFunction(f, 'f(x)', 5, [xlow,xhigh], []);
let F_id = board.addFunction(F);

let xinterval;
let secant;


let createSecant = function() {
  xinterval = new XInterval(board.board, 1, 4);
  secant = new Secant(xinterval,  f, { 
    showUnits:true,
    annotations: 'on',
    snapMargin:0.05
  });



  //////////////////////////////////////////////////////////////////
  // TOOL TIP, DOTS ARE DRAGGABLE

  let dragText1 = board.board.create('text', [
    function() { return xinterval.X1() + 0.25; }, 
    function() { return xinterval.x1.Y(); }, 
    'DRAG ME'], {fontSize:12, color:'black', visible:false});

  xinterval.x1.on('over', function() {
    dragText1.setAttribute({visible:true});
  });

  xinterval.x1.on('out', function() {
    dragText1.setAttribute({visible:false});
  });

  let dragText2 = board.board.create('text', [
    function() { return xinterval.X2() + 0.25; }, 
    function() { return xinterval.x2.Y(); }, 
    'DRAG ME'], {fontSize:12, color:'black', visible:false});

  xinterval.x2.on('over', function() {
    dragText2.setAttribute({visible:true});
  });

  xinterval.x2.on('out', function() {
    dragText2.setAttribute({visible:false});
  });


  board.board.on('update', function() {
    secant.onUpdate();
  });
};


////////////////////////////////////////////////////////////////////////////////////



this.div.onmousedown = function(e) { 
  
  if (env.num > 0 && env.active) {
    createSecant();
    smartdown.setVariable('num', env.num - 1);
    smartdown.showDisclosure('withClue','','transparent');
    smartdown.hideDisclosure('noClue','','transparent');
  }

};


this.sizeChanged = function() {
  board.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);
};

this.sizeChanged();

smartdown.setVariable('show1', false);
smartdown.setVariable('show2', false);
smartdown.setVariable('show3', false);
smartdown.setVariable('show4', false);
this.dependOn = ['show1', 'show2', 'show3', 'show4','active'];
this.depend = function() {

  if (env.active == true) {
    myDiv.style.cursor = "url('/assets/images/calculus/sectCursor.svg'), auto";
  }
  else {
    myDiv.style.cursor = "default";
  }

  if (env.show1 == true) {
    smartdown.setVariable('show1', false);
    smartdown.hideDisclosure('secant','','');
    smartdown.showDisclosure('clue1','','transparent,closeable,draggable,outline,topright,shadow');
    secant.setAttribute({ units: 'time', rate: 'rate', change: 'distance'});
    secant.setLineColor('#FF3300');
    board.board.update();
  }
  if (env.show2 == true) {
    smartdown.setVariable('show2', false);
    smartdown.hideDisclosure('clue1','','');
    smartdown.showDisclosure('clue2','','transparent,closeable,draggable,outline,topright,shadow');
    secant.setAttribute({ units: 'units', rate: 'change per unit', change: 'total change'});
    secant.setLineColor('#00CC99');
    board.board.update();
  }
  if (env.show3 == true) {
    smartdown.setVariable('show3', false);
    smartdown.hideDisclosure('clue2','','');
    smartdown.showDisclosure('clue3','','transparent,closeable,draggable,outline,topright,shadow');
    secant.setAttribute({ units: 'number of widgets', rate: 'cost per widget', change: 'total cost'});
    secant.setLineColor('#FFAA00');
    board.board.update();
  }
  if (env.show4 == true) {
    smartdown.setVariable('show4', false);
    smartdown.hideDisclosure('clue3','','');
    smartdown.showDisclosure('clue4','','transparent,closeable,draggable,outline,lightbox,center,shadow');
  }
};
                      
```

