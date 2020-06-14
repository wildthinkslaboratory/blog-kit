# :::: clue
# --outlinebox
Clue
# --outlinebox
# ::::

[Submit Solution](:=compute=true) A rectangle has many secants. Pick one.

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
};

```
# :::: success
# --partialborder pb1
You've created a Secant Rectangle!  Take a moment to play with it.  

**Question:**
Why does the secant move up and down?
[show explanation](::explanation/button)

# :::: explanation
**Explanation:**
If we start with a secant, then we know the position of our object at the two time points at the endpoints of the secant.  We can compute the rate and distance that we need to draw the matching rectangle.

If instead, we start with the rectangle, we know the rate over a given time period.  We can compute the distance traveled, but we don't have enough information to figure out the exact position of the object at the time interval endpoints.  The vertical position of the secant is unknown.
[Continue](/pages/secantRectangle1)
# ::::

# --partialborder
# ::::

# :::: keeptrying
Keep trying. 
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
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:800px; width:800px'>`;

let xlow = -2;  // bounding box for the graph
let xhigh = 10;
let ylow = -2;
let yhigh = 30;

let x1 = 2;  // our main interval endpoints
let x2 = 4;
let solved = false;

// make the board and add the velocity function
let workspace = new Workspace('box', [xlow,yhigh,xhigh,ylow], {xlabel:'x', ylabel:'y'});
let F = new ProblemFunction(function(x) { return x; }, 'velocity curve', 7, [xlow,xhigh], []);
let F_id = workspace.addFunction(F);
let G = function(x) { return x*x/2; };  // the distance function

// create the interval and the rectangle
let xint = new XInterval(workspace.board, x1,x2);
let rectangle = new Rectangle(xint,  F.f, { 
    annotations: 'on',
    snapMargin:0.5,
    change:'distance',
    units:'time',
    rate:'rate'
  });

// the rectangle can't move
// rectangle.xint.x1.setAttribute({fixed:true, color:'#3344AA'});
// rectangle.xint.x2.setAttribute({fixed:true, color:'#3344AA'});

// variables we'll need later.
let segment;     // and adjustable segment
let secantRect;  // the solution secantRectangle
let g;           // functiongraph for the distance
let xint2;       // a second xinterval


/////////////////////////////////////////////////////////////////////////////////////////

// Event handling


let useButton = function(e, buttonType) {
    // we pass in percents into the constructor
    let percentX = (e.clientX - myDiv.offsetLeft) / myDiv.offsetWidth;
    let percentY = 1 - (e.clientY - myDiv.offsetTop) / myDiv.offsetHeight;
    let bb = workspace.board.getBoundingBox();
    let x = bb[0] + (bb[2] - bb[0]) * percentX;
    let y = bb[3] + (bb[1] - bb[3]) * percentY;
    segment = new Segment(workspace.board, [x,y], [x+1,y+1], {
      annotations:'on', 
      snapMargin:0.5, 
      change:'distance',
      units:'time',
      rate:'rate'
    });
    workspace.board.update();
    smartdown.setVariable('numButtons', env.numButtons - 1);  // keep track of resources
};

this.div.onmousedown = function(e) { 
  if (env.numButtons > 0 && env.active) {
    useButton(e, env.buttonType);
  }
};


let widthPercent = 0.8;
let heightPercent = 0.7;

this.sizeChanged = function() {
  workspace.board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);       
};

this.sizeChanged();


workspace.board.on('update', function() {
  if (rectangle !== undefined) { 
    rectangle.onUpdate();  
  }
  if (segment !== undefined) { 
    segment.onUpdate();  
  }
  if (secantRect !== undefined) { 
    secantRect.onUpdate();  
  }
  workspace.onUpdate();              // hook up workspace update functions
});


/////////////////////////////////////////////////////////////////////////////////////////


let checkSolution = function() {
  if (segment.f1.X() == xint.X1() && segment.f2.X() == xint.X2()) {
    if (segment.change() == rectangle.area()) {   
      return true;
    }
  }
  return false;
}

smartdown.setVariable('compute', false);

this.dependOn = ['compute', 'active'];
this.depend = function() {

  if (env.active == true) {
    myDiv.style.cursor = "url('/assets/images/calculus/sectCursor.svg'), auto";
  }
  else {
    myDiv.style.cursor = "default";
  }

  if (env.compute == true) {
    smartdown.setVariable('compute', false);

    if (segment != undefined) {

      if (solved || checkSolution()) {

        // solved or solution correct 
        smartdown.showDisclosure('success','','transparent,draggable,closeable,topright,shadow,outline');
        smartdown.hideDisclosure('keeptrying','','');

        // not solved and solution correct
        if (solved !== true) {
          let c = segment.f1.Y(); 
          xint2 = new XInterval(workspace.board, xint.X1(),xint.X2());

          // replace secant and rectangle with a SecantRectangle
          secantRect = new SecantRectangle(xint2,  F.f, { 
            annotations: 'on',
            snapMargin:0.5,
            change:'distance',
            units:'time',
            rate:'rate',
            attachButtonVisible:false,
          });
          secantRect.attachButton.toggle();
          secantRect.xint.midY.moveTo([4,c]);
          secantRect.onUpdate();

          let dragText1 = workspace.board.create('text', [
            function() { return xint2.midY.X() + 0.15; }, 
            function() { return xint2.midY.Y(); }, 
            'DRAG ME'], {
              fontSize:12, 
              cssClass:'jsxgraph-alert',
              highlightCssClass:'jsxgraph-alert',
              visible:true,
          });

          rectangle.delete();  // get rid of the segment and rectangle
          segment.delete();

          solved = true;
        }

      }
      else { // unsolved and solution not correct
        smartdown.showDisclosure('keeptrying','','draggable,closeable,center,shadow,lightbox');
        smartdown.hideDisclosure('success','','');
      }
    }
  }
};



```

