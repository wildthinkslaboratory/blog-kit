# :::: intro
# --outlinebox int
#### Spirograph
So I'm working on this spirograph page.  It will likely evolve over the next few days. I find it fascinating that such a simple system of moving circles can create such complex behaviour.  It creates intricate and complex patterns and also sometimes very chaotic paths with few discernable patterns.  Play around and see what you can create.  

This is a fabulous video on spirographs.  It goes far deeper than what I've produced on this page. 
![thumbnail](https://www.youtube.com/watch?v=n-e9C8g5x68)
Then I found this [spirograph page](https://mitchellwarr.github.io/spirographer/) which is also fantastic.  Anyway, hope you enjoy!
# --outlinebox
# ::::

# :::: panel
# --aliceblue panelbox
run[](:Xrun) trace[](:Xtrace) [clear](:=clearPage=true)
[](:-red/0/255/1) red
[](:-green/0/255/1) green
[](:-blue/0/255/1) blue
[](:-df/1/10/1) delta
[](:-pen/0/2/1) pen
[](:-penR/0.1/2/0.1) pen R
[](:?r1|number) **R1**
[](:?r2|number) **R2**
[](:?r3|number) **R3**
[reset radii](:=reset=true)
[open image in new tab](:=download=true) 
# --aliceblue
# ::::

```javascript /autoplay/p5js/kiosk
//smartdown.import=//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js

//////////////////////////////////////////////////////////////////////////////////////////////////

// set up the div and the page

smartdown.showDisclosure('panel','','bottomright,draggable,shadow');
smartdown.showDisclosure('intro','','transparent,center,closeable,draggable,shadow,outline');


// Adjust the surrounding DIV(s) a little
const myDiv = this.div;                                  
myDiv.style.background = '#FFFFFF';
this.div.innerHTML = '';

const widthScale = 0.80;
const heightScale = 0.7;

let canvas;

////////////////////////////////////////////////////////////////////////////

let width;
let height;
let num = 3;
let radiusCoefficients = [1, 0.47, 0.1];
let R = new Array(num);
let angle = new Array(num);
let X = new Array(num);
let Y = new Array(num);
let EX = new Array(num);
let EY = new Array(num);
let PX = new Array(num);
let PY = new Array(num);
let lastX = 0;
let lastY = 0;
let deltaFactor = 3;
let delta = Math.PI / 400;
let startR = Math.floor(Math.random() * 150);
let startG = Math.floor(Math.random() * 150);
let startB = Math.floor(Math.random() * 150);
let frameRate = 30;
let penCirle = 2; // must be 0, 1, or 2
let penRadiusRatio = 1;


////////////////////////////////////////////////////////////////////////////

p5.setup = function() {                          // this function is called when you start the
                                                 // playable.

  width = window.innerWidth;    // set the size of the playable
  height = window.innerHeight;
  canvas = p5.createCanvas(width,height);     // create the canvas we will draw on
  p5.windowResized();
  initialize();  // initialize spirograph variables
  p5.frameRate(frameRate);

  // EnergyHack to inhibit looping after 1 sec, this allows for popups to
  // fade in (which should really be a CSS function, and not involve P5JS.
  // window.setTimeout(function() {
  //   p5.noLoop();
  // }, 30000);
};


p5.windowResized = function() {                  // this function is called when the user changes
  width = window.innerWidth;  // the size of the window.  It will rescale all the
  height = window.innerHeight; // components to fit into the new window size.
  p5.resizeCanvas(width, height);

}

function initialize() {

  R[0] = Math.min(height / 2, width / 2) * radiusCoefficients[0];
  X[0] = width / 2;
  Y[0] = height / 2;
  angle[0] = 0;
  EX[0] = (R[0] * Math.cos(angle[0])) + X[0]; 
  EY[0] = (R[0] * Math.sin(angle[0])) + Y[0]; 
  lastX = EX[0];
  lastY = EY[0];

  // compute the radii
  for (let i=1; i < radiusCoefficients.length; i++) {
    R[i] = R[i-1] * radiusCoefficients[i];
  }
  initialized = true;
}


p5.draw = function() {                           // this function gets called repeatedly in a loop.

  if (!trace) {
    p5.clear();
  }

  for (let i=1; i < R.length; i++) {    // update the inner circle data
    X[i] = EX[i-1] + (X[i-1] - EX[i-1]) * R[i] / R[i-1];
    Y[i] = EY[i-1] + (Y[i-1] - EY[i-1]) * R[i] / R[i-1];   
    angle[i] = angle[i-1] - angle[i-1] * R[i-1] / R[i];
    EX[i] = (R[i] * Math.cos(angle[i])) + X[i]; 
    EY[i] = (R[i] * Math.sin(angle[i])) + Y[i]; 
    PX[i] = (R[i] * penRadiusRatio * Math.cos(angle[i])) + X[i]; 
    PY[i] = (R[i] * penRadiusRatio * Math.sin(angle[i])) + Y[i]; 
  }

  let x = PX[penCirle];   // the inner circle holds the pen
  let y = PY[penCirle];

  if (trace) {                 // show trace
    p5.stroke(red, green, blue);
    p5.line(lastX,lastY, x, y);
  }
  else {                          // show circles
    for (let i=0; i < R.length; i++) {
      p5.noFill();
      p5.circle(X[i],Y[i],2*R[i]);
      p5.circle(EX[i],EY[i],10);
    }
    p5.fill(red,green,blue);
    p5.circle(x,y,10);
  }

  // move the outer circle forward one step
  angle[0] += deltaFactor * delta;    
  EX[0] = (R[0] * Math.cos(angle[0])) + X[0]; 
  EY[0] = (R[0] * Math.sin(angle[0])) + Y[0]; 
  lastX = x;
  lastY = y;

}



p5.mousePressed = function()                     // this function is called everytime the user clicks the mouse
{
  // EnergyHack to enable looping for duration of drag.
//  p5.loop();

}


p5.mouseDragged = function() {                   // this function is called everytime the user drags the mouse

}


p5.mouseReleased = function() {                  // this function is called when the user releases the mouse
                          // button after a click.

  // EnergyHack to stop looping 5 sec after release.
  // window.setTimeout(function() {
  //   p5.noLoop();
  // }, 5000);
}


let loopOn = true;
let trace = true;
let initialized = false;

smartdown.setVariable('download', false);
smartdown.setVariable('run', true);
smartdown.setVariable('trace', true);
smartdown.setVariable('clearPage', false);
smartdown.setVariable('red', startR);
smartdown.setVariable('green', startG);
smartdown.setVariable('blue', startB);
smartdown.setVariable('r1', radiusCoefficients[0]);
smartdown.setVariable('r2', radiusCoefficients[1]);
smartdown.setVariable('r3', radiusCoefficients[2]);
smartdown.setVariable('reset', false);
smartdown.setVariable('df', deltaFactor);
smartdown.setVariable('pen', 2);
smartdown.setVariable('penR', 1);

this.dependOn = ['run', 'reset', 'trace', 'clearPage', 'download', 'red', 'green', 'blue', 'df', 'download', 'pen', 'penR'];
this.depend = function() {

  if (env.run == true) {
    p5.loop();
  }
  else {
    p5.noLoop();
  }
  if (env.trace == true) {
    if (initialized && !trace) { 
      p5.clear(); 
    }
    trace = true;
  }
  else {
    trace = false;
  }
  if (env.clearPage == true) {
    smartdown.setVariable('clearPage', false);
    if (initialized) { 
      p5.clear(); 
    }
  }

  if (env.reset == true) {
    smartdown.setVariable('reset', false);
    if (env.r1 <= 0) {
      radiusCoefficients[0] = 0.11; 
    }
    else {
      if (env.r1 > 1) {
        radiusCoefficients[0] = 1;
      }
      else {
        radiusCoefficients[0] = env.r1;          
      }
    
    }

    if (env.r2 <= 0) {
      radiusCoefficients[1] = 0.11; 
    }
    else {
      if (env.r2 > 1) {
        radiusCoefficients[1] = 1;
      }
      else {
        radiusCoefficients[1] = env.r2;          
      }     
    }

    if (env.r3 <= 0) {
      radiusCoefficients[2] = 0; 
    }
    else {
      if (env.r3 > 1) {
        radiusCoefficients[2] = 1;
      }
      else {
        radiusCoefficients[2] = env.r3;          
      }     
    }

    smartdown.setVariable('r1', radiusCoefficients[0]);
    smartdown.setVariable('r2', radiusCoefficients[1]);
    smartdown.setVariable('r3', radiusCoefficients[2]);

    initialize();
  }
  red = env.red;
  green = env.green;
  blue = env.blue;
  deltaFactor = env.df;
  penCirle = env.pen;
  penRadiusRatio = env.penR;

  if (env.download == true) {
    smartdown.setVariable('download', false);

    const imgData = canvas.elt.toDataURL("image/jpg", 0.1);
    let image = new Image();
    image.src = imgData;
    image.style = 'width:100%; height;100%'
    let w = window.open("");
    w.document.write(image.outerHTML);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////



```
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
